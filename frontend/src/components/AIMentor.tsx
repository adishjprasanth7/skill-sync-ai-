import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, Send, Sparkles, User, Terminal, 
  HelpCircle, Zap, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { apiService } from '../services/api';
import { ChatMessage } from '../types';

export const AIMentor: React.FC = () => {
  const { user, activeCareer, roadmap } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello ${user.full_name.split(' ')[0]}! I'm your context-grounded AI Mentor. 
I'm actively synchronized with your **${activeCareer.title}** roadmap. You're currently at **${user.career_readiness}% Career Readiness**.

How can I help you master your current milestones today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "Explain JavaScript Closures with code",
    "Why did my roadmap adjust adaptively?",
    "Give me a practical SQL indexing challenge",
    "Prepare me for Full Stack interview questions"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const activeNode = roadmap?.phases.flatMap(p => p.nodes).find(n => !n.completed)?.title || "JavaScript";
      const context = {
        target_career: activeCareer.title,
        readiness_score: user.career_readiness,
        active_node: activeNode,
        weak_topics: ["Async Event Loop", "Closures"]
      };

      const replyText = await apiService.sendChatMessage([...messages, userMsg], context);

      const botMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header & Grounding Context */}
      <div className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Bot className="w-4 h-4" />
              <span>Grounded Conversational Intelligence</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">AI Mentor</h1>
            <p className="text-xs text-slate-400 mt-1">
              Context-aware assistant directly wired to your career readiness metrics, roadmap milestones, and assessment history.
            </p>
          </div>

          {/* Active Context Chips */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/70 p-3 rounded-2xl border border-slate-800 shrink-0 text-[11px]">
            <span className="text-slate-400">Context:</span>
            <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              {activeCareer.title}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              {user.career_readiness}% Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-md'
                    : 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Content Bubble */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">{m.content}</div>
                  <div className={`text-[10px] text-right ${isUser ? 'text-indigo-200' : 'text-slate-500 font-mono'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 rounded-tl-none flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 ml-1" />
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything about your roadmap, coding exercises, or interview questions..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
