import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, Clock, Award, Target, ArrowRight, Zap, 
  CheckCircle2, Compass, Bot, Sparkles, BookOpen 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const { 
    user, activeCareer, roadmap, toggleNodeCompletion, 
    setActiveView, adaptiveEvents 
  } = useApp();

  // Find next in-progress or incomplete node
  const nextNode = roadmap?.phases
    .flatMap(p => p.nodes)
    .find(n => !n.completed) || roadmap?.phases[0]?.nodes[0];

  // Radar chart data based on user skills
  const radarData = [
    { subject: 'Frontend', A: user.skills.filter(s => s.category === 'Frontend').reduce((acc, s) => acc + s.level * 25, 0) || 40, fullMark: 100 },
    { subject: 'Backend', A: user.skills.filter(s => s.category === 'Backend').reduce((acc, s) => acc + s.level * 25, 0) || 50, fullMark: 100 },
    { subject: 'Database', A: user.skills.filter(s => s.category === 'Database').reduce((acc, s) => acc + s.level * 25, 0) || 45, fullMark: 100 },
    { subject: 'DevOps', A: user.skills.filter(s => s.category === 'DevOps').reduce((acc, s) => acc + s.level * 25, 0) || 35, fullMark: 100 },
    { subject: 'AI/ML', A: user.skills.filter(s => s.category === 'AI/ML').reduce((acc, s) => acc + s.level * 25, 0) || 20, fullMark: 100 },
    { subject: 'System Design', A: 55, fullMark: 100 }
  ];

  // Weekly study velocity area chart
  const velocityData = [
    { day: 'Mon', hours: 2.5, completed: 1 },
    { day: 'Tue', hours: 3.8, completed: 2 },
    { day: 'Wed', hours: 1.2, completed: 0 },
    { day: 'Thu', hours: 4.0, completed: 2 },
    { day: 'Fri', hours: 3.2, completed: 1 },
    { day: 'Sat', hours: 5.0, completed: 3 },
    { day: 'Sun', hours: 2.0, completed: 1 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Active Career Track
              </span>
              <span className="text-xs text-slate-400 font-medium">Updated 2m ago</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user.full_name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl flex flex-wrap items-center gap-1.5">
              <span>Targeting</span>
              <button 
                onClick={() => setActiveView('careers')}
                className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20 transition-colors"
                title="Search and select from 15 target career tracks"
              >
                <span>{activeCareer.title}</span>
                <span className="text-[10px] text-indigo-300 font-normal">→ search 15 targets</span>
              </button>
              <span>— continuously optimized for market demand.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('assessments')}
              className="px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-200 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Take Diagnostic Quiz</span>
            </button>
            <button
              onClick={() => setActiveView('mentor')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Career Readiness</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{user.career_readiness}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full transition-all duration-700" 
              style={{ width: `${user.career_readiness}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Target threshold: 85% for interview readiness
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Active Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-300 mb-1">{user.streak_days} Days</div>
          <p className="text-[10px] text-slate-400">
            Top 8% learning consistency this month 🔥
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Study Velocity</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{user.hours_studied} hrs</div>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span>+4.2 hrs from last week</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Target Timeframe</span>
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {roadmap?.analytics?.est_weeks || 6} Weeks
          </div>
          <p className="text-[10px] text-slate-400">
            Based on {roadmap?.phases?.reduce((acc, p) => acc + p.nodes.length, 0) || 8} milestone nodes
          </p>
        </div>
      </div>

      {/* Main Grid: Charts & Next Recommended Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Recommended Milestone Action Card */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-900/80 backdrop-blur-xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Milestone Sprint</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                Priority
              </span>
            </div>

            {nextNode ? (
              <>
                <h3 className="text-lg font-bold text-white mb-2">{nextNode.title}</h3>
                <p className="text-xs text-slate-300 mb-4 line-clamp-2">
                  {nextNode.project_prompt || "Master foundational and architectural patterns with hands-on practice."}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="text-xs font-semibold text-slate-400">Included Lessons:</div>
                  {nextNode.lessons.slice(0, 3).map((l, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span className="truncate">{l}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400">All currently planned milestones completed!</p>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            {nextNode && (
              <button
                onClick={() => toggleNodeCompletion(nextNode.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Lesson Complete (+Readiness)</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('roadmap')}
              className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Competency Radar Chart */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Competency Domain Radar</h3>
            <span className="text-[10px] text-slate-400">6 Domains</span>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Calculated from validated skill proficiency weights.
          </p>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Radar name="Proficiency" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Study Velocity Area Chart */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Weekly Study Velocity</h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
              +18.5 hrs
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Hours dedicated to coding exercises and diagnostics.
          </p>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#818CF8" strokeWidth={2} fillOpacity={1} fill="url(#velocityGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Adaptive Learning Event Feed */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Adaptive Learning Event Feed</h3>
          </div>
          <button
            onClick={() => setActiveView('adaptive')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            Simulate Triggers →
          </button>
        </div>

        <div className="space-y-3">
          {adaptiveEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/40 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200">{event.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{event.timestamp}</span>
                </div>
                <p className="text-xs text-slate-400">{event.description}</p>
                <span className="inline-block text-[10px] text-emerald-400 font-semibold mt-1">
                  {event.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
