# SkillSync AI 🚀
### Autonomous Multi-Agent Personalized Learning & Career Guidance Platform

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/adishjprasanth7/skill-sync-ai-)
[![Testing Score](https://img.shields.io/badge/Testing%20Score-100%2F100-brightgreen.svg)](./TEST_REPORT.md)
[![Automated Tests](https://img.shields.io/badge/Tests-61%20Passed%20%7C%200%20Failed-success.svg)](./TEST_REPORT.md)
[![Single Branch](https://img.shields.io/badge/Branch-main-blue.svg)](https://github.com/adishjprasanth7/skill-sync-ai-)
[![Repo Size](https://img.shields.io/badge/Repo%20Size-%3C%201%20MB-blue.svg)](https://github.com/adishjprasanth7/skill-sync-ai-)

SkillSync AI is an enterprise-grade personalized learning and career intelligence platform powered by a coordinated 6-agent collaborative AI swarm. It replaces one-size-fits-all roadmaps with dynamic, competency-grounded progression tracks optimized for 15 in-demand software engineering careers.

---

## 🧪 Automated Testing Suite (Score: 100/100)

SkillSync AI comes with a comprehensive, enterprise-grade automated testing suite covering unit tests, integration tests, form validation, security penetration checks, and end-to-end user workflows:

- **61 Automated Tests (47 Backend + 14 Frontend)**
- **0 Failures | 0 Errors**
- **100% Pass Rate across all evaluation categories**
- Detailed test execution logs and coverage available in [`TEST_REPORT.md`](./TEST_REPORT.md).

### Run All Tests:
```bash
# Run the master test runner (backend + frontend)
python run_tests.py

# Or via npm
npm test
```

### Run Component Suites Individually:
```bash
# Backend tests (Python unittest + FastAPI TestClient)
python -m unittest discover -s backend/tests -p "test_*.py"

# Frontend tests (Node.js test runner)
cd frontend && node --test tests/*.test.mjs
```

---

## 🌟 Key Capabilities & Modules

1. **15 Industry Target Career Tracks with Real-Time Search**:
   - Comprehensive tracks across Software Engineering, AI & Machine Learning, Cloud & DevOps, Infrastructure, Cybersecurity, Data & Analytics, Mobile Development, and Technical Product Management.
   - Real-time search by title, category, description, and core competencies in both the Navbar popover and Career Matcher view.
2. **User Authentication & Profiles**:
   - Full user registration and login workflows with password hashing (SHA-256), session tokens, and instant demo switching.
   - Comprehensive form validation for email syntax, password strength, and required fields.

1. **Autonomous Multi-Agent Orchestration**: Live collaborative pipeline coordinating six specialized agents:
   - 🔍 **Skill Analyst**: Audits current competencies, verifies proficiency levels, and detects missing prerequisite foundations.
   - 🧭 **Career Advisor**: Cross-references learner skills against live industry requirements and computes career readiness scores.
   - 🗺️ **Learning Planner**: Sequences modular curriculum phases, milestones, hands-on project prompts, and capstones.
   - 📚 **Resource Recommender**: Curates verified documentation (MDN, official docs), interactive sandboxes, and exercises with zero token waste.
   - 🛡️ **Assessment Evaluator**: Grades diagnostic tests, explains concepts, and flags exact conceptual misconceptions.
   - 📈 **Progress Monitor**: Tracks daily velocity, study streaks, and forecasts career threshold dates.
2. **Real Adaptive Learning Engine**:
   - **Remedial Sprints**: Scoring <70% on an assessment (e.g. JavaScript closures or async) automatically injects a focused remedial sprint into the active roadmap and adjusts analytics.
   - **Competency-Preserving Career Pivots**: Switching career goals (e.g., Full Stack Developer → AI & Machine Learning Engineer) retains transferable skills (Python, SQL) while recalculating missing core requirements.
3. **Interactive Assessment Engine**: Topic-based diagnostics (JavaScript, React, Python, SQL, Docker) with code output challenges, immediate grading, and weak-topic detection.
4. **Context-Aware AI Mentor**: Chatbot directly grounded in learner profile context (target career, readiness score, current milestone, detected weak topics).
5. **Skill Analyzer & Prerequisite Matrix**: Proficiency sliders (Levels 1–4) across Frontend, Backend, Database, Cloud/DevOps, and AI/ML.
6. **Progress Analytics & Radar Visualizations**: Interactive Recharts displaying domain spider charts, study velocity area charts, and milestone trajectories.
7. **Premium Dark UI/UX**: Obsidian/navy palette, glassmorphic cards, smooth Framer Motion transitions, responsive collapsible sidebar, and confetti milestone celebrations.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Recharts, Canvas-Confetti
- **Backend**: Python 3.13, FastAPI, Pydantic, Uvicorn, Python-dotenv
- **Database & Auth**: Supabase schema provided (`supabase_schema.sql`) with seamless local/demo state fallback
- **Token & Cost Optimization**: In-memory caching layer, deterministic scoring algorithms, single orchestrator coordinator, structured JSON I/O

---

## 🚀 Quick Start Guide

### 1. Launch the Frontend Dev Server
```bash
# Navigate to frontend and start Vite dev server
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. (Optional) Launch the FastAPI Backend Server
```bash
# In a separate terminal, start the FastAPI API
cd backend
python -m uvicorn main:app --reload --port 8000
```
API Documentation (Swagger UI) is available at **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**.

> **Note:** The frontend includes complete client-side deterministic fallback orchestration. The entire student journey works seamlessly even when the backend is offline!

---

## 👥 Demo Profiles

Switch between pre-seeded learner profiles instantly using the profile switcher in the top navigation bar:
- **Alex Rivera**: Aspiring Full Stack Developer (HTML/CSS, JS, SQL, Git). Current readiness: 45%.
- **Maya Lin**: AI & Machine Learning Track (Python, Pandas, SQL, Linear Algebra). Current readiness: 58%.

---

## 🗄️ Database Schema

The complete production Supabase schema is available in [`supabase_schema.sql`](./supabase_schema.sql), defining:
- `users` & `user_skills`
- `career_goals`
- `learning_roadmaps` & `roadmap_nodes`
- `learning_resources`
- `skill_assessments`
- `progress_records`
- `ai_mentor_conversations`
- Row Level Security (RLS) policies and performance indexes
