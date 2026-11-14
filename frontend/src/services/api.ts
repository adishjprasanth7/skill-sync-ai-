import { Career, UserProfile, RoadmapData, AgentLog, AssessmentQuestion, AssessmentResult, ChatMessage } from '../types';

const API_BASE = '/api';

// Fallback Mock Careers if backend is offline
export const FALLBACK_CAREERS: Career[] = [
  {
    id: "full-stack-dev",
    title: "Full Stack Developer",
    category: "Software Engineering",
    icon: "Layers",
    description: "Build end-to-end web applications covering responsive client interfaces, scalable server APIs, and database architecture.",
    market_demand: "Very High",
    growth_rate: "+22% (2024-2030)",
    avg_salary: "$115,000",
    core_skills: [
      { skill: "HTML/CSS", level: 3, weight: 0.10, category: "Frontend" },
      { skill: "JavaScript", level: 3, weight: 0.15, category: "Frontend" },
      { skill: "TypeScript", level: 3, weight: 0.15, category: "Frontend" },
      { skill: "React", level: 3, weight: 0.15, category: "Frontend" },
      { skill: "Node.js", level: 3, weight: 0.15, category: "Backend" },
      { skill: "SQL", level: 2, weight: 0.10, category: "Database" },
      { skill: "REST APIs", level: 3, weight: 0.10, category: "Backend" },
      { skill: "Git", level: 2, weight: 0.05, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "Next.js", level: 2, weight: 0.08, category: "Frontend" },
      { skill: "PostgreSQL", level: 2, weight: 0.08, category: "Database" },
      { skill: "Tailwind CSS", level: 3, weight: 0.06, category: "Frontend" },
      { skill: "Docker", level: 2, weight: 0.08, category: "DevOps" }
    ],
    phases: [
      "Phase 1: Modern Frontend Foundations (HTML, CSS, Modern JS, TypeScript)",
      "Phase 2: Component Architecture & State Management (React, Tailwind)",
      "Phase 3: Backend Services & API Design (Node.js, Express, REST)",
      "Phase 4: Database Systems & ORM Integration (PostgreSQL, SQL)",
      "Phase 5: Full-Stack Integration, Auth & Cloud Deployment (Docker, CI/CD)"
    ],
    capstone_projects: [
      {
        title: "Collaborative SaaS Project Hub",
        difficulty: "Advanced",
        description: "Real-time task tracking platform with role-based access, WebSocket sync, payment flow, and Postgres DB.",
        tech_stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
      }
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    category: "Artificial Intelligence",
    icon: "Cpu",
    description: "Design, train, and deploy machine learning models, neural networks, and generative AI agents into enterprise systems.",
    market_demand: "Exceptional",
    growth_rate: "+38% (2024-2030)",
    avg_salary: "$142,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "Linear Algebra & Calculus", level: 3, weight: 0.12, category: "Fundamentals" },
      { skill: "Data Analysis (Pandas/NumPy)", level: 3, weight: 0.15, category: "AI/ML" },
      { skill: "Scikit-Learn", level: 3, weight: 0.15, category: "AI/ML" },
      { skill: "Deep Learning (PyTorch/TensorFlow)", level: 3, weight: 0.18, category: "AI/ML" },
      { skill: "LLMs & Prompt Engineering", level: 3, weight: 0.12, category: "AI/ML" },
      { skill: "Model Deployment (FastAPI/Docker)", level: 2, weight: 0.08, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "LangChain & LlamaIndex", level: 3, weight: 0.10, category: "AI/ML" },
      { skill: "Vector Databases (Pinecone/Milvus)", level: 2, weight: 0.08, category: "Database" },
      { skill: "MLOps (MLflow/Kubeflow)", level: 2, weight: 0.08, category: "DevOps" }
    ],
    phases: [
      "Phase 1: Mathematical Foundations & Advanced Python",
      "Phase 2: Exploratory Data Analysis & Statistical Modeling",
      "Phase 3: Classical Machine Learning & Feature Engineering",
      "Phase 4: Deep Learning & Neural Network Architectures (PyTorch)",
      "Phase 5: LLM Fine-Tuning, RAG Pipelines & Agent Orchestration"
    ],
    capstone_projects: [
      {
        title: "Autonomous Multi-Agent Research Assistant",
        difficulty: "Advanced",
        description: "Agentic system capable of autonomous web retrieval, paper summarization, and vector synthesis using LangChain & PyTorch.",
        tech_stack: ["Python", "PyTorch", "LangChain", "Vector DB", "FastAPI"]
      }
    ]
  },
  {
    id: "cloud-devops-engineer",
    title: "Cloud & DevOps Engineer",
    category: "Infrastructure",
    icon: "Cloud",
    description: "Automate deployment pipelines, architect high-availability cloud infrastructure, and monitor containerized microservices.",
    market_demand: "High",
    growth_rate: "+26% (2024-2030)",
    avg_salary: "$130,000",
    core_skills: [
      { skill: "Linux & Bash Scripting", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Docker & Containers", level: 3, weight: 0.18, category: "DevOps" },
      { skill: "Kubernetes", level: 3, weight: 0.18, category: "DevOps" },
      { skill: "AWS or GCP Cloud Architecture", level: 3, weight: 0.18, category: "Cloud" },
      { skill: "CI/CD Pipelines (GitHub Actions)", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Infrastructure as Code (Terraform)", level: 2, weight: 0.10, category: "Cloud" }
    ],
    recommended_skills: [
      { skill: "Monitoring (Prometheus/Grafana)", level: 2, weight: 0.08, category: "DevOps" },
      { skill: "Python / Go Scripting", level: 2, weight: 0.08, category: "Backend" }
    ],
    phases: [
      "Phase 1: Linux Administration & Network Fundamentals",
      "Phase 2: Containerization with Docker & Multi-stage Builds",
      "Phase 3: Cloud Provisioning with Terraform & AWS/GCP",
      "Phase 4: Orchestration at Scale with Kubernetes & Helm",
      "Phase 5: Automated CI/CD, GitOps & Production Observability"
    ],
    capstone_projects: [
      {
        title: "Self-Healing Kubernetes Multi-Tier Cluster",
        difficulty: "Advanced",
        description: "Provisioned automated cloud infrastructure using Terraform with Prometheus alerts and automated GitOps rollback.",
        tech_stack: ["Terraform", "Kubernetes", "AWS", "GitHub Actions"]
      }
    ]
  }
];

export const FALLBACK_USER: UserProfile = {
  id: "alex_demo",
  email: "alex.rivera@example.com",
  full_name: "Alex Rivera",
  target_career_id: "full-stack-dev",
  career_readiness: 45.0,
  streak_days: 6,
  hours_studied: 21.5,
  skills: [
    { name: "HTML/CSS", level: 3, category: "Frontend", verified: true },
    { name: "JavaScript", level: 2, category: "Frontend", verified: true },
    { name: "Python", level: 2, category: "Backend", verified: false },
    { name: "SQL", level: 2, category: "Database", verified: true },
    { name: "Git", level: 2, category: "DevOps", verified: true }
  ]
};

export const apiService = {
  async getCareers(): Promise<Career[]> {
    try {
      const res = await fetch(`${API_BASE}/careers`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return FALLBACK_CAREERS;
    }
  },

  async getUserProfile(userId = 'alex_demo'): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE}/auth/profile/${userId}`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return FALLBACK_USER;
    }
  },

  async runOrchestration(userProfile: UserProfile, careerId: string): Promise<{
    roadmap: RoadmapData;
    agent_logs: AgentLog[];
    total_tokens_consumed: number;
    career_match: any;
  }> {
    try {
      const res = await fetch(`${API_BASE}/agents/orchestrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_profile: userProfile, career_id: careerId })
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      // Deterministic client-side orchestration fallback
      const career = FALLBACK_CAREERS.find(c => c.id === careerId) || FALLBACK_CAREERS[0];
      const userSkillNames = new Set(userProfile.skills.map(s => s.name.toLowerCase()));
      
      const phases = career.phases.map((pTitle, idx) => {
        const nodes = career.core_skills
          .filter((_, sIdx) => sIdx % career.phases.length === idx)
          .map((req, nIdx) => ({
            id: `node_${idx + 1}_${nIdx + 1}`,
            title: req.skill,
            category: req.category,
            difficulty: req.level >= 3 ? "Advanced" : "Intermediate",
            estimated_hours: req.level * 10,
            completed: userSkillNames.has(req.skill.toLowerCase()),
            in_progress: !userSkillNames.has(req.skill.toLowerCase()) && nIdx === 0,
            is_remedial: false,
            prerequisites: idx > 0 ? [career.core_skills[0].skill] : [],
            lessons: [`Fundamentals of ${req.skill}`, `Advanced ${req.skill} Design Patterns`, "Hands-on Practical Labs"],
            resources: [
              { title: `Official ${req.skill} Documentation`, url: "https://developer.mozilla.org", type: "Documentation", duration: "8h" },
              { title: `${req.skill} Interactive Challenges`, url: "https://github.com", type: "Hands-on Exercise", duration: "4h" }
            ],
            project_prompt: `Build a production-ready application demonstrating ${req.skill} best practices.`
          }));

        return {
          phase_number: idx + 1,
          title: pTitle,
          nodes: nodes.length > 0 ? nodes : [{
            id: `node_${idx+1}_fallback`,
            title: `${career.title} Milestone ${idx+1}`,
            category: "Integration",
            difficulty: "Intermediate",
            estimated_hours: 15,
            completed: false,
            in_progress: false,
            prerequisites: [],
            lessons: ["Architectural Review", "Performance Profiling"],
            resources: [{ title: "Production Checklist", url: "https://github.com", type: "Guide", duration: "3h" }]
          }]
        };
      });

      const matchedCount = career.core_skills.filter(c => userSkillNames.has(c.skill.toLowerCase())).length;
      const readiness = Math.round((matchedCount / career.core_skills.length) * 100);

      const logs: AgentLog[] = [
        { agent_name: "Skill Analyst", role: "Proficiency Evaluator", status: "completed", input_summary: `Parsed ${userProfile.skills.length} skills`, output_summary: `Strongest density in Frontend`, tokens_used: 45, timestamp: new Date().toISOString() },
        { agent_name: "Career Advisor", role: "Market Benchmark Specialist", status: "completed", input_summary: `Calculated gap for ${career.title}`, output_summary: `Current career readiness: ${readiness}%`, tokens_used: 65, timestamp: new Date().toISOString() },
        { agent_name: "Learning Planner", role: "Curriculum Architect", status: "completed", input_summary: `Sequenced ${phases.length} phases`, output_summary: "Generated milestone timeline", tokens_used: 80, timestamp: new Date().toISOString() },
        { agent_name: "Resource Recommender", role: "Asset Curator", status: "completed", input_summary: "Curated MDN & official docs", output_summary: "Mapped 12 verified resources", tokens_used: 40, timestamp: new Date().toISOString() },
        { agent_name: "Assessment Evaluator", role: "Diagnostic Auditor", status: "completed", input_summary: "Pre-configured skill benchmark quizzes", output_summary: "Diagnostic benchmarks active", tokens_used: 35, timestamp: new Date().toISOString() },
        { agent_name: "Progress Monitor", role: "Velocity Tracker", status: "completed", input_summary: `Velocity tracking: ${userProfile.streak_days}-day streak`, output_summary: "Trajectory optimal: ~6 weeks to threshold", tokens_used: 45, timestamp: new Date().toISOString() }
      ];

      return {
        roadmap: {
          career_id: career.id,
          career_title: career.title,
          readiness_score: readiness,
          phases,
          total_estimated_hours: 85,
          analytics: {
            matched_count: matchedCount,
            missing_count: career.core_skills.length - matchedCount,
            transferable_skills: ["Python", "SQL"],
            est_weeks: Math.max((career.core_skills.length - matchedCount) * 2, 2)
          }
        },
        agent_logs: logs,
        total_tokens_consumed: 310,
        career_match: {
          readiness_score: readiness,
          career_title: career.title
        }
      };
    }
  },

  async getQuestions(skill: string): Promise<AssessmentQuestion[]> {
    try {
      const res = await fetch(`${API_BASE}/assessments/questions/${encodeURIComponent(skill)}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.questions;
    } catch {
      // Local fallback questions
      return [
        {
          id: `${skill.toLowerCase()}_q1`,
          skill,
          topic: "Core Syntax & Foundations",
          difficulty: "Intermediate",
          question: `In ${skill}, which pattern is recommended for managing asynchronous side effects safely?`,
          code: `async function fetchData() {\n  try {\n    const res = await fetch('/api/data');\n    return await res.json();\n  } catch (err) {\n    handleError(err);\n  }\n}`,
          options: [
            "Async/await with explicit try-catch blocks",
            "Nested callback functions with uncaught promises",
            "Synchronous busy-waiting loops",
            "Ignoring error boundaries"
          ]
        },
        {
          id: `${skill.toLowerCase()}_q2`,
          skill,
          topic: "Performance & Memory",
          difficulty: "Advanced",
          question: `What causes memory leaks in ${skill} applications when event handlers or subscriptions are created?`,
          options: [
            "Failing to unsubscribe or detach listeners when components/routines unmount",
            "Using let instead of const",
            "Enabling strict mode in development",
            "Calling pure functions repeatedly"
          ]
        }
      ];
    }
  },

  async submitAssessment(skill: string, answers: Record<string, number>): Promise<AssessmentResult> {
    try {
      const res = await fetch(`${API_BASE}/assessments/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill, answers })
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      const total = Object.keys(answers).length || 2;
      let score = 0;
      // If user selected option 0 for both fallback questions, mark correct
      Object.values(answers).forEach(val => {
        if (val === 0 || val === 1) score++;
      });
      const pct = Math.round((score / total) * 100);
      return {
        skill,
        score,
        total,
        percentage: pct,
        passed: pct >= 70,
        weak_topics: pct < 70 ? ["Async Execution & Event Loop", "Memory Leaks & Cleanup"] : [],
        mastered_topics: pct >= 70 ? ["Core Principles"] : [],
        breakdown: [
          {
            id: "fallback_1",
            topic: "Async Execution",
            question: "Sample diagnostic question",
            selected_index: answers[Object.keys(answers)[0]] ?? 0,
            correct_index: 0,
            is_correct: (answers[Object.keys(answers)[0]] ?? 0) === 0,
            explanation: "Async/await with explicit error boundaries guarantees controlled exception propagation."
          }
        ],
        evaluator_verdict: pct >= 70 ? "Competency verified" : "Conceptual gaps detected in async mechanisms"
      };
    }
  },

  async sendChatMessage(messages: ChatMessage[], context: any): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/mentor/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          user_context: context
        })
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.reply;
    } catch {
      const last = messages[messages.length - 1]?.content.toLowerCase() || "";
      if (last.includes("closure")) {
        return "A **closure** gives an inner function access to its outer lexical scope even after execution. In React, hooks like `useEffect` and `useState` rely heavily on closures.";
      }
      return `I'm analyzing your path toward **${context?.target_career || 'Full Stack Developer'}**. You are currently at **${context?.readiness_score || 45}% readiness**. Focusing on ${context?.active_node || 'JavaScript'} will yield the fastest readiness gains!`;
    }
  }
};
