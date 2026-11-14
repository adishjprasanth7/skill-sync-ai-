import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, Award, CheckCircle2, XCircle, ArrowRight, 
  RotateCcw, Zap, HelpCircle, AlertTriangle 
} from 'lucide-react';
import { apiService } from '../services/api';
import { AssessmentQuestion, AssessmentResult } from '../types';

export const AssessmentCenter: React.FC = () => {
  const { triggerAdaptiveRemedial, setActiveView } = useApp();

  const [testableSkills] = useState<string[]>(['JavaScript', 'React', 'Python', 'SQL', 'Docker']);
  const [selectedSkill, setSelectedSkill] = useState<string>('JavaScript');
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    loadQuestions(selectedSkill);
  }, [selectedSkill]);

  const loadQuestions = async (skill: string) => {
    setResult(null);
    setUserAnswers({});
    setCurrentIndex(0);
    const qList = await apiService.getQuestions(skill);
    setQuestions(qList);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!questions[currentIndex]) return;
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    setIsEvaluating(true);
    try {
      const evaluation = await apiService.submitAssessment(selectedSkill, userAnswers);
      setResult(evaluation);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const currentQ = questions[currentIndex];
  const allAnswered = questions.length > 0 && questions.every(q => userAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Diagnostic Assessment Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Skill Verification Diagnostics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Diagnostic questions evaluate real understanding. Weak answers trigger automated remedial actions in the Adaptive Learning Hub.
        </p>

        {/* Skill Selector Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {testableSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSkill === skill
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Card or Results */}
      {!result ? (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl space-y-6">
          {questions.length > 0 && currentQ ? (
            <>
              {/* Question Header & Counter */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                  Topic: {currentQ.topic}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Optional Code Snippet */}
                {currentQ.code && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
                    <pre>{currentQ.code}</pre>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = userAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl text-xs font-medium text-left transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-950/40'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered || isEvaluating}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>{isEvaluating ? 'Evaluating Diagnostic...' : 'Submit Diagnostic'}</span>
                    <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Loading diagnostic questions for {selectedSkill}...
            </div>
          )}
        </div>
      ) : (
        /* Evaluation Results Display */
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Diagnostic Result • {result.skill}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Score: {result.score}/{result.total} ({result.percentage}%)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {result.passed 
                  ? "Proficiency confirmed by Assessment Evaluator." 
                  : "Conceptual vulnerabilities pinpointed. Remedial intervention available."}
              </p>
            </div>

            <div className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              result.passed
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
            }`}>
              {result.passed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{result.passed ? 'PASSED (≥70%)' : 'NEEDS REINFORCEMENT (<70%)'}</span>
            </div>
          </div>

          {/* Weak Topics Callout */}
          {result.weak_topics.length > 0 && (
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Zap className="w-4 h-4" />
                <span>Detected Weak Concepts:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.weak_topics.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-900/40 text-amber-200 border border-amber-500/30 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-300">
                The Assessment Evaluator flagged these conceptual areas. Trigger the adaptive engine to inject a targeted remedial sprint into your roadmap.
              </p>
              <button
                onClick={() => {
                  triggerAdaptiveRemedial(result.skill, result.weak_topics);
                  setActiveView('roadmap');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Inject Remedial Sprint into Roadmap</span>
              </button>
            </div>
          )}

          {/* Breakdown per question */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detailed Question Breakdown & Explanations
            </h3>
            {result.breakdown.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.question}</span>
                  {item.is_correct ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-slate-300">Explanation: </strong>
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => loadQuestions(selectedSkill)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
            <button
              onClick={() => setActiveView('roadmap')}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <span>Back to Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
