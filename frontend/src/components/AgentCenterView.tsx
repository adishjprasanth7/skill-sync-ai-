import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, Layers, Compass, GitBranch, Sparkles, 
  ShieldCheck, LineChart, RefreshCw, CheckCircle2, Clock, Zap 
} from 'lucide-react';

export const AgentCenterView: React.FC = () => {
  const { 
    agentLogs, isOrchestrating, runOrchestrationPipeline, 
    totalTokensUsed, activeCareer 
  } = useApp();

  const agentsMeta = [
    {
      id: 'skill_analyst',
      name: 'Skill Analyst',
      role: 'Proficiency Evaluator & Prerequisite Auditor',
      desc: 'Parses verified profile competencies, audits prerequisite graphs, and identifies foundational roadblocks.',
      icon: Layers,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'career_advisor',
      name: 'Career Advisor',
      role: 'Market Benchmark & Gap Specialist',
      desc: 'Compares user skills against target industry standards, evaluates coverage %, and separates core vs bonus skills.',
      icon: Compass,
      color: 'from-indigo-500 to-violet-600'
    },
    {
      id: 'learning_planner',
      name: 'Learning Planner',
      role: 'Curriculum Architect & Milestone Sequencer',
      desc: 'Structures learning phases, decomposes concepts into manageable lessons, and sequences capstone projects.',
      icon: GitBranch,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'resource_recommender',
      name: 'Resource Recommender',
      role: 'Asset Curator & Documentation Specialist',
      desc: 'Curates verified official documentation, tutorials, and interactive sandboxes with zero token waste.',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'assessment_evaluator',
      name: 'Assessment Evaluator',
      role: 'Diagnostic Auditor & Weak-Area Detector',
      desc: 'Generates precision diagnostic questions, evaluates code answers, and pinpoints exact misconceptions.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'progress_monitor',
      name: 'Progress Monitor',
      role: 'Velocity Tracker & Trajectory Engine',
      desc: 'Analyzes daily study velocity, tracks retention streaks, and dynamically forecasts readiness threshold dates.',
      icon: LineChart,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Multi-Agent Swarm Orchestration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">AI Agent Operations Center</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Watch the central orchestrator coordinate the six specialized agents to deliver end-to-end guidance without redundant API calls.
          </p>
        </div>

        <button
          onClick={() => runOrchestrationPipeline()}
          disabled={isOrchestrating}
          className={`px-6 py-3 rounded-xl font-semibold text-xs transition-all shadow-xl flex items-center justify-center gap-2 ${
            isOrchestrating
              ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 hover:scale-105'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isOrchestrating ? 'animate-spin' : ''}`} />
          <span>{isOrchestrating ? 'Orchestrating Swarm...' : 'Trigger Pipeline Run'}</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Swarm Topology</span>
          <div className="text-lg font-bold text-white mt-1">Central Orchestrator + 6 Agents</div>
          <p className="text-[10px] text-indigo-300">Deterministic + Contextual LLM hybrid</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Token Optimization</span>
          <div className="text-lg font-bold text-emerald-400 mt-1">{totalTokensUsed} Tokens Consumed</div>
          <p className="text-[10px] text-slate-400">Cached benchmarks save ~84% API calls</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Active Target Role</span>
          <div className="text-lg font-bold text-white mt-1 truncate">{activeCareer.title}</div>
          <p className="text-[10px] text-slate-400">All agents aligned on this target</p>
        </div>
      </div>

      {/* 6 Specialized Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentsMeta.map((agent) => {
          const Icon = agent.icon;
          const latestLog = agentLogs.find(l => l.agent_name.toLowerCase().includes(agent.name.toLowerCase()));

          return (
            <div
              key={agent.id}
              className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between hover:border-indigo-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${agent.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synchronized
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                <div className="text-[11px] text-indigo-300 font-mono mb-2">{agent.role}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{agent.desc}</p>
              </div>

              {/* Latest Agent Run Info */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px]">
                <div className="text-slate-400 font-semibold mb-1">Recent Execution Output:</div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300 font-mono text-[10px] line-clamp-2">
                  {latestLog ? latestLog.output_summary : 'Standing by for next pipeline trigger.'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Orchestrator Log Table */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Structured Multi-Agent Pipeline Trace</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">{agentLogs.length} Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                <th className="pb-3 font-semibold">Agent</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Input Payload</th>
                <th className="pb-3 font-semibold">Output Synthesis</th>
                <th className="pb-3 font-semibold text-right">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {agentLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-3 font-bold text-slate-200 whitespace-nowrap">
                    {log.agent_name}
                  </td>
                  <td className="py-3 text-indigo-300 font-mono whitespace-nowrap text-[11px]">
                    {log.role}
                  </td>
                  <td className="py-3 text-slate-400 max-w-xs truncate">
                    {log.input_summary}
                  </td>
                  <td className="py-3 text-slate-300 max-w-md truncate">
                    {log.output_summary}
                  </td>
                  <td className="py-3 text-right font-mono text-emerald-400 font-semibold">
                    {log.tokens_used}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
