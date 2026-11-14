import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  LayoutDashboard,
  BrainCircuit,
  Compass,
  GitBranch,
  Bot,
  GraduationCap,
  Zap,
  Cpu,
  LineChart,
  CircleDot
} from 'lucide-react';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, isOrchestrating, activeCareer } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skills', label: 'Skill Analyzer', icon: BrainCircuit },
    { id: 'careers', label: 'Career Matcher', icon: Compass },
    { id: 'roadmap', label: 'Learning Roadmap', icon: GitBranch, badge: 'Adaptive' },
    { id: 'mentor', label: 'AI Mentor', icon: Bot, badge: 'Contextual' },
    { id: 'assessments', label: 'Assessments', icon: GraduationCap },
    { id: 'adaptive', label: 'Adaptive Engine', icon: Zap, badge: 'Live Lab' },
    { id: 'agents', label: 'AI Agent Center', icon: Cpu, badge: '6 Agents' },
    { id: 'analytics', label: 'Analytics & Velocity', icon: LineChart },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-800/80 bg-slate-950/70 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Modules
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/25 to-violet-600/15 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-300'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold tracking-tight ${
                  isActive
                    ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30'
                    : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Multi-Agent Live Status Card */}
      <div className="p-3 m-3 rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 to-slate-900/40 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CircleDot className={`w-3.5 h-3.5 ${isOrchestrating ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
            <span className="text-[11px] font-bold text-slate-200 tracking-wide">
              {isOrchestrating ? 'Orchestrating...' : 'Multi-Agent Mesh'}
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
            6 Active
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Coordinated multi-agent workflow analyzing gaps for <span className="text-indigo-300 font-medium">{activeCareer.title}</span>.
        </p>
      </div>
    </aside>
  );
};
