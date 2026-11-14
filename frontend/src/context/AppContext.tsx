import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, Career, RoadmapData, AgentLog, AdaptiveEvent, UserSkill 
} from '../types';
import { apiService, FALLBACK_CAREERS, FALLBACK_USER } from '../services/api';

export type AppView = 
  | 'landing' 
  | 'dashboard' 
  | 'skills' 
  | 'careers' 
  | 'roadmap' 
  | 'mentor' 
  | 'assessments' 
  | 'adaptive' 
  | 'agents' 
  | 'analytics';

interface AppContextType {
  user: UserProfile;
  careers: Career[];
  activeCareer: Career;
  roadmap: RoadmapData | null;
  agentLogs: AgentLog[];
  isOrchestrating: boolean;
  activeView: AppView;
  adaptiveEvents: AdaptiveEvent[];
  notification: { id: string; message: string; type: 'success' | 'warning' | 'info' } | null;
  totalTokensUsed: number;
  setActiveView: (view: AppView) => void;
  setTargetCareer: (careerId: string) => Promise<void>;
  updateSkillLevel: (skillName: string, level: number) => void;
  addSkill: (skill: UserSkill) => void;
  toggleNodeCompletion: (nodeId: string) => void;
  runOrchestrationPipeline: (targetCareerId?: string) => Promise<void>;
  triggerAdaptiveRemedial: (skill: string, weakTopics: string[]) => void;
  triggerCareerPivot: (newCareerId: string) => Promise<void>;
  switchUser: (profileKey: 'alex_demo' | 'maya_demo') => Promise<void>;
  showNotification: (message: string, type?: 'success' | 'warning' | 'info') => void;
  dismissNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('skillsync_user');
    return saved ? JSON.parse(saved) : FALLBACK_USER;
  });
  const [careers, setCareers] = useState<Career[]>(FALLBACK_CAREERS);
  const [activeCareer, setActiveCareer] = useState<Career>(FALLBACK_CAREERS[0]);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [totalTokensUsed, setTotalTokensUsed] = useState<number>(310);
  const [adaptiveEvents, setAdaptiveEvents] = useState<AdaptiveEvent[]>([
    {
      id: 'init_event',
      type: 'node_completed',
      title: 'Skill Benchmark Calibrated',
      description: 'Orchestrator cross-referenced 5 verified profile competencies.',
      timestamp: 'Just now',
      impact: '+12% Career Readiness'
    }
  ]);
  const [notification, setNotification] = useState<{ id: string; message: string; type: 'success' | 'warning' | 'info' } | null>(null);

  // Sync user state to localStorage
  useEffect(() => {
    localStorage.setItem('skillsync_user', JSON.stringify(user));
  }, [user]);

  // Initial data load & orchestration
  useEffect(() => {
    const loadInitialData = async () => {
      const fetchedCareers = await apiService.getCareers();
      setCareers(fetchedCareers);
      const target = fetchedCareers.find(c => c.id === user.target_career_id) || fetchedCareers[0];
      setActiveCareer(target);
      await executeOrchestration(user, target.id);
    };
    loadInitialData();
  }, []);

  const showNotification = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `${Date.now()}`;
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification(prev => (prev?.id === id ? null : prev));
    }, 4500);
  };

  const dismissNotification = () => setNotification(null);

  const executeOrchestration = async (userProf: UserProfile, careerId: string) => {
    setIsOrchestrating(true);
    try {
      const res = await apiService.runOrchestration(userProf, careerId);
      setRoadmap(res.roadmap);
      setAgentLogs(res.agent_logs);
      setTotalTokensUsed(prev => prev + res.total_tokens_consumed);
      setUser(prev => ({
        ...prev,
        target_career_id: careerId,
        career_readiness: res.roadmap.readiness_score
      }));
    } catch (e) {
      console.error("Orchestration error:", e);
    } finally {
      setIsOrchestrating(false);
    }
  };

  const runOrchestrationPipeline = async (targetCareerId?: string) => {
    const cId = targetCareerId || user.target_career_id;
    showNotification("Orchestrator: Executing 6-agent collaborative pipeline...", "info");
    await executeOrchestration(user, cId);
    showNotification("Multi-agent consensus achieved. Learning path updated!", "success");
  };

  const setTargetCareer = async (careerId: string) => {
    const matched = careers.find(c => c.id === careerId);
    if (!matched) return;
    setActiveCareer(matched);
    showNotification(`Target Career switched to ${matched.title}`, 'info');
    await executeOrchestration({ ...user, target_career_id: careerId }, careerId);
  };

  const updateSkillLevel = (skillName: string, level: number) => {
    setUser(prev => {
      const existing = prev.skills.map(s => s.name === skillName ? { ...s, level } : s);
      const updatedUser = { ...prev, skills: existing };
      // Re-orchestrate smoothly
      executeOrchestration(updatedUser, updatedUser.target_career_id);
      return updatedUser;
    });
    showNotification(`Updated ${skillName} proficiency to Level ${level}`, 'success');
  };

  const addSkill = (skill: UserSkill) => {
    setUser(prev => {
      const exists = prev.skills.some(s => s.name.toLowerCase() === skill.name.toLowerCase());
      if (exists) return prev;
      const updatedSkills = [...prev.skills, skill];
      const updatedUser = { ...prev, skills: updatedSkills };
      executeOrchestration(updatedUser, updatedUser.target_career_id);
      return updatedUser;
    });
    showNotification(`Added ${skill.name} to your skill profile`, 'success');
  };

  const toggleNodeCompletion = (nodeId: string) => {
    if (!roadmap) return;
    let nodeTitle = '';
    let newlyCompleted = false;

    const updatedPhases = roadmap.phases.map(phase => ({
      ...phase,
      nodes: phase.nodes.map(node => {
        if (node.id === nodeId) {
          nodeTitle = node.title;
          newlyCompleted = !node.completed;
          return {
            ...node,
            completed: newlyCompleted,
            in_progress: false
          };
        }
        return node;
      })
    }));

    // Calculate updated readiness
    const totalNodes = updatedPhases.reduce((acc, p) => acc + p.nodes.length, 0);
    const completedNodes = updatedPhases.reduce((acc, p) => acc + p.nodes.filter(n => n.completed).length, 0);
    const newReadiness = Math.round((completedNodes / Math.max(totalNodes, 1)) * 100);

    setRoadmap({
      ...roadmap,
      phases: updatedPhases,
      readiness_score: newReadiness
    });

    setUser(prev => ({
      ...prev,
      career_readiness: newReadiness,
      hours_studied: newlyCompleted ? prev.hours_studied + 4.5 : prev.hours_studied
    }));

    if (newlyCompleted) {
      showNotification(`Completed "${nodeTitle}"! Career readiness increased to ${newReadiness}%`, 'success');
      setAdaptiveEvents(prev => [
        {
          id: `node_${Date.now()}`,
          type: 'node_completed',
          title: `Milestone Achieved: ${nodeTitle}`,
          description: `Progress Monitor updated completion trajectory to ${newReadiness}%.`,
          timestamp: 'Just now',
          impact: `+${Math.round(100 / totalNodes)}% Readiness`
        },
        ...prev
      ]);
    }
  };

  // Adaptive Feature 1: Weak Diagnostic triggers Remedial Injection
  const triggerAdaptiveRemedial = (skill: string, weakTopics: string[]) => {
    if (!roadmap) return;
    const sprintId = `remedial_${Date.now()}`;
    const remedialNode = {
      id: sprintId,
      title: `⚡ Remedial Sprint: ${skill} (${weakTopics.join(', ')})`,
      category: "Targeted Reinforcement",
      difficulty: "Intermediate",
      estimated_hours: 6,
      completed: false,
      in_progress: true,
      is_remedial: true,
      reason: `Automated agent intervention triggered by weak scores in ${weakTopics.join(', ')}.`,
      prerequisites: [],
      lessons: weakTopics.map(t => `Deep Dive: ${t} Concepts & Pitfalls`).concat(["Hands-on Bug Squash Drill"]),
      resources: [
        { title: `Targeted Diagnostic Review for ${skill}`, url: "https://developer.mozilla.org", type: "Remedial Guide", duration: "3h" },
        { title: "Interactive Debugging Sandboxes", url: "https://codesandbox.io", type: "Coding Lab", duration: "2h" }
      ],
      project_prompt: `Build a resilient unit test suite validating ${weakTopics.join(' and ')} edge cases.`
    };

    // Inject into phase 1 or active phase
    const phasesCopy = [...roadmap.phases];
    if (phasesCopy.length > 0) {
      phasesCopy[0] = {
        ...phasesCopy[0],
        nodes: [remedialNode, ...phasesCopy[0].nodes]
      };
    }

    setRoadmap({
      ...roadmap,
      phases: phasesCopy
    });

    setAdaptiveEvents(prev => [
      {
        id: sprintId,
        type: 'remedial_injected',
        title: `Adaptive Remedial Sprint Injected: ${skill}`,
        description: `Assessment Evaluator diagnosed gaps in ${weakTopics.join(', ')}. Injected high-priority remediation sprint into active roadmap.`,
        timestamp: 'Just now',
        impact: 'Roadmap Dynamically Restructured'
      },
      ...prev
    ]);

    showNotification(`Adaptive Engine: Injected Remedial Sprint for ${skill} (${weakTopics.join(', ')})`, 'warning');
  };

  // Adaptive Feature 2: Career Pivot retains existing completed skills & recalculates
  const triggerCareerPivot = async (newCareerId: string) => {
    const target = careers.find(c => c.id === newCareerId);
    if (!target) return;
    showNotification(`Adaptive Pivot: Recalculating gaps for ${target.title}...`, 'info');
    
    // Retain user's completed skills and re-run multi-agent pipeline
    await executeOrchestration({ ...user, target_career_id: newCareerId }, newCareerId);
    setActiveCareer(target);

    setAdaptiveEvents(prev => [
      {
        id: `pivot_${Date.now()}`,
        type: 'career_pivot',
        title: `Career Target Pivoted: ${target.title}`,
        description: `Preserved transferable competencies (${user.skills.map(s => s.name).join(', ')}). Recalculated missing core requirements.`,
        timestamp: 'Just now',
        impact: 'Path Re-benchmarked'
      },
      ...prev
    ]);

    showNotification(`Adaptive Engine: Successfully adjusted learning path to ${target.title}`, 'success');
  };

  const switchUser = async (profileKey: 'alex_demo' | 'maya_demo') => {
    if (profileKey === 'maya_demo') {
      const mayaProfile: UserProfile = {
        id: 'maya_demo',
        email: 'maya.lin@example.com',
        full_name: 'Maya Lin',
        target_career_id: 'ai-ml-engineer',
        career_readiness: 58.0,
        streak_days: 14,
        hours_studied: 36.5,
        skills: [
          { name: 'Python', level: 3, category: 'AI/ML', verified: true },
          { name: 'Data Analysis (Pandas/NumPy)', level: 3, category: 'AI/ML', verified: true },
          { name: 'SQL', level: 2, category: 'Database', verified: true },
          { name: 'Linear Algebra & Calculus', level: 2, category: 'Fundamentals', verified: false }
        ]
      };
      setUser(mayaProfile);
      const target = careers.find(c => c.id === 'ai-ml-engineer') || careers[1];
      setActiveCareer(target);
      await executeOrchestration(mayaProfile, 'ai-ml-engineer');
      showNotification("Switched to Maya Lin (AI & ML Track)", "info");
    } else {
      setUser(FALLBACK_USER);
      const target = careers.find(c => c.id === 'full-stack-dev') || careers[0];
      setActiveCareer(target);
      await executeOrchestration(FALLBACK_USER, 'full-stack-dev');
      showNotification("Switched to Alex Rivera (Full Stack Track)", "info");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        careers,
        activeCareer,
        roadmap,
        agentLogs,
        isOrchestrating,
        activeView,
        adaptiveEvents,
        notification,
        totalTokensUsed,
        setActiveView,
        setTargetCareer,
        updateSkillLevel,
        addSkill,
        toggleNodeCompletion,
        runOrchestrationPipeline,
        triggerAdaptiveRemedial,
        triggerCareerPivot,
        switchUser,
        showNotification,
        dismissNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
