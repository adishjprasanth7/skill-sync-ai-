"""
Career Definitions and Requirements Database
"""

CAREERS_DATA = [
    {
        "id": "full-stack-dev",
        "title": "Full Stack Developer",
        "category": "Software Engineering",
        "icon": "Layers",
        "description": "Build end-to-end web applications covering responsive client interfaces, scalable server APIs, and database architecture.",
        "market_demand": "Very High",
        "growth_rate": "+22% (2024-2030)",
        "avg_salary": "$115,000",
        "core_skills": [
            {"skill": "HTML/CSS", "level": 3, "weight": 0.10, "category": "Frontend"},
            {"skill": "JavaScript", "level": 3, "weight": 0.15, "category": "Frontend"},
            {"skill": "TypeScript", "level": 3, "weight": 0.15, "category": "Frontend"},
            {"skill": "React", "level": 3, "weight": 0.15, "category": "Frontend"},
            {"skill": "Node.js", "level": 3, "weight": 0.15, "category": "Backend"},
            {"skill": "SQL", "level": 2, "weight": 0.10, "category": "Database"},
            {"skill": "REST APIs", "level": 3, "weight": 0.10, "category": "Backend"},
            {"skill": "Git", "level": 2, "weight": 0.05, "category": "DevOps"}
        ],
        "recommended_skills": [
            {"skill": "Next.js", "level": 2, "weight": 0.08, "category": "Frontend"},
            {"skill": "PostgreSQL", "level": 2, "weight": 0.08, "category": "Database"},
            {"skill": "Tailwind CSS", "level": 3, "weight": 0.06, "category": "Frontend"},
            {"skill": "Docker", "level": 2, "weight": 0.08, "category": "DevOps"},
            {"skill": "GraphQL", "level": 2, "weight": 0.05, "category": "Backend"}
        ],
        "phases": [
            "Phase 1: Modern Frontend Foundations (HTML, CSS, Modern JS, TypeScript)",
            "Phase 2: Component Architecture & State Management (React, Tailwind)",
            "Phase 3: Backend Services & API Design (Node.js, Express, REST)",
            "Phase 4: Database Systems & ORM Integration (PostgreSQL, SQL, Prisma)",
            "Phase 5: Full-Stack Integration, Auth & Cloud Deployment (Docker, CI/CD)"
        ],
        "capstone_projects": [
            {
                "title": "Collaborative SaaS Project Hub",
                "difficulty": "Advanced",
                "description": "Real-time task tracking platform with role-based access, WebSocket sync, payment flow, and Postgres DB.",
                "tech_stack": ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
            },
            {
                "title": "Interactive E-Commerce Marketplace",
                "difficulty": "Intermediate",
                "description": "Full-featured shopping platform with cart state, inventory management, user checkout, and search indexing.",
                "tech_stack": ["React", "Node.js", "SQL", "REST APIs"]
            }
        ]
    },
    {
        "id": "ai-ml-engineer",
        "title": "AI & Machine Learning Engineer",
        "category": "Artificial Intelligence",
        "icon": "Cpu",
        "description": "Design, train, and deploy machine learning models, neural networks, and generative AI agents into enterprise systems.",
        "market_demand": "Exceptional",
        "growth_rate": "+38% (2024-2030)",
        "avg_salary": "$142,000",
        "core_skills": [
            {"skill": "Python", "level": 4, "weight": 0.20, "category": "AI/ML"},
            {"skill": "Linear Algebra & Calculus", "level": 3, "weight": 0.12, "category": "Fundamentals"},
            {"skill": "Data Analysis (Pandas/NumPy)", "level": 3, "weight": 0.15, "category": "AI/ML"},
            {"skill": "Scikit-Learn", "level": 3, "weight": 0.15, "category": "AI/ML"},
            {"skill": "Deep Learning (PyTorch/TensorFlow)", "level": 3, "weight": 0.18, "category": "AI/ML"},
            {"skill": "LLMs & Prompt Engineering", "level": 3, "weight": 0.12, "category": "AI/ML"},
            {"skill": "Model Deployment (FastAPI/Docker)", "level": 2, "weight": 0.08, "category": "DevOps"}
        ],
        "recommended_skills": [
            {"skill": "LangChain & LlamaIndex", "level": 3, "weight": 0.10, "category": "AI/ML"},
            {"skill": "Vector Databases (Pinecone/Milvus)", "level": 2, "weight": 0.08, "category": "Database"},
            {"skill": "MLOps (MLflow/Kubeflow)", "level": 2, "weight": 0.08, "category": "DevOps"},
            {"skill": "SQL", "level": 2, "weight": 0.06, "category": "Database"}
        ],
        "phases": [
            "Phase 1: Mathematical Foundations & Advanced Python",
            "Phase 2: Exploratory Data Analysis & Statistical Modeling",
            "Phase 3: Classical Machine Learning & Feature Engineering",
            "Phase 4: Deep Learning & Neural Network Architectures (PyTorch)",
            "Phase 5: LLM Fine-Tuning, RAG Pipelines & Agent Orchestration"
        ],
        "capstone_projects": [
            {
                "title": "Autonomous Multi-Agent Research Assistant",
                "difficulty": "Advanced",
                "description": "Agentic system capable of autonomous web retrieval, paper summarization, and vector synthesis using LangChain & PyTorch.",
                "tech_stack": ["Python", "PyTorch", "LangChain", "Vector DB", "FastAPI"]
            },
            {
                "title": "Predictive Customer Churn Pipeline",
                "difficulty": "Intermediate",
                "description": "End-to-end ML classification pipeline with hyperparameter tuning, model explainability (SHAP), and API serving.",
                "tech_stack": ["Python", "Scikit-Learn", "Pandas", "FastAPI"]
            }
        ]
    },
    {
        "id": "cloud-devops-engineer",
        "title": "Cloud & DevOps Engineer",
        "category": "Infrastructure",
        "icon": "Cloud",
        "description": "Automate deployment pipelines, architect high-availability cloud infrastructure, and monitor containerized microservices.",
        "market_demand": "High",
        "growth_rate": "+26% (2024-2030)",
        "avg_salary": "$130,000",
        "core_skills": [
            {"skill": "Linux & Bash Scripting", "level": 3, "weight": 0.15, "category": "DevOps"},
            {"skill": "Docker & Containers", "level": 3, "weight": 0.18, "category": "DevOps"},
            {"skill": "Kubernetes", "level": 3, "weight": 0.18, "category": "DevOps"},
            {"skill": "AWS or GCP Cloud Architecture", "level": 3, "weight": 0.18, "category": "Cloud"},
            {"skill": "CI/CD Pipelines (GitHub Actions)", "level": 3, "weight": 0.15, "category": "DevOps"},
            {"skill": "Infrastructure as Code (Terraform)", "level": 2, "weight": 0.10, "category": "Cloud"},
            {"skill": "Git", "level": 3, "weight": 0.06, "category": "DevOps"}
        ],
        "recommended_skills": [
            {"skill": "Monitoring (Prometheus/Grafana)", "level": 2, "weight": 0.08, "category": "DevOps"},
            {"skill": "Python / Go Scripting", "level": 2, "weight": 0.08, "category": "Backend"},
            {"skill": "Security & Compliance (IAM/Vault)", "level": 2, "weight": 0.06, "category": "Cloud"}
        ],
        "phases": [
            "Phase 1: Linux Administration & Network Fundamentals",
            "Phase 2: Containerization with Docker & Multi-stage Builds",
            "Phase 3: Cloud Provisioning with Terraform & AWS/GCP",
            "Phase 4: Orchestration at Scale with Kubernetes & Helm",
            "Phase 5: Automated CI/CD, GitOps & Production Observability"
        ],
        "capstone_projects": [
            {
                "title": "Self-Healing Kubernetes Multi-Tier Cluster",
                "difficulty": "Advanced",
                "description": "Provisioned automated cloud infrastructure using Terraform with Prometheus alerts and automated GitOps rollback.",
                "tech_stack": ["Terraform", "Kubernetes", "AWS", "GitHub Actions", "Prometheus"]
            }
        ]
    },
    {
        "id": "data-scientist",
        "title": "Data Scientist",
        "category": "Data & Analytics",
        "icon": "BarChart3",
        "description": "Transform massive datasets into strategic predictive insights, statistical models, and executive intelligence dashboards.",
        "market_demand": "High",
        "growth_rate": "+24% (2024-2030)",
        "avg_salary": "$125,000",
        "core_skills": [
            {"skill": "Python", "level": 4, "weight": 0.20, "category": "AI/ML"},
            {"skill": "SQL & Relational Queries", "level": 3, "weight": 0.18, "category": "Database"},
            {"skill": "Probability & Statistics", "level": 3, "weight": 0.16, "category": "Fundamentals"},
            {"skill": "Pandas & Data Wrangling", "level": 3, "weight": 0.16, "category": "AI/ML"},
            {"skill": "Data Visualization (Seaborn/Plotly)", "level": 3, "weight": 0.12, "category": "Frontend"},
            {"skill": "Predictive Modeling (Scikit-Learn)", "level": 3, "weight": 0.14, "category": "AI/ML"},
            {"skill": "A/B Testing & Experimentation", "level": 2, "weight": 0.04, "category": "Fundamentals"}
        ],
        "recommended_skills": [
            {"skill": "Big Data (PySpark)", "level": 2, "weight": 0.08, "category": "Database"},
            {"skill": "Tableau / PowerBI", "level": 2, "weight": 0.06, "category": "Frontend"},
            {"skill": "Deep Learning Basics", "level": 2, "weight": 0.06, "category": "AI/ML"}
        ],
        "phases": [
            "Phase 1: Advanced Statistical Analysis & SQL Deep-Dive",
            "Phase 2: High-Performance Data Cleaning & ETL Pipelines",
            "Phase 3: Exploratory Analytics & Visual Storytelling",
            "Phase 4: Machine Learning Algorithms & Cross-Validation",
            "Phase 5: Production Modeling & Strategic Business Impact"
        ],
        "capstone_projects": [
            {
                "title": "Healthcare Risk Prediction Engine",
                "difficulty": "Advanced",
                "description": "Multi-variable statistical model identifying high-risk patient readmissions with ROC-AUC 0.92 and visual dashboard.",
                "tech_stack": ["Python", "SQL", "Pandas", "Scikit-Learn", "Streamlit"]
            }
        ]
    },
    {
        "id": "cybersecurity-analyst",
        "title": "Cybersecurity Analyst",
        "category": "Security",
        "icon": "ShieldCheck",
        "description": "Defend networks, detect vulnerabilities, perform incident response, and enforce zero-trust security postures.",
        "market_demand": "Very High",
        "growth_rate": "+32% (2024-2030)",
        "avg_salary": "$118,000",
        "core_skills": [
            {"skill": "Networking & Protocols (TCP/IP, DNS)", "level": 3, "weight": 0.18, "category": "Fundamentals"},
            {"skill": "Linux & Command Line", "level": 3, "weight": 0.16, "category": "DevOps"},
            {"skill": "Security Information & Event Management (SIEM)", "level": 3, "weight": 0.18, "category": "Security"},
            {"skill": "Vulnerability Assessment (Nessus/Nmap)", "level": 3, "weight": 0.16, "category": "Security"},
            {"skill": "Python for Security Automation", "level": 2, "weight": 0.12, "category": "AI/ML"},
            {"skill": "Incident Response & Forensics", "level": 2, "weight": 0.12, "category": "Security"},
            {"skill": "Cryptography Basics", "level": 2, "weight": 0.08, "category": "Fundamentals"}
        ],
        "recommended_skills": [
            {"skill": "Cloud Security (AWS IAM)", "level": 2, "weight": 0.08, "category": "Cloud"},
            {"skill": "Ethical Hacking (Metasploit)", "level": 2, "weight": 0.08, "category": "Security"},
            {"skill": "Web Security (OWASP Top 10)", "level": 3, "weight": 0.10, "category": "Security"}
        ],
        "phases": [
            "Phase 1: Computer Networking & Cyber Fundamentals",
            "Phase 2: Linux Hardening & Offensive Security Fundamentals",
            "Phase 3: Threat Detection, Log Analysis & SIEM Operations",
            "Phase 4: Vulnerability Scanning & Penetration Testing",
            "Phase 5: Zero Trust Architecture & Automated Incident Defense"
        ],
        "capstone_projects": [
            {
                "title": "Automated SOC Threat Detection & Honeypot",
                "difficulty": "Advanced",
                "description": "Deploys a cloud honeypot to capture real-world brute-force attacks and generates automated triage alerts in Splunk.",
                "tech_stack": ["Linux", "Python", "Wireshark", "Splunk", "AWS"]
            }
        ]
    }
]

def get_all_careers():
    return CAREERS_DATA

def get_career_by_id(career_id: str):
    for c in CAREERS_DATA:
        if c["id"] == career_id:
            return c
    return None
