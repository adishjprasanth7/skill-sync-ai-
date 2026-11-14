import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Flame, RefreshCw, ChevronDown, Layers, Cpu, ShieldCheck, Database
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, careers, activeCareer, setTargetCareer, isOrchestrating, 
    runOrchestrationPipeline, totalTokensUsed, switchUser, setActiveView, activeView 
  } = useApp();

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
          {/* Target Career Selector */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60">
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-slate-400 font-medium">Target:</span>
            <select
              value={activeCareer.id}
              onChange={(e) => setTargetCareer(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                  {c.title}
                </option>
              ))}
            </select>
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
