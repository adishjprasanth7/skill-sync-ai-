# SkillSync AI 🚀
### Autonomous Multi-Agent Personalized Learning & Career Guidance Platform

SkillSync AI is an enterprise-grade personalized learning and career intelligence platform powered by a coordinated 6-agent collaborative AI swarm. It replaces one-size-fits-all roadmaps with dynamic, competency-grounded progression tracks optimized for real-world software engineering careers.

---

## 🌟 Key Capabilities & Modules

1. **Autonomous Multi-Agent Center**: Live collaborative pipeline coordinating six specialized agents:
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
