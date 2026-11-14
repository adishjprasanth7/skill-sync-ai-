import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, ArrowRight, RefreshCw, AlertTriangle, ShieldCheck, 
  Sparkles, Layers, Cpu, CheckCircle2 
} from 'lucide-react';

export const AdaptiveEngineView: React.FC = () => {
  const { 
    adaptiveEvents, triggerAdaptiveRemedial, triggerCareerPivot, 
    activeCareer, user, setActiveView 
  } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Zap className="w-4 h-4" />
          <span>Real-Time Dynamic Recalibration</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Adaptive Learning Engine</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          SkillSync reacts dynamically to your learning reality. Rather than static course sequences, 
          the system injects remedial sprints on failure and preserves verified competencies when changing career goals.
        </p>
      </div>

      {/* Interactive Simulation Lab */}
      <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/60 backdrop-blur-xl space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
            Interactive Testbed for Evaluators
          </span>
          <h2 className="text-lg font-bold text-white mt-1">Simulate Real Adaptive Scenarios</h2>
          <p className="text-xs text-slate-300 mt-1">
            Execute the exact hackathon workflows described in the specification to observe live roadmap re-architecting:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scenario 1: Diagnostic Failure */}
          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Scenario A: Diagnostic Failure in JavaScript</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Simulates scoring poorly on JS Closures and the Event Loop. 
                The engine detects conceptual weaknesses and immediately inserts a targeted <strong>Remedial Sprint</strong> into Phase 1 of your roadmap.
              </p>
            </div>

            <button
              onClick={() => {
                triggerAdaptiveRemedial("JavaScript", ["Closures & Lexical Scope", "Event Loop & Async"]);
                setActiveView('roadmap');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Simulate JS Failure & Inject Remedial</span>
            </button>
          </div>

          {/* Scenario 2: Career Pivot */}
          <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <RefreshCw className="w-4 h-4" />
                <span>Scenario B: Career Pivot (To AI/ML or Cloud)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pivots career target to <strong>AI & Machine Learning Engineer</strong>. 
                Preserves relevant completed skills (Python, SQL), recalibrates missing math/PyTorch requirements, and regenerates target milestones.
              </p>
            </div>

            <button
              onClick={() => {
                const newId = activeCareer.id === 'ai-ml-engineer' ? 'full-stack-dev' : 'ai-ml-engineer';
                triggerCareerPivot(newId);
                setActiveView('roadmap');
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Simulate Career Pivot & Recalculate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Event Log */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Real-Time Adaptive Event Ledger</span>
        </h3>
        <p className="text-xs text-slate-400">
          Chronological record of autonomous restructuring actions executed by the central orchestrator.
        </p>

        <div className="space-y-3">
          {adaptiveEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">({ev.timestamp})</span>
                </div>
                <p className="text-xs text-slate-300">{ev.description}</p>
              </div>

              <div className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-500/20 shrink-0">
                {ev.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
