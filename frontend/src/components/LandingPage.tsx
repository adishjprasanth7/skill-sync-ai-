import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, ArrowRight, ShieldCheck, Zap, Compass, GitBranch, 
  Bot, LineChart, Sparkles, CheckCircle2, RefreshCw 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, runOrchestrationPipeline, isOrchestrating } = useApp();

  return (
    <div className="min-h-screen bg-[#070B13] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background radial gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/12 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto pt-8 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-semibold mb-6 shadow-lg shadow-indigo-950/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Generation Multi-Agent Career & Learning Orchestration</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Autonomous AI Guidance for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Precision Careers.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            SkillSync AI coordinates six specialized AI agents to analyze your real skill competency, 
            benchmark against industry requirements, and adaptively restructure your learning path in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Interactive Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => runOrchestrationPipeline()}
              disabled={isOrchestrating}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:border-slate-700"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-400 ${isOrchestrating ? 'animate-spin' : ''}`} />
              <span>Simulate Multi-Agent Pipeline</span>
            </button>
          </div>
        </div>

        {/* Live Multi-Agent Architecture Showcase */}
        <div className="mb-24 p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 border-b border-slate-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Cpu className="w-4 h-4" />
                <span>Synchronized Multi-Agent Mesh</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Central Orchestrator Architecture</h2>
              <p className="text-xs text-slate-400 mt-1">
                Single coordinated workflow eliminating duplicate LLM calls, caching benchmarks, and executing deterministic scoring.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                6 Agents Active
              </span>
            </div>
          </div>

          {/* 6 Specialized Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Skill Analyst", role: "Proficiency & Prerequisite Auditor", desc: "Extracts validated abilities, detects foundational gaps, and identifies prerequisite roadblocks.", icon: BrainCircuitIcon },
              { title: "Career Advisor", role: "Market Gap Specialist", desc: "Cross-references learner skills against live career profiles and calculates readiness coverage %.", icon: Compass },
              { title: "Learning Planner", role: "Curriculum Architect", desc: "Sequences modular milestones, projects, and exercises into an optimized progression timeline.", icon: GitBranch },
              { title: "Resource Recommender", role: "Documentation Curator", desc: "Curates verified official documentation, tutorials, and interactive sandboxes with zero token waste.", icon: Sparkles },
              { title: "Assessment Evaluator", role: "Diagnostic Auditor", desc: "Generates precision quizzes, grades submissions, and pinpoints exact conceptual misunderstandings.", icon: ShieldCheck },
              { title: "Progress Monitor", role: "Velocity & Trajectory Engine", desc: "Tracks daily study velocity, calculates retention streaks, and monitors threshold completion dates.", icon: LineChart }
            ].map((agent, i) => {
              const Icon = agent.icon;
              return (
                <div key={i} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/40 transition-all group">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{agent.title}</h4>
                      <p className="text-[10px] text-indigo-300 font-mono font-medium">{agent.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Adaptive Intelligence Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Automated Remedial Sprints</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a diagnostic test identifies weak topics (e.g. JS async or SQL joins), the adaptive engine automatically inserts targeted remedial modules into your roadmap.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Preserved Career Pivots</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switching from Full Stack to AI/ML? The system retains verified transferable competencies while instantly re-benchmarking new requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Profile-Grounded AI Mentor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI chatbot with instant context of your active career goal, weak assessment areas, and current roadmap milestone for zero-fluff explanations.
            </p>
          </div>
        </div>

        {/* Ready CTA */}
        <div className="p-8 sm:p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-violet-950/60 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Experience the Complete Student Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Test skills, simulate career pivots, trigger weak-topic remediation, and chat with your context-aware mentor.
          </p>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Enter Application Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

function BrainCircuitIcon(props: any) {
  return <Cpu {...props} />;
}
