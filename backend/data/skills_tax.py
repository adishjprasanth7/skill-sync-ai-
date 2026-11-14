"""
Skill Taxonomy and Prerequisite Knowledge Graph
"""

SKILLS_TAXONOMY = {
    # Frontend
    "HTML/CSS": {
        "category": "Frontend",
        "description": "Semantic markup, modern layout models (Flexbox, Grid), responsive units, and styling standards.",
        "difficulty": 1,
        "prerequisites": [],
        "subtopics": ["Semantic HTML5", "Flexbox & Grid", "Media Queries", "CSS Variables", "Accessibility (a11y)"]
    },
    "JavaScript": {
        "category": "Frontend",
        "description": "Core ECMAScript, closures, prototypal inheritance, asynchronous async/await, event loop, and DOM APIs.",
        "difficulty": 2,
        "prerequisites": ["HTML/CSS"],
        "subtopics": ["ES6+ Syntax", "Promises & Async/Await", "Closures & Scoping", "Event Loop", "DOM Manipulation"]
    },
    "TypeScript": {
        "category": "Frontend",
        "description": "Static type checking, interfaces, generics, utility types, and union/intersection patterns.",
        "difficulty": 2,
        "prerequisites": ["JavaScript"],
        "subtopics": ["Interfaces & Types", "Generics", "Utility Types", "Narrowing & Type Guards", "TS Config"]
    },
    "React": {
        "category": "Frontend",
        "description": "Component lifecycle, functional components, hooks (useState, useEffect, useMemo), virtual DOM, and context.",
        "difficulty": 2,
        "prerequisites": ["JavaScript", "HTML/CSS"],
        "subtopics": ["JSX", "Hooks", "Custom Hooks", "State Management", "Performance Optimization"]
    },
    "Tailwind CSS": {
        "category": "Frontend",
        "description": "Utility-first CSS framework for rapid responsive design, theme customization, and modern UI creation.",
        "difficulty": 1,
        "prerequisites": ["HTML/CSS"],
        "subtopics": ["Utility Classes", "Responsive Modifiers", "Arbitrary Values", "Tailwind Config", "Dark Mode"]
    },
    "Next.js": {
        "category": "Frontend",
        "description": "Server-side rendering, App Router, React Server Components, API routes, and static generation.",
        "difficulty": 3,
        "prerequisites": ["React", "TypeScript"],
        "subtopics": ["App Router", "Server Components", "Static & Dynamic Rendering", "Route Handlers", "Middleware"]
    },

    # Backend
    "Node.js": {
        "category": "Backend",
        "description": "V8 runtime, event-driven non-blocking I/O, core modules (fs, http), streams, and npm ecosystem.",
        "difficulty": 2,
        "prerequisites": ["JavaScript"],
        "subtopics": ["Event Loop & libuv", "CommonJS vs ESM", "Streams & Buffers", "HTTP Module", "Process Management"]
    },
    "REST APIs": {
        "category": "Backend",
        "description": "RESTful resource modeling, HTTP status codes, stateless authentication, JSON payloads, and error contracts.",
        "difficulty": 2,
        "prerequisites": ["JavaScript"],
        "subtopics": ["HTTP Verbs & Codes", "Resource Routing", "Authentication & JWT", "Middleware", "Validation & Sanitization"]
    },
    "Python": {
        "category": "Backend",
        "description": "Object-oriented & functional Python, list comprehensions, decorators, generators, type hints, and standard library.",
        "difficulty": 1,
        "prerequisites": [],
        "subtopics": ["Data Structures", "OOP & Classes", "Decorators & Generators", "Virtual Environments", "Asyncio"]
    },
    "FastAPI": {
        "category": "Backend",
        "description": "Modern, high-performance web framework for Python APIs using Pydantic, type annotations, and OpenAPI docs.",
        "difficulty": 2,
        "prerequisites": ["Python"],
        "subtopics": ["Path & Query Parameters", "Pydantic Schemas", "Dependency Injection", "Async Endpoints", "OAuth2 & JWT"]
    },
    "GraphQL": {
        "category": "Backend",
        "description": "Query language for APIs: schemas, resolvers, mutations, queries, and over-fetching elimination.",
        "difficulty": 3,
        "prerequisites": ["REST APIs"],
        "subtopics": ["Schema Definition (SDL)", "Queries & Mutations", "Resolvers", "DataLoader N+1 problem", "Subscriptions"]
    },

    # Database
    "SQL": {
        "category": "Database",
        "description": "Relational data modeling, SELECT queries, JOINs, aggregations, indexing, transactions (ACID), and constraints.",
        "difficulty": 2,
        "prerequisites": [],
        "subtopics": ["SELECT & Filter", "INNER/LEFT/RIGHT JOINs", "GROUP BY & Aggregations", "Indexes & Optimization", "ACID Transactions"]
    },
    "PostgreSQL": {
        "category": "Database",
        "description": "Advanced relational engine, JSONB columns, foreign keys, complex triggers, CTEs, and full-text search.",
        "difficulty": 2,
        "prerequisites": ["SQL"],
        "subtopics": ["Foreign Keys & Cascades", "JSONB Querying", "CTEs & Window Functions", "Connection Pooling", "EXPLAIN ANALYZE"]
    },
    "Vector Databases (Pinecone/Milvus)": {
        "category": "Database",
        "description": "Embeddings storage, cosine similarity search, Approximate Nearest Neighbor (ANN) indexing for semantic retrieval.",
        "difficulty": 3,
        "prerequisites": ["Python"],
        "subtopics": ["Vector Embeddings", "Cosine Distance & Euclidean", "HNSW Indexing", "Metadata Filtering", "Hybrid Search"]
    },

    # AI & Machine Learning
    "Data Analysis (Pandas/NumPy)": {
        "category": "AI/ML",
        "description": "N-dimensional array computation, vectorized operations, DataFrame wrangling, filtering, and missing data imputation.",
        "difficulty": 2,
        "prerequisites": ["Python"],
        "subtopics": ["NumPy Broadcasting", "Pandas DataFrames", "Data Cleaning & Imputation", "Grouping & Merging", "Time Series Handling"]
    },
    "Scikit-Learn": {
        "category": "AI/ML",
        "description": "Supervised & unsupervised ML: regression, classification, clustering, pipelines, cross-validation, and metrics.",
        "difficulty": 2,
        "prerequisites": ["Python", "Data Analysis (Pandas/NumPy)"],
        "subtopics": ["Train/Test Split & CV", "Linear & Logistic Regression", "Decision Trees & Random Forests", "Pipelines", "ROC/AUC & F1-score"]
    },
    "Deep Learning (PyTorch/TensorFlow)": {
        "category": "AI/ML",
        "description": "Tensors, autograd, backpropagation, CNNs, RNNs, Transformer architectures, loss functions, and GPU training.",
        "difficulty": 3,
        "prerequisites": ["Python", "Scikit-Learn"],
        "subtopics": ["Tensors & Autograd", "Custom nn.Module", "Loss Functions & Optimizers", "Dataloaders & Batches", "Transfer Learning"]
    },
    "LLMs & Prompt Engineering": {
        "category": "AI/ML",
        "description": "Transformer attention, prompt strategies (Few-Shot, CoT), tokenization, temperature, system grounding, and hallucination reduction.",
        "difficulty": 2,
        "prerequisites": ["Python"],
        "subtopics": ["Attention Mechanism", "Context Window & Tokens", "Chain-of-Thought", "System Prompts", "Structured Output Parsing"]
    },
    "LangChain & LlamaIndex": {
        "category": "AI/ML",
        "description": "Agent frameworks, retrieval augmented generation (RAG), chaining, tools calling, and vector memory.",
        "difficulty": 3,
        "prerequisites": ["LLMs & Prompt Engineering", "Python"],
        "subtopics": ["Document Loaders & Chunking", "RAG Pipeline", "Agent Tool Calling", "Memory Buffers", "Evaluation"]
    },

    # DevOps & Cloud
    "Git": {
        "category": "DevOps",
        "description": "Distributed version control, branching strategies, commits, merge conflicts, rebasing, and remote remotes.",
        "difficulty": 1,
        "prerequisites": [],
        "subtopics": ["Commits & Staging", "Branching & Merging", "Rebasing", "Conflict Resolution", "Pull Request Workflows"]
    },
    "Docker & Containers": {
        "category": "DevOps",
        "description": "Images, Dockerfiles, containers, bind mounts, volumes, docker-compose, and multi-stage build optimization.",
        "difficulty": 2,
        "prerequisites": [],
        "subtopics": ["Dockerfiles & Layers", "Multi-stage Builds", "Docker Compose", "Volume Persistence", "Container Networking"]
    },
    "Kubernetes": {
        "category": "DevOps",
        "description": "Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, auto-scaling, and Helm chart packaging.",
        "difficulty": 3,
        "prerequisites": ["Docker & Containers"],
        "subtopics": ["Pods & Deployments", "Cluster Services & Ingress", "ConfigMaps & Secrets", "Horizontal Pod Autoscaler", "Helm Charts"]
    },
    "CI/CD Pipelines (GitHub Actions)": {
        "category": "DevOps",
        "description": "Automated linting, test suites, container builds, artifact releases, and production deployment workflows.",
        "difficulty": 2,
        "prerequisites": ["Git"],
        "subtopics": ["Workflow YAML syntax", "Action Triggers & Jobs", "Secrets Management", "Matrix Builds", "Automated Releases"]
    },
    "AWS or GCP Cloud Architecture": {
        "category": "Cloud",
        "description": "Core cloud primitives: compute (EC2/Lambda), storage (S3), VPC networking, IAM security, and serverless.",
        "difficulty": 3,
        "prerequisites": ["Docker & Containers"],
        "subtopics": ["Virtual Private Clouds (VPC)", "Serverless Functions", "Object Storage & CDN", "IAM Least Privilege", "Load Balancing"]
    },
    "Infrastructure as Code (Terraform)": {
        "category": "Cloud",
        "description": "Declarative cloud provisioning, state files, HCL syntax, modules, and plan/apply validation.",
        "difficulty": 3,
        "prerequisites": ["AWS or GCP Cloud Architecture"],
        "subtopics": ["HCL Syntax", "Terraform State Management", "Re-usable Modules", "Variables & Outputs", "Plan & Apply Lifecycle"]
    },

    # Security & Fundamentals
    "Networking & Protocols (TCP/IP, DNS)": {
        "category": "Fundamentals",
        "description": "OSI 7-layer model, TCP handshake, UDP, DNS resolution, TLS/SSL certificates, and subnetting.",
        "difficulty": 2,
        "prerequisites": [],
        "subtopics": ["OSI Layers", "TCP/IP vs UDP", "DNS & Domain Routing", "TLS/SSL Handshake", "Subnets & CIDR"]
    },
    "Security Information & Event Management (SIEM)": {
        "category": "Security",
        "description": "Log aggregation, correlation rules, incident triage, anomaly alerting, and Splunk/Elasticsearch hunting.",
        "difficulty": 3,
        "prerequisites": ["Networking & Protocols (TCP/IP, DNS)"],
        "subtopics": ["Log Ingestion & Parsing", "Detection Rules", "Anomaly Triaging", "SOC Alert Workflows", "Threat Hunting"]
    },
    "Vulnerability Assessment (Nessus/Nmap)": {
        "category": "Security",
        "description": "Port scanning, service enumeration, CVE identification, CVSS risk scoring, and remediation reports.",
        "difficulty": 2,
        "prerequisites": ["Networking & Protocols (TCP/IP, DNS)"],
        "subtopics": ["Nmap Syntax & Flags", "Service Fingerprinting", "CVE & CVSS Scoring", "Vulnerability Scanning", "Mitigation Reporting"]
    }
}

def get_taxonomy():
    return SKILLS_TAXONOMY

def search_skills(query: str):
    query = query.lower()
    return [name for name in SKILLS_TAXONOMY.keys() if query in name.lower()]

def get_skill_details(skill_name: str):
    return SKILLS_TAXONOMY.get(skill_name)
