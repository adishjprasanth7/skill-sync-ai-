export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Cloud' | 'Security' | 'Fundamentals' | 'General';

export interface UserSkill {
  name: string;
  level: number; // 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert
  category: SkillCategory;
  verified?: boolean;
}

export interface CareerRequirement {
  skill: string;
  level: number;
  weight: number;
  category: SkillCategory;
}

export interface CareerProject {
  title: string;
  difficulty: string;
  description: string;
  tech_stack: string[];
}

export interface Career {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  market_demand: string;
  growth_rate: string;
  avg_salary: string;
  core_skills: CareerRequirement[];
  recommended_skills: CareerRequirement[];
  phases: string[];
  capstone_projects: CareerProject[];
}

export interface LearningResource {
  title: string;
  url: string;
  type: string;
  duration: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  estimated_hours: number;
  completed: boolean;
  in_progress: boolean;
  is_remedial?: boolean;
  reason?: string;
  prerequisites: string[];
  lessons: string[];
  resources: LearningResource[];
  project_prompt?: string;
}

export interface RoadmapPhase {
  phase_number: number;
  title: string;
  nodes: RoadmapNode[];
}

export interface RoadmapData {
  career_id: string;
  career_title: string;
  readiness_score: number;
  phases: RoadmapPhase[];
  total_estimated_hours: number;
  analytics?: {
    matched_count: number;
    missing_count: number;
    transferable_skills: string[];
    est_weeks: number;
  };
}

export interface AgentLog {
  agent_name: string;
  role: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  input_summary: string;
  output_summary: string;
  tokens_used: number;
  timestamp: string;
}

export interface AssessmentQuestion {
  id: string;
  skill: string;
  topic: string;
  difficulty: string;
  question: string;
  code?: string;
  options: string[];
}

export interface AssessmentResult {
  skill: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  weak_topics: string[];
  mastered_topics: string[];
  breakdown: Array<{
    id: string;
    topic: string;
    question: string;
    selected_index: number;
    correct_index: number;
    is_correct: boolean;
    explanation: string;
  }>;
  evaluator_verdict?: string;
  remedial_actions?: Array<{
    topic: string;
    action: string;
    recommended_exercise: string;
  }>;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  target_career_id: string;
  career_readiness: number;
  streak_days: number;
  hours_studied: number;
  skills: UserSkill[];
}

export interface AdaptiveEvent {
  id: string;
  type: 'remedial_injected' | 'career_pivot' | 'fast_track' | 'node_completed';
  title: string;
  description: string;
  timestamp: string;
  impact: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
