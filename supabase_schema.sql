-- ============================================================================
-- SkillSync AI - Production Supabase Schema
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Profiles
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    target_career_id TEXT DEFAULT 'full-stack-dev',
    career_readiness NUMERIC(5,2) DEFAULT 0.00,
    streak_days INTEGER DEFAULT 1,
    hours_studied NUMERIC(7,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Master Skills Taxonomy
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    difficulty INTEGER DEFAULT 1,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    subtopics JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. User Acquired Skills
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_level INTEGER DEFAULT 1 CHECK (proficiency_level BETWEEN 1 AND 4),
    category TEXT DEFAULT 'General',
    verified BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, skill_name)
);

-- 4. Career Goals
CREATE TABLE IF NOT EXISTS public.career_goals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    market_demand TEXT DEFAULT 'High',
    growth_rate TEXT,
    avg_salary TEXT,
    core_skills JSONB DEFAULT '[]'::jsonb,
    recommended_skills JSONB DEFAULT '[]'::jsonb,
    phases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Skill Assessments
CREATE TABLE IF NOT EXISTS public.skill_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    passed BOOLEAN NOT NULL,
    weak_topics JSONB DEFAULT '[]'::jsonb,
    mastered_topics JSONB DEFAULT '[]'::jsonb,
    answers_breakdown JSONB DEFAULT '[]'::jsonb,
    taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Learning Roadmaps
CREATE TABLE IF NOT EXISTS public.learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL,
    career_title TEXT NOT NULL,
    readiness_score NUMERIC(5,2) DEFAULT 0.00,
    total_estimated_hours INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Roadmap Nodes & Lessons
CREATE TABLE IF NOT EXISTS public.roadmap_nodes (
    id TEXT PRIMARY KEY,
    roadmap_id UUID REFERENCES public.learning_roadmaps(id) ON DELETE CASCADE,
    phase_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Intermediate',
    estimated_hours INTEGER DEFAULT 10,
    completed BOOLEAN DEFAULT FALSE,
    in_progress BOOLEAN DEFAULT FALSE,
    is_remedial BOOLEAN DEFAULT FALSE,
    remedial_reason TEXT,
    lessons JSONB DEFAULT '[]'::jsonb,
    project_prompt TEXT,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 8. Learning Resources
CREATE TABLE IF NOT EXISTS public.learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id TEXT REFERENCES public.roadmap_nodes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT 'Documentation',
    duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Progress Records & Analytics
CREATE TABLE IF NOT EXISTS public.progress_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'lesson_complete', 'quiz_passed', 'career_switch', 'remedial_added'
    readiness_before NUMERIC(5,2),
    readiness_after NUMERIC(5,2),
    details JSONB DEFAULT '{}'::jsonb,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. AI Mentor Conversations
CREATE TABLE IF NOT EXISTS public.ai_mentor_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens_consumed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON public.skill_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user ON public.learning_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_user ON public.ai_mentor_conversations(user_id);

-- Row Level Security (RLS) Enablement
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_mentor_conversations ENABLE ROW LEVEL SECURITY;

-- Simple Permissive Policy for Authenticated/Anon Dev Access
CREATE POLICY "Public read/write access for demo" ON public.users FOR ALL USING (true);
CREATE POLICY "Public read/write access for user_skills" ON public.user_skills FOR ALL USING (true);
CREATE POLICY "Public read/write access for skill_assessments" ON public.skill_assessments FOR ALL USING (true);
CREATE POLICY "Public read/write access for learning_roadmaps" ON public.learning_roadmaps FOR ALL USING (true);
CREATE POLICY "Public read/write access for roadmap_nodes" ON public.roadmap_nodes FOR ALL USING (true);
CREATE POLICY "Public read/write access for progress_records" ON public.progress_records FOR ALL USING (true);
CREATE POLICY "Public read/write access for ai_mentor_conversations" ON public.ai_mentor_conversations FOR ALL USING (true);
