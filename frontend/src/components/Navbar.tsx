import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Flame, RefreshCw, ChevronDown, Layers, Cpu, ShieldCheck, Database,
  Search, Check, X, Compass, UserPlus
} from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { 
    user, careers, activeCareer, setTargetCareer, isOrchestrating, 
    runOrchestrationPipeline, totalTokensUsed, switchUser, setActiveView, activeView 
  } = useApp();

  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [targetSearchQuery, setTargetSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const targetDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(e.target as Node)) {
        setIsTargetDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTargetDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Unique categories for filtering
  const categories = ['All', ...Array.from(new Set(careers.map(c => c.category)))];

  // Filtered target careers based on search query & category filter
  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategoryFilter === 'All' || career.category === selectedCategoryFilter;
    const query = targetSearchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesQuery = 
      career.title.toLowerCase().includes(query) ||
      career.category.toLowerCase().includes(query) ||
      career.description.toLowerCase().includes(query) ||
      career.core_skills.some(s => s.skill.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Brand & Landing Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                SkillSync <span className="text-indigo-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-wider uppercase text-slate-400 font-semibold">
                Autonomous Multi-Agent Career Engine
              </span>
            </div>
          </button>

          {/* Quick Landing switch */}
          <button
            onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
            className="hidden md:flex text-xs px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 transition-colors ml-2"
          >
            {activeView === 'landing' ? 'Back to Dashboard' : 'View Landing Page'}
          </button>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Searchable Target Career Popover */}
          <div className="relative" ref={targetDropdownRef}>
            <button
              onClick={() => setIsTargetDropdownOpen(!isTargetDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isTargetDropdownOpen 
                  ? 'border-indigo-500/60 bg-indigo-950/40 text-indigo-200 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/40' 
                  : 'border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 text-slate-200'
              }`}
              title="Click to search and change target career track"
            >
              <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 hidden lg:inline font-normal">Target:</span>
                <span className="max-w-[140px] sm:max-w-[180px] truncate text-slate-100 font-medium">
                  {activeCareer.title}
                </span>
                <span className="hidden xl:inline text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeCareer.category}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isTargetDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
            </button>

            {/* Popover Menu with Real-Time Search */}
            {isTargetDropdownOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-80 sm:w-96 p-3 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Search Input Box */}
                <div className="relative mb-2.5">
                  <Search className="w-4 h-4 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={targetSearchQuery}
                    onChange={(e) => setTargetSearchQuery(e.target.value)}
                    placeholder="Search career, skill, or role..."
                    autoFocus
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                  />
                  {targetSearchQuery && (
                    <button
                      onClick={() => setTargetSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-[11px]">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                        selectedCategoryFilter === cat
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Career Options List */}
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  {filteredCareers.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No careers match "{targetSearchQuery}".
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setTargetSearchQuery('');
                            setSelectedCategoryFilter('All');
                          }}
                          className="text-indigo-400 hover:underline font-semibold"
                        >
                          Clear search filters
                        </button>
                      </div>
                    </div>
                  ) : (
                    filteredCareers.map((c) => {
                      const isSelected = c.id === activeCareer.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setTargetCareer(c.id);
                            setIsTargetDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-200 font-semibold'
                              : 'text-slate-300 hover:bg-slate-900/80 border border-transparent hover:border-slate-800'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white truncate">{c.title}</span>
                              {isSelected && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-bold">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                              <span>{c.category}</span>
                              <span>•</span>
                              <span className="text-emerald-400">{c.market_demand}</span>
                              <span>•</span>
                              <span>{c.avg_salary}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Popover Footer */}
                <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    {filteredCareers.length} of {careers.length} careers
                  </span>
                  <button
                    onClick={() => {
                      setIsTargetDropdownOpen(false);
                      setActiveView('careers');
                    }}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View Gap Analysis</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Readiness Meter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-950/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400 hidden sm:inline">Readiness: </span>
              <span className="font-bold text-indigo-300">{user.career_readiness}%</span>
            </div>
          </div>

          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/20 bg-amber-950/30 text-xs font-semibold text-amber-300">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <span>{user.streak_days}d streak</span>
          </div>

          {/* Token Usage Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-500/20 bg-violet-950/30 text-xs font-semibold text-violet-300" title="Token-efficient caching active">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>{totalTokensUsed} tokens</span>
          </div>

          {/* Database Live Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-950/30 text-xs font-semibold text-emerald-300" title="SQLite Persistent Storage Active (Supabase Sync Ready)">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>DB: Live</span>
          </div>

          {/* Orchestrate Pipeline Button */}
          <button
            onClick={() => runOrchestrationPipeline()}
            disabled={isOrchestrating}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-lg ${
              isOrchestrating
                ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:scale-[1.02]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isOrchestrating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isOrchestrating ? 'Optimizing...' : 'Optimize Roadmap'}</span>
          </button>

          {/* Profile Switcher Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                {user.full_name[0]}
              </div>
              <span className="hidden md:inline text-xs font-medium text-slate-200">
                {user.full_name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-semibold text-slate-200">{user.full_name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>
              
              <div className="text-[10px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Switch Demo Profile
              </div>
              <button
                onClick={() => switchUser('alex_demo')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  user.id === 'alex_demo' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>Alex Rivera (Full Stack)</span>
                {user.id === 'alex_demo' && <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
              <button
                onClick={() => switchUser('maya_demo')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  user.id === 'maya_demo' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>Maya Lin (AI & ML Track)</span>
                {user.id === 'maya_demo' && <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />}
              </button>

              <div className="pt-2 mt-1 border-t border-slate-800">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 flex items-center gap-2 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign In / Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};
