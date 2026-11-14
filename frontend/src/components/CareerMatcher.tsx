import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, CheckCircle2, AlertCircle, ArrowRight, 
  Sparkles, TrendingUp, DollarSign, Award, Layers 
} from 'lucide-react';

export const CareerMatcher: React.FC = () => {
  const { careers, activeCareer, setTargetCareer, user, setActiveView } = useApp();

  const userSkillNames = new Set(user.skills.map(s => s.name.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Industry Benchmark Cross-Reference</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Career Matcher & Gap Analysis</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Compare your validated capabilities against current market specifications. 
          Selecting any target role triggers the multi-agent orchestrator to calculate gaps and sequence your personalized roadmap.
        </p>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careers.map((career) => {
          const isSelected = activeCareer.id === career.id;

          // Calculate deterministic readiness for this specific career
          const matchedSkills = career.core_skills.filter(c => userSkillNames.has(c.skill.toLowerCase()));
          const missingSkills = career.core_skills.filter(c => !userSkillNames.has(c.skill.toLowerCase()));
          const readinessPct = Math.round((matchedSkills.length / Math.max(career.core_skills.length, 1)) * 100);

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
                      {readinessPct}%
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
                    <span>{matchedSkills.length}/{career.core_skills.length} Matched</span>
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
    </div>
  );
};
