"""
Database Layer with Automated SQLite Persistence and Supabase Integration
Handles full schema auto-generation, seeding, and transaction management.
"""

import os
import json
import sqlite3
import hashlib
import uuid
import secrets
from typing import Dict, Any, Optional, List
from datetime import datetime

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

# Environment check for Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

DB_PATH = os.path.join(os.path.dirname(__file__), "skillsync.sqlite3")

class DatabaseClient:
    def __init__(self):
        self.db_path = DB_PATH
        self.has_supabase = bool(SUPABASE_URL and SUPABASE_KEY)
        self.supabase = None
        self._init_sqlite()
        self._init_supabase()

    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_sqlite(self):
        """Auto-create tables matching the Supabase schema if they don't exist"""
        conn = self._get_connection()
        cursor = conn.cursor()

        cursor.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            target_career_id TEXT DEFAULT 'full-stack-dev',
            career_readiness REAL DEFAULT 0.0,
            streak_days INTEGER DEFAULT 1,
            hours_studied REAL DEFAULT 0.0,
            skills_json TEXT DEFAULT '[]',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS user_skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            skill_name TEXT NOT NULL,
            proficiency_level INTEGER DEFAULT 1,
            category TEXT DEFAULT 'General',
            verified INTEGER DEFAULT 0,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, skill_name)
        );

        CREATE TABLE IF NOT EXISTS career_goals (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            market_demand TEXT DEFAULT 'High',
            growth_rate TEXT,
            avg_salary TEXT,
            core_skills_json TEXT DEFAULT '[]',
            recommended_skills_json TEXT DEFAULT '[]',
            phases_json TEXT DEFAULT '[]'
        );

        CREATE TABLE IF NOT EXISTS learning_roadmaps (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            career_id TEXT NOT NULL,
            career_title TEXT NOT NULL,
            readiness_score REAL DEFAULT 0.0,
            total_estimated_hours INTEGER DEFAULT 0,
            phases_json TEXT DEFAULT '[]',
            is_active INTEGER DEFAULT 1,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS skill_assessments (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            skill_name TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage REAL NOT NULL,
            passed INTEGER NOT NULL,
            weak_topics_json TEXT DEFAULT '[]',
            mastered_topics_json TEXT DEFAULT '[]',
            answers_json TEXT DEFAULT '[]',
            taken_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS ai_mentor_conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            tokens_consumed INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS progress_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            event_type TEXT NOT NULL,
            details_json TEXT DEFAULT '{}',
            recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS auth_tokens (
            token TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()

        # Ensure password_hash column exists
        try:
            cursor.execute("ALTER TABLE users ADD COLUMN password_hash TEXT DEFAULT ''")
            conn.commit()
        except Exception:
            pass

        # Ensure demo accounts have valid password hashes
        try:
            cursor.execute("UPDATE users SET password_hash = ? WHERE id = 'alex_demo' AND (password_hash IS NULL OR password_hash = '')", (hash_password("alex123"),))
            cursor.execute("UPDATE users SET password_hash = ? WHERE id = 'maya_demo' AND (password_hash IS NULL OR password_hash = '')", (hash_password("maya123"),))
            conn.commit()
        except Exception:
            pass

        # Seed initial users if empty
        cursor.execute("SELECT COUNT(*) FROM users")
        if cursor.fetchone()[0] == 0:
            self._seed_initial_data(cursor)
            conn.commit()

        conn.close()

    def _seed_initial_data(self, cursor):
        """Seed pre-configured demo users into SQLite"""
        alex_skills = [
            {"name": "HTML/CSS", "level": 3, "category": "Frontend", "verified": True},
            {"name": "JavaScript", "level": 2, "category": "Frontend", "verified": True},
            {"name": "Python", "level": 2, "category": "Backend", "verified": False},
            {"name": "SQL", "level": 2, "category": "Database", "verified": True},
            {"name": "Git", "level": 2, "category": "DevOps", "verified": True}
        ]
        maya_skills = [
            {"name": "Python", "level": 3, "category": "AI/ML", "verified": True},
            {"name": "Data Analysis (Pandas/NumPy)", "level": 3, "category": "AI/ML", "verified": True},
            {"name": "SQL", "level": 2, "category": "Database", "verified": True},
            {"name": "Linear Algebra & Calculus", "level": 2, "category": "Fundamentals", "verified": False}
        ]

        cursor.execute("""
        INSERT INTO users (id, email, full_name, target_career_id, career_readiness, streak_days, hours_studied, skills_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "alex_demo", "alex.rivera@example.com", "Alex Rivera",
            "full-stack-dev", 45.0, 6, 21.5, json.dumps(alex_skills)
        ))

        cursor.execute("""
        INSERT INTO users (id, email, full_name, target_career_id, career_readiness, streak_days, hours_studied, skills_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "maya_demo", "maya.lin@example.com", "Maya Lin",
            "ai-ml-engineer", 58.0, 14, 36.5, json.dumps(maya_skills)
        ))

        # Seed user_skills table
        for s in alex_skills:
            cursor.execute("""
            INSERT OR REPLACE INTO user_skills (user_id, skill_name, proficiency_level, category, verified)
            VALUES (?, ?, ?, ?, ?)
            """, ("alex_demo", s["name"], s["level"], s["category"], 1 if s.get("verified") else 0))

        for s in maya_skills:
            cursor.execute("""
            INSERT OR REPLACE INTO user_skills (user_id, skill_name, proficiency_level, category, verified)
            VALUES (?, ?, ?, ?, ?)
            """, ("maya_demo", s["name"], s["level"], s["category"], 1 if s.get("verified") else 0))

    def _init_supabase(self):
        if self.has_supabase:
            try:
                import supabase
                self.supabase = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
                print("[Database] Supabase connected successfully.")
            except Exception as e:
                print(f"[Database] Supabase connection skipped: {e}")
                self.has_supabase = False

    def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        conn.close()

        if row:
            skills = json.loads(row["skills_json"]) if row["skills_json"] else []
            return {
                "id": row["id"],
                "email": row["email"],
                "full_name": row["full_name"],
                "target_career_id": row["target_career_id"],
                "career_readiness": row["career_readiness"],
                "streak_days": row["streak_days"],
                "hours_studied": row["hours_studied"],
                "skills": skills
            }
        return None

    def register_user(self, email: str, full_name: str, password: str, target_career_id: str = "full-stack-dev") -> Dict[str, Any]:
        email_clean = email.strip().lower()
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email_clean,))
        if cursor.fetchone():
            conn.close()
            raise ValueError("Email already registered")

        user_id = f"user_{uuid.uuid4().hex[:10]}"
        pwd_hash = hash_password(password)
        initial_skills = [
            {"name": "HTML/CSS", "level": 2, "category": "Frontend", "verified": False},
            {"name": "Git", "level": 2, "category": "DevOps", "verified": False}
        ]

        cursor.execute("""
        INSERT INTO users (id, email, full_name, target_career_id, career_readiness, streak_days, hours_studied, skills_json, password_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            user_id, email_clean, full_name.strip(), target_career_id, 20.0, 1, 0.0, json.dumps(initial_skills), pwd_hash
        ))

        token = f"tok_{secrets.token_hex(16)}"
        cursor.execute("INSERT INTO auth_tokens (token, user_id) VALUES (?, ?)", (token, user_id))
        conn.commit()
        conn.close()

        profile = self.get_user_profile(user_id)
        return {"user": profile, "token": token}

    def login_user(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        email_clean = email.strip().lower()
        pwd_hash = hash_password(password)
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, password_hash FROM users WHERE LOWER(email) = ?", (email_clean,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            return None

        stored_hash = row["password_hash"]
        if stored_hash and stored_hash != pwd_hash:
            conn.close()
            return None

        user_id = row["id"]
        token = f"tok_{secrets.token_hex(16)}"
        cursor.execute("INSERT INTO auth_tokens (token, user_id) VALUES (?, ?)", (token, user_id))
        conn.commit()
        conn.close()

        profile = self.get_user_profile(user_id)
        return {"user": profile, "token": token}

    def get_user_by_token(self, token: str) -> Optional[Dict[str, Any]]:
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT user_id FROM auth_tokens WHERE token = ?", (token,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return None
        return self.get_user_profile(row["user_id"])

    def save_user_profile(self, profile: Dict[str, Any]):
        uid = profile.get("id", "alex_demo")
        skills_json = json.dumps(profile.get("skills", []))

        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO users (id, email, full_name, target_career_id, career_readiness, streak_days, hours_studied, skills_json, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
            email=excluded.email,
            full_name=excluded.full_name,
            target_career_id=excluded.target_career_id,
            career_readiness=excluded.career_readiness,
            streak_days=excluded.streak_days,
            hours_studied=excluded.hours_studied,
            skills_json=excluded.skills_json,
            updated_at=CURRENT_TIMESTAMP
        """, (
            uid,
            profile.get("email", ""),
            profile.get("full_name", ""),
            profile.get("target_career_id", "full-stack-dev"),
            profile.get("career_readiness", 0.0),
            profile.get("streak_days", 1),
            profile.get("hours_studied", 0.0),
            skills_json
        ))

        # Also sync individual skill rows
        for s in profile.get("skills", []):
            cursor.execute("""
            INSERT INTO user_skills (user_id, skill_name, proficiency_level, category, verified, updated_at)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id, skill_name) DO UPDATE SET
                proficiency_level=excluded.proficiency_level,
                category=excluded.category,
                verified=excluded.verified,
                updated_at=CURRENT_TIMESTAMP
            """, (uid, s["name"], s.get("level", 1), s.get("category", "General"), 1 if s.get("verified") else 0))

        conn.commit()
        conn.close()

        # Optional Supabase mirror
        if self.has_supabase and self.supabase:
            try:
                self.supabase.table("users").upsert({
                    "id": uid,
                    "email": profile.get("email"),
                    "full_name": profile.get("full_name"),
                    "target_career_id": profile.get("target_career_id"),
                    "career_readiness": profile.get("career_readiness")
                }).execute()
            except Exception as e:
                print(f"[Supabase] sync error: {e}")

        return profile

    def save_assessment_record(self, record: Dict[str, Any]):
        aid = f"rec_{int(datetime.now().timestamp())}_{uuid.uuid4().hex[:6]}"
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO skill_assessments (id, user_id, skill_name, score, total_questions, percentage, passed, weak_topics_json, mastered_topics_json, answers_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            aid,
            record.get("user_id", "alex_demo"),
            record.get("skill", "JavaScript"),
            record.get("score", 0),
            record.get("total", 0),
            record.get("percentage", 0.0),
            1 if record.get("passed") else 0,
            json.dumps(record.get("weak_topics", [])),
            json.dumps(record.get("mastered_topics", [])),
            json.dumps(record.get("breakdown", []))
        ))
        conn.commit()
        conn.close()
        return aid

    def append_chat_message(self, user_id: str, role: str, content: str, tokens: int = 0):
        conn = self._get_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO ai_mentor_conversations (user_id, role, content, tokens_consumed)
        VALUES (?, ?, ?, ?)
        """, (user_id, role, content, tokens))
        conn.commit()
        conn.close()

    def get_status(self) -> Dict[str, Any]:
        """Inspection endpoint returning complete database state"""
        conn = self._get_connection()
        cursor = conn.cursor()
        stats = {}
        for table in ["users", "user_skills", "career_goals", "learning_roadmaps", "skill_assessments", "ai_mentor_conversations"]:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            stats[table] = cursor.fetchone()[0]
        conn.close()

        return {
            "status": "connected",
            "engine": "SQLite 3 (Local Persistent ACID) + Supabase Sync Ready",
            "database_file": self.db_path,
            "supabase_configured": self.has_supabase,
            "table_records": stats
        }

db = DatabaseClient()
