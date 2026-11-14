import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LineChart as LineChartIcon, Target, Clock, Flame, 
  Award, TrendingUp, Calendar, Zap, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar 
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { user, activeCareer, roadmap } = useApp();

  const domainData = [
    { domain: 'Frontend', score: 85 },
    { domain: 'Backend', score: 65 },
    { domain: 'Database', score: 60 },
    { domain: 'DevOps', score: 45 },
    { domain: 'System Arch', score: 50 },
    { domain: 'Testing', score: 70 },
  ];

  const radarData = [
    { subject: 'Frontend', A: 85, fullMark: 100 },
    { subject: 'Backend', A: 65, fullMark: 100 },
    { subject: 'Database', A: 60, fullMark: 100 },
    { subject: 'DevOps', A: 45, fullMark: 100 },
    { subject: 'System Arch', A: 50, fullMark: 100 },
    { subject: 'Problem Solving', A: 75, fullMark: 100 },
  ];

  const monthlyTrajectory = [
    { week: 'W1', readiness: 20 },
    { week: 'W2', readiness: 28 },
    { week: 'W3', readiness: 35 },
    { week: 'W4 (Current)', readiness: user.career_readiness },
    { week: 'W5 (Proj)', readiness: user.career_readiness + 12 },
    { week: 'W6 (Target)', readiness: 85 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <LineChartIcon className="w-4 h-4" />
          <span>Continuous Velocity & Mastery Metrics</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Progress Analytics & Trajectory</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Visualizing learning velocity, domain competencies, and forecast completion dates for <strong className="text-slate-200">{activeCareer.title}</strong>.
        </p>
      </div>

      {/* Top Stat Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-400">Current Career Readiness</span>
          <div className="text-2xl font-bold text-indigo-400 mt-1">{user.career_readiness}%</div>
          <p className="text-[10px] text-slate-400 mt-1">Goal: 85% for Job Market Ready</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-400">Total Hours Invested</span>
          <div className="text-2xl font-bold text-white mt-1">{user.hours_studied} hrs</div>
          <p className="text-[10px] text-emerald-400 mt-1">+6.5 hrs this week</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-400">Active Learning Streak</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">{user.streak_days} Days</div>
          <p className="text-[10px] text-slate-400 mt-1">High retention consistency</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-400">Forecast Completion</span>
          <div className="text-2xl font-bold text-cyan-400 mt-1">5-6 Weeks</div>
          <p className="text-[10px] text-slate-400 mt-1">At current study velocity</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Readiness Trajectory Area Chart */}
        <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Career Readiness Trajectory</h3>
              <p className="text-xs text-slate-400">Historical vs Projected milestone gains</p>
            </div>
            <span className="text-xs font-mono text-indigo-400 font-semibold bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              Target 85%
            </span>
          </div>

          <div className="flex-1 w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrajectory}>
                <defs>
                  <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="readiness" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#readinessGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Radar Chart */}
        <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Full-Stack Competency Spider</h3>
              <p className="text-xs text-slate-400">Normalized mastery score across technical domains</p>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Radar name="Domain Score" dataKey="A" stroke="#818CF8" fill="#818CF8" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Domain Breakdown Bars */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-4">Domain Proficiency Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domainData.map((d) => (
            <div key={d.domain} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{d.domain}</span>
                <span className="text-indigo-400 font-mono">{d.score}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${d.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
