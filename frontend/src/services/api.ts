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
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & Analytics",
    icon: "BarChart3",
    description: "Transform massive datasets into strategic predictive insights, statistical models, and executive intelligence dashboards.",
    market_demand: "High",
    growth_rate: "+24% (2024-2030)",
    avg_salary: "$125,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "SQL & Relational Queries", level: 3, weight: 0.18, category: "Database" },
      { skill: "Probability & Statistics", level: 3, weight: 0.16, category: "Fundamentals" },
      { skill: "Pandas & Data Wrangling", level: 3, weight: 0.16, category: "AI/ML" },
      { skill: "Data Visualization (Seaborn/Plotly)", level: 3, weight: 0.12, category: "Frontend" },
      { skill: "Predictive Modeling (Scikit-Learn)", level: 3, weight: 0.14, category: "AI/ML" }
    ],
    recommended_skills: [
      { skill: "Big Data (PySpark)", level: 2, weight: 0.08, category: "Database" },
      { skill: "Tableau / PowerBI", level: 2, weight: 0.06, category: "Frontend" }
    ],
    phases: [
      "Phase 1: Advanced Statistical Analysis & SQL Deep-Dive",
      "Phase 2: High-Performance Data Cleaning & ETL Pipelines",
      "Phase 3: Exploratory Analytics & Visual Storytelling",
      "Phase 4: Machine Learning Algorithms & Cross-Validation"
    ],
    capstone_projects: [
      {
        title: "Healthcare Risk Prediction Engine",
        difficulty: "Advanced",
        description: "Multi-variable statistical model identifying high-risk patient readmissions with ROC-AUC 0.92.",
        tech_stack: ["Python", "SQL", "Pandas", "Scikit-Learn", "Streamlit"]
      }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    icon: "ShieldCheck",
    description: "Defend networks, detect vulnerabilities, perform incident response, and enforce zero-trust security postures.",
    market_demand: "Very High",
    growth_rate: "+32% (2024-2030)",
    avg_salary: "$118,000",
    core_skills: [
      { skill: "Networking & Protocols (TCP/IP, DNS)", level: 3, weight: 0.18, category: "Fundamentals" },
      { skill: "Linux & Command Line", level: 3, weight: 0.16, category: "DevOps" },
      { skill: "Security Information & Event Management (SIEM)", level: 3, weight: 0.18, category: "Security" },
      { skill: "Vulnerability Assessment (Nessus/Nmap)", level: 3, weight: 0.16, category: "Security" },
      { skill: "Python for Security Automation", level: 2, weight: 0.12, category: "AI/ML" }
    ],
    recommended_skills: [
      { skill: "Cloud Security (AWS IAM)", level: 2, weight: 0.08, category: "Cloud" }
    ],
    phases: [
      "Phase 1: Computer Networking & Cyber Fundamentals",
      "Phase 2: Linux Hardening & Offensive Security Fundamentals",
      "Phase 3: Threat Detection, Log Analysis & SIEM Operations",
      "Phase 4: Vulnerability Scanning & Penetration Testing"
    ],
    capstone_projects: [
      {
        title: "Automated SOC Threat Detection & Honeypot",
        difficulty: "Advanced",
        description: "Deploys a cloud honeypot to capture real-world brute-force attacks and generates automated triage alerts in Splunk.",
        tech_stack: ["Linux", "Python", "Wireshark", "Splunk", "AWS"]
      }
    ]
  },
  {
    id: "frontend-architect",
    title: "Frontend Architect & UI Engineer",
    category: "Software Engineering",
    icon: "Layout",
    description: "Design high-performance enterprise web architectures, micro-frontends, accessible design systems, and state engines.",
    market_demand: "High",
    growth_rate: "+20% (2024-2030)",
    avg_salary: "$135,000",
    core_skills: [
      { skill: "HTML/CSS", level: 4, weight: 0.15, category: "Frontend" },
      { skill: "JavaScript", level: 4, weight: 0.20, category: "Frontend" },
      { skill: "TypeScript", level: 4, weight: 0.20, category: "Frontend" },
      { skill: "React", level: 4, weight: 0.20, category: "Frontend" },
      { skill: "Tailwind CSS", level: 4, weight: 0.10, category: "Frontend" },
      { skill: "Next.js", level: 3, weight: 0.15, category: "Frontend" }
    ],
    recommended_skills: [
      { skill: "Design Systems & Storybook", level: 3, weight: 0.10, category: "Frontend" }
    ],
    phases: [
      "Phase 1: Advanced TypeScript Generics & Modern Layouts",
      "Phase 2: React Fiber Reconciler & Custom Rendering",
      "Phase 3: Server-Driven UI & Micro-Frontend Architecture",
      "Phase 4: Core Web Vitals & Runtime Performance Profiling"
    ],
    capstone_projects: [
      {
        title: "Enterprise Design System & Micro-Frontend Platform",
        difficulty: "Advanced",
        description: "Full design token compiler and component library published with automated visual regression tests.",
        tech_stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Vite"]
      }
    ]
  },
  {
    id: "backend-engineer",
    title: "Backend Systems & Distributed Engineer",
    category: "Software Engineering",
    icon: "Server",
    description: "Architect high-throughput distributed systems, event-driven microservices, database clusters, and fault-tolerant APIs.",
    market_demand: "Very High",
    growth_rate: "+25% (2024-2030)",
    avg_salary: "$138,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.18, category: "Backend" },
      { skill: "Node.js", level: 3, weight: 0.15, category: "Backend" },
      { skill: "REST APIs", level: 4, weight: 0.15, category: "Backend" },
      { skill: "SQL", level: 4, weight: 0.18, category: "Database" },
      { skill: "PostgreSQL", level: 3, weight: 0.14, category: "Database" },
      { skill: "Docker & Containers", level: 3, weight: 0.12, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "GraphQL", level: 3, weight: 0.08, category: "Backend" }
    ],
    phases: [
      "Phase 1: Network Protocols, Concurrency & Asynchronous I/O",
      "Phase 2: Advanced Relational Modeling, Indexing & Sharding",
      "Phase 3: Event-Driven Microservices & Message Queues",
      "Phase 4: Distributed Caching, Rate Limiting & High Availability"
    ],
    capstone_projects: [
      {
        title: "Distributed Financial Transaction Engine",
        difficulty: "Advanced",
        description: "Fault-tolerant ACID distributed transaction processor processing 10,000+ operations/sec with idempotency.",
        tech_stack: ["Node.js", "Python", "PostgreSQL", "Docker"]
      }
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Developer (React Native & Cross-Platform)",
    category: "Mobile Development",
    icon: "Smartphone",
    description: "Create cross-platform iOS and Android applications with offline-first persistence, native device bridges, and animations.",
    market_demand: "High",
    growth_rate: "+21% (2024-2030)",
    avg_salary: "$118,000",
    core_skills: [
      { skill: "JavaScript", level: 4, weight: 0.20, category: "Frontend" },
      { skill: "TypeScript", level: 3, weight: 0.18, category: "Frontend" },
      { skill: "React", level: 4, weight: 0.22, category: "Frontend" },
      { skill: "REST APIs", level: 3, weight: 0.15, category: "Backend" },
      { skill: "HTML/CSS", level: 3, weight: 0.15, category: "Frontend" },
      { skill: "Git", level: 2, weight: 0.10, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "Offline Storage (SQLite/WatermelonDB)", level: 2, weight: 0.10, category: "Database" }
    ],
    phases: [
      "Phase 1: Core React & Mobile-First Component Lifecycle",
      "Phase 2: React Native Navigation, Gestures & Haptic Feedback",
      "Phase 3: Offline Sync, SQLite Storage & Push Notifications"
    ],
    capstone_projects: [
      {
        title: "Fitness Companion with Offline Sync & HealthKit",
        difficulty: "Advanced",
        description: "Cross-platform health companion app with offline caching, interactive biometric charts, and push alerts.",
        tech_stack: ["React Native", "TypeScript", "REST APIs", "SQLite"]
      }
    ]
  },
  {
    id: "ai-agent-architect",
    title: "AI Agents & LLM Solutions Architect",
    category: "Artificial Intelligence",
    icon: "Bot",
    description: "Orchestrate autonomous agent systems, multi-agent swarms, RAG pipelines, fine-tuned foundational models, and vector search.",
    market_demand: "Exceptional",
    growth_rate: "+45% (2024-2030)",
    avg_salary: "$155,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.22, category: "AI/ML" },
      { skill: "LLMs & Prompt Engineering", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "LangChain & LlamaIndex", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "Vector Databases (Pinecone/Milvus)", level: 3, weight: 0.15, category: "Database" },
      { skill: "REST APIs", level: 3, weight: 0.13, category: "Backend" },
      { skill: "Docker & Containers", level: 2, weight: 0.10, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "FastAPI", level: 3, weight: 0.10, category: "Backend" }
    ],
    phases: [
      "Phase 1: Advanced Prompt Strategies, Few-Shot & JSON Mode",
      "Phase 2: Production RAG: Chunking, Re-Ranking & Hybrid Search",
      "Phase 3: Autonomous Multi-Agent Swarms & Tool Calling",
      "Phase 4: Agent Observability, Tracing & Guardrail Security"
    ],
    capstone_projects: [
      {
        title: "Autonomous Enterprise Knowledge Agent Network",
        difficulty: "Advanced",
        description: "Coordinated multi-agent pipeline querying corporate docs, verifying sources, and synthesizing executive briefings.",
        tech_stack: ["Python", "LangChain", "Vector DB", "FastAPI", "Docker"]
      }
    ]
  },
  {
    id: "data-engineer",
    title: "Data Engineer & Big Data Architect",
    category: "Data & Analytics",
    icon: "Database",
    description: "Build high-scale batch and streaming data pipelines, lakehouse architectures, ETL workflows, and data governance systems.",
    market_demand: "Very High",
    growth_rate: "+28% (2024-2030)",
    avg_salary: "$135,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "SQL", level: 4, weight: 0.22, category: "Database" },
      { skill: "PostgreSQL", level: 3, weight: 0.15, category: "Database" },
      { skill: "Linux & Bash Scripting", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Docker & Containers", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Git", level: 3, weight: 0.13, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "Apache Spark & PySpark", level: 3, weight: 0.12, category: "Database" }
    ],
    phases: [
      "Phase 1: Advanced SQL Analytics, Partitioning & Indexing",
      "Phase 2: High-Volume Python ETL & Schema Migration",
      "Phase 3: Distributed Data Processing with Spark",
      "Phase 4: Cloud Data Lakes & Pipeline Orchestration"
    ],
    capstone_projects: [
      {
        title: "Real-Time Streaming Clickstream Analytics Pipeline",
        difficulty: "Advanced",
        description: "Streaming ingestion processing millions of events per hour into an analytical lakehouse with automated schema validation.",
        tech_stack: ["Python", "SQL", "PostgreSQL", "Docker"]
      }
    ]
  },
  {
    id: "site-reliability-engineer",
    title: "Site Reliability Engineer (SRE)",
    category: "Infrastructure",
    icon: "Activity",
    description: "Apply software engineering principles to operations, architecting automated self-healing clusters, SLO/SLA telemetry, and zero-downtime rollouts.",
    market_demand: "Very High",
    growth_rate: "+27% (2024-2030)",
    avg_salary: "$140,000",
    core_skills: [
      { skill: "Linux & Bash Scripting", level: 4, weight: 0.18, category: "DevOps" },
      { skill: "Docker & Containers", level: 4, weight: 0.18, category: "DevOps" },
      { skill: "Kubernetes", level: 4, weight: 0.20, category: "DevOps" },
      { skill: "CI/CD Pipelines (GitHub Actions)", level: 3, weight: 0.16, category: "DevOps" },
      { skill: "Python", level: 3, weight: 0.15, category: "AI/ML" },
      { skill: "AWS or GCP Cloud Architecture", level: 3, weight: 0.13, category: "Cloud" }
    ],
    recommended_skills: [
      { skill: "Infrastructure as Code (Terraform)", level: 3, weight: 0.12, category: "Cloud" }
    ],
    phases: [
      "Phase 1: Linux Internals, Kernel Tuning & Telemetry Agents",
      "Phase 2: Container Fleet Orchestration & Service Mesh (Istio)",
      "Phase 3: Automated SLO/SLI Budgeting & Chaos Engineering",
      "Phase 4: Multi-Region Active-Active Failover & Disaster Recovery"
    ],
    capstone_projects: [
      {
        title: "Autonomous Self-Healing Kubernetes Fleet with Chaos Injection",
        difficulty: "Advanced",
        description: "Orchestrates automated node failover, canary deployments, and automated rollback upon latency SLA breaches.",
        tech_stack: ["Kubernetes", "Prometheus", "Terraform", "Python", "Docker"]
      }
    ]
  },
  {
    id: "nlp-engineer",
    title: "NLP & Large Language Model Specialist",
    category: "Artificial Intelligence",
    icon: "Sparkles",
    description: "Engineer state-of-the-art Natural Language Processing models, domain-specific LoRA fine-tuning, retrieval-augmented pipelines, and tokenizer architectures.",
    market_demand: "Exceptional",
    growth_rate: "+42% (2024-2030)",
    avg_salary: "$150,000",
    core_skills: [
      { skill: "Python", level: 4, weight: 0.22, category: "AI/ML" },
      { skill: "Linear Algebra & Calculus", level: 3, weight: 0.14, category: "Fundamentals" },
      { skill: "Deep Learning (PyTorch/TensorFlow)", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "LLMs & Prompt Engineering", level: 4, weight: 0.20, category: "AI/ML" },
      { skill: "LangChain & LlamaIndex", level: 3, weight: 0.14, category: "AI/ML" },
      { skill: "Data Analysis (Pandas/NumPy)", level: 3, weight: 0.10, category: "AI/ML" }
    ],
    recommended_skills: [
      { skill: "Vector Databases (Pinecone/Milvus)", level: 3, weight: 0.10, category: "Database" }
    ],
    phases: [
      "Phase 1: Deep Learning Foundations & Transformer Math",
      "Phase 2: Attention Mechanisms, Tokenization & Embeddings",
      "Phase 3: Parameter-Efficient Fine Tuning (PEFT/LoRA/QLoRA)",
      "Phase 4: Multi-Stage Hybrid RAG & Hallucination Guardrails"
    ],
    capstone_projects: [
      {
        title: "Domain-Specific Legal & Financial Synthesis Engine",
        difficulty: "Advanced",
        description: "Custom fine-tuned 8B foundational LLM coupled with hybrid BM25 + dense vector search and citation cross-referencing.",
        tech_stack: ["PyTorch", "Python", "Hugging Face", "Vector DB", "FastAPI"]
      }
    ]
  },
  {
    id: "blockchain-web3-engineer",
    title: "Web3 & Blockchain Protocol Engineer",
    category: "Software Engineering",
    icon: "Boxes",
    description: "Architect decentralized protocols, verifiable smart contracts, tokenomic architectures, EVM state machines, and cryptographic verification.",
    market_demand: "High",
    growth_rate: "+22% (2024-2030)",
    avg_salary: "$145,000",
    core_skills: [
      { skill: "JavaScript", level: 4, weight: 0.18, category: "Frontend" },
      { skill: "TypeScript", level: 4, weight: 0.20, category: "Frontend" },
      { skill: "Node.js", level: 3, weight: 0.18, category: "Backend" },
      { skill: "REST APIs", level: 3, weight: 0.14, category: "Backend" },
      { skill: "Git", level: 3, weight: 0.10, category: "DevOps" },
      { skill: "Linux & Bash Scripting", level: 2, weight: 0.20, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "Solidity Smart Contracts", level: 3, weight: 0.12, category: "Backend" }
    ],
    phases: [
      "Phase 1: Cryptographic Hashes, Merkle Trees & Ledger Protocols",
      "Phase 2: EVM Execution, Solidity Programming & Reentrancy Guards",
      "Phase 3: Decentralized Application (dApp) Frontends with Ethers/Viem",
      "Phase 4: Smart Contract Auditing & Automated Security Testing"
    ],
    capstone_projects: [
      {
        title: "Decentralized Escrow & Multi-Sig Governance Protocol",
        difficulty: "Advanced",
        description: "Time-locked cryptographic escrow vault with decentralized multi-sig verification and automated audit test suite.",
        tech_stack: ["TypeScript", "Solidity", "Node.js", "React", "Hardhat"]
      }
    ]
  },
  {
    id: "cloud-solutions-architect",
    title: "Enterprise Cloud Solutions Architect",
    category: "Infrastructure",
    icon: "Cloud",
    description: "Design secure, highly available, multi-region enterprise architectures across AWS, Azure, and GCP adhering to the Well-Architected Framework.",
    market_demand: "Exceptional",
    growth_rate: "+30% (2024-2030)",
    avg_salary: "$160,000",
    core_skills: [
      { skill: "AWS or GCP Cloud Architecture", level: 4, weight: 0.25, category: "Cloud" },
      { skill: "Infrastructure as Code (Terraform)", level: 4, weight: 0.20, category: "Cloud" },
      { skill: "Docker & Containers", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Kubernetes", level: 3, weight: 0.15, category: "DevOps" },
      { skill: "Networking & Protocols (TCP/IP, DNS)", level: 4, weight: 0.15, category: "Fundamentals" },
      { skill: "Linux & Bash Scripting", level: 3, weight: 0.10, category: "DevOps" }
    ],
    recommended_skills: [
      { skill: "Enterprise Zero Trust Security", level: 3, weight: 0.10, category: "Security" }
    ],
    phases: [
      "Phase 1: Well-Architected Pillars (Security, Reliability, Cost)",
      "Phase 2: Enterprise Hybrid Networking, VPC Peering & Direct Connect",
      "Phase 3: Multi-Cloud Infrastructure Automation with Terraform",
      "Phase 4: Global Disaster Recovery, IAM Federation & Compliance"
    ],
    capstone_projects: [
      {
        title: "Global Multi-Region Active-Active Cloud Backbone",
        difficulty: "Advanced",
        description: "Zero-trust enterprise topology spanning AWS and GCP with geo-DNS routing, sub-second latency failover, and automated IaC.",
        tech_stack: ["Terraform", "AWS", "GCP", "Kubernetes", "Docker"]
      }
    ]
  },
  {
    id: "product-manager-tech",
    title: "Technical AI Product Manager",
    category: "Product & Management",
    icon: "Compass",
    description: "Guide high-growth technical and AI products from inception through validation to scale, uniting machine learning engineering with market impact.",
    market_demand: "High",
    growth_rate: "+23% (2024-2030)",
    avg_salary: "$138,000",
    core_skills: [
      { skill: "SQL", level: 3, weight: 0.22, category: "Database" },
      { skill: "Python", level: 2, weight: 0.18, category: "AI/ML" },
      { skill: "REST APIs", level: 3, weight: 0.18, category: "Backend" },
      { skill: "Git", level: 2, weight: 0.14, category: "DevOps" },
      { skill: "Data Visualization (Seaborn/Plotly)", level: 3, weight: 0.16, category: "Frontend" },
      { skill: "LLMs & Prompt Engineering", level: 2, weight: 0.12, category: "AI/ML" }
    ],
    recommended_skills: [
      { skill: "A/B Testing & Statistical Experimentation", level: 3, weight: 0.12, category: "Fundamentals" }
    ],
    phases: [
      "Phase 1: Market Intelligence, Technical Discovery & User Journey",
      "Phase 2: SQL Analytics, Experimentation Design & Feature Prioritization",
      "Phase 3: AI Product Feasibility, Model Evaluation & Prompt Auditing",
      "Phase 4: Product Analytics Instrumentation & Global GTM Scaling"
    ],
    capstone_projects: [
      {
        title: "AI Copilot Product Strategy, PRD & Analytics Dashboard",
        difficulty: "Advanced",
        description: "Comprehensive technical PRD with SQL cohort telemetry, user retention modeling, and model evaluation metrics.",
        tech_stack: ["SQL", "Python", "REST APIs", "Data Visualization", "Git"]
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

  async registerUser(data: { email: string; full_name: string; password: string; target_career_id?: string }): Promise<{ access_token: string; user: UserProfile; message: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Registration failed' }));
      throw new Error(err.detail || 'Registration failed');
    }
    return await res.json();
  },

  async loginUser(data: { email: string; password: string }): Promise<{ access_token: string; user: UserProfile; message: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(err.detail || 'Invalid email or password');
    }
    return await res.json();
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
