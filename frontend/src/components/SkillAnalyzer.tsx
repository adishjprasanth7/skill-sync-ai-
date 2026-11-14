import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BrainCircuit, Plus, CheckCircle2, AlertCircle, Award, 
  Trash2, ShieldCheck, Sparkles, Filter 
} from 'lucide-react';
import { SkillCategory, UserSkill } from '../types';

export const SkillAnalyzer: React.FC = () => {
  const { user, updateSkillLevel, addSkill, setActiveView } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(2);
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Frontend');
  const [isAdding, setIsAdding] = useState(false);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'AI/ML', 'DevOps', 'Cloud', 'Security'];

  const filteredSkills = selectedCategory === 'All' 
    ? user.skills 
    : user.skills.filter(s => s.category === selectedCategory);

  const levelLabels = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = [
    '',
    'text-blue-400 bg-blue-950/60 border-blue-500/30',
    'text-indigo-400 bg-indigo-950/60 border-indigo-500/30',
    'text-violet-400 bg-violet-950/60 border-violet-500/30',
    'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory,
      verified: false
    });
    setNewSkillName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Diagnostic Audit Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Skill Analyzer & Prerequisite Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your validated competencies, adjust proficiency ratings, and verify abilities with diagnostics.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competency</span>
        </button>
      </div>

      {/* Add Skill Modal / Form */}
      {isAdding && (
        <form onSubmit={handleAddSkill} className="p-6 rounded-3xl border border-indigo-500/30 bg-indigo-950/20 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Add New Skill to Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js, Docker, PyTorch"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={newSkillCategory}
                onChange={e => setNewSkillCategory(e.target.value as SkillCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Proficiency Level</label>
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value={1}>Level 1 - Beginner</option>
                <option value={2}>Level 2 - Intermediate</option>
                <option value={3}>Level 3 - Advanced</option>
                <option value={4}>Level 4 - Expert</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.name}
            className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-800/60">
                  {skill.category}
                </span>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${levelColors[skill.level]}`}>
                  {levelLabels[skill.level]}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-bold text-white">{skill.name}</h3>
                {skill.verified ? (
                  <span title="Diagnostic Verified">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/20 px-1.5 py-0.2 rounded font-mono">
                    Self-Assessed
                  </span>
                )}
              </div>

              {/* Interactive Proficiency Slider */}
              <div className="space-y-1.5 my-4">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Level {skill.level}/4</span>
                  <span>{skill.level * 25}% Mastery</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={skill.level}
                  onChange={e => updateSkillLevel(skill.name, Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveView('assessments')}
                className="w-full py-2 rounded-xl border border-indigo-500/20 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Verify with Quiz</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
