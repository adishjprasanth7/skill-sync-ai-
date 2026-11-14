import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, CheckCircle2, AlertCircle, ArrowRight, 
  Sparkles, TrendingUp, DollarSign, Award, Layers,
  Search, X, SlidersHorizontal, Check, Briefcase
} from 'lucide-react';

export const CareerMatcher: React.FC = () => {
  const { careers, activeCareer, setTargetCareer, user, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'fit' | 'salary' | 'title'>('fit');

  const userSkillNames = useMemo(
    () => new Set(user.skills.map(s => s.name.toLowerCase())),
    [user.skills]
  );

  // Extract unique categories
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(careers.map(c => c.category)))];
  }, [careers]);

  // Compute readiness fits and filter/sort careers
  const processedCareers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = careers.map(career => {
      const matchedSkills = career.core_skills.filter(c => userSkillNames.has(c.skill.toLowerCase()));
      const missingSkills = career.core_skills.filter(c => !userSkillNames.has(c.skill.toLowerCase()));
      const readinessPct = Math.round((matchedSkills.length / Math.max(career.core_skills.length, 1)) * 100);

      // Parse numerical salary for sorting (e.g. "$145,000" -> 145000)
      const salaryNumeric = parseInt(career.avg_salary.replace(/[^0-9]/g, '')) || 0;

      return {
        ...career,
        matchedSkills,
        missingSkills,
        readinessPct,
        salaryNumeric
      };
    });

    // Filter
    const filtered = list.filter(career => {
      const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      return (
        career.title.toLowerCase().includes(query) ||
        career.category.toLowerCase().includes(query) ||
        career.description.toLowerCase().includes(query) ||
        career.core_skills.some(s => s.skill.toLowerCase().includes(query)) ||
        career.market_demand.toLowerCase().includes(query)
      );
    });

    // Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'fit') {
        return b.readinessPct - a.readinessPct;
      } else if (sortBy === 'salary') {
        return b.salaryNumeric - a.salaryNumeric;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }, [careers, searchQuery, selectedCategory, sortBy, userSkillNames]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Industry Benchmark Cross-Reference</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Target Career Matcher & Gap Analysis</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Search and compare your verified capabilities against {careers.length} current market role specifications. 
          Selecting any target role recalibrates the multi-agent orchestrator to calculate skills gaps and sequence your personalized roadmap.
        </p>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers by title, skill (e.g. Python, React, AWS), or category..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-semibold focus:outline-none focus:border-indigo-500/80 cursor-pointer"
            >
              <option value="fit">Readiness Fit (%)</option>
              <option value="salary">Average Compensation</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none text-xs">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? careers.length 
              : careers.filter(c => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs px-2">
        <span className="text-slate-400">
          Showing <strong className="text-slate-200">{processedCareers.length}</strong> of {careers.length} career options
          {selectedCategory !== 'All' && <span> in <strong className="text-indigo-300">{selectedCategory}</strong></span>}
          {searchQuery && <span> matching "<strong className="text-white">{searchQuery}</strong>"</span>}
        </span>
        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-indigo-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Careers Grid */}
      {processedCareers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
          <Briefcase className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Career Tracks Match Your Search</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            We couldn't find any career options matching "{searchQuery}". Try searching for skills like Python, React, AWS, Docker, or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            Clear Search & Show All Careers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {processedCareers.map((career) => {
            const isSelected = activeCareer.id === career.id;

            return (
              <div
                key={career.id}
                className={`p-6 rounded-3xl border transition-all backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-900/80 shadow-2xl shadow-indigo-950/50 ring-1 ring-indigo-500/30'
                    : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Badge & Action */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase tracking-wider">
                          {career.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                            Active Target
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white">{career.title}</h3>
                    </div>

                    {/* Readiness Pill */}
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-indigo-400 font-mono">
                        {career.readinessPct}%
                      </div>
                      <span className="text-[10px] text-slate-400">Readiness Fit</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    {career.description}
                  </p>

                  {/* Market Stats */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-5 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Demand: <strong className="text-white">{career.market_demand}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <DollarSign className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Avg Comp: <strong className="text-white">{career.avg_salary}</strong></span>
                    </div>
                  </div>

                  {/* Core Competencies Gap Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Required Competencies:</span>
                      <span>{career.matchedSkills.length}/{career.core_skills.length} Matched</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {career.core_skills.map((req, i) => {
                        const hasSkill = userSkillNames.has(req.skill.toLowerCase());
                        return (
                          <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium border ${
                              hasSkill
                                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                                : 'bg-rose-950/30 text-rose-300 border-rose-500/20'
                            }`}
                          >
                            {hasSkill ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <AlertCircle className="w-3 h-3 text-rose-400" />
                            )}
                            <span>{req.skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  {isSelected ? (
                    <button
                      onClick={() => setActiveView('roadmap')}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      <span>View Active Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setTargetCareer(career.id)}
                      className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-indigo-500"
                    >
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Select as Target Career</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
