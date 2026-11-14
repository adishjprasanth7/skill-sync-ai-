"""
SkillSync AI - API Endpoints & Main Features Test Suite
Tests all 15 career tracks, skill taxonomy, multi-agent orchestration, roadmap generation,
assessment evaluations, database persistence, and AI mentor context chat.
"""

import sys
import os
import unittest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from data.careers import get_all_careers

class TestAPIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_health_check(self):
        """Test /api/health returns healthy system status and active agent count"""
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["active_agents"], 6)
        self.assertIn("timestamp", data)
        self.assertIn("token_consumption", data)

    def test_02_database_status(self):
        """Test /api/database/status returns connected ACID database and table metrics"""
        res = self.client.get("/api/database/status")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "connected")
        self.assertIn("SQLite", data["engine"])
        self.assertIn("table_records", data)
        records = data["table_records"]
        self.assertIn("users", records)
        self.assertGreaterEqual(records["users"], 2)

    def test_03_list_all_15_careers(self):
        """Test /api/careers returns all 15 industry role specifications with full schemas"""
        res = self.client.get("/api/careers")
        self.assertEqual(res.status_code, 200)
        careers = res.json()
        self.assertEqual(len(careers), 15, "Expected 15 comprehensive industry target careers")

        required_keys = {"id", "title", "category", "description", "market_demand", "avg_salary", "core_skills", "phases", "capstone_projects"}
        for c in careers:
            for key in required_keys:
                self.assertIn(key, c, f"Career {c.get('id')} missing required property: {key}")
            self.assertGreater(len(c["core_skills"]), 0, f"Career {c['id']} must define core skills")
            self.assertGreater(len(c["phases"]), 0, f"Career {c['id']} must define curriculum phases")

    def test_04_get_specific_careers(self):
        """Test individual career retrieval for various tracks"""
        for career_id in ["full-stack-dev", "site-reliability-engineer", "nlp-engineer", "data-scientist"]:
            res = self.client.get(f"/api/careers/{career_id}")
            self.assertEqual(res.status_code, 200, f"Failed to retrieve career: {career_id}")
            self.assertEqual(res.json()["id"], career_id)

    def test_05_get_career_not_found(self):
        """Test /api/careers/{id} returns HTTP 404 on nonexistent role"""
        res = self.client.get("/api/careers/completely-fictional-career-role")
        self.assertEqual(res.status_code, 404)

    def test_06_match_career(self):
        """Test /api/careers/match computes readiness fit, matched skills, and gaps"""
        payload = {
            "career_id": "full-stack-dev",
            "skills": [
                {"name": "HTML/CSS", "level": 3, "category": "Frontend"},
                {"name": "JavaScript", "level": 3, "category": "Frontend"},
                {"name": "Git", "level": 2, "category": "DevOps"}
            ]
        }
        res = self.client.post("/api/careers/match", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["career_id"], "full-stack-dev")
        self.assertGreater(data["readiness_score"], 0.0)
        self.assertIn("matched_skills", data)
        self.assertIn("missing_core_skills", data)
        self.assertIn("transferable_skills", data)

    def test_07_skills_taxonomy(self):
        """Test /api/skills/taxonomy returns complete knowledge graph with prerequisites"""
        res = self.client.get("/api/skills/taxonomy")
        self.assertEqual(res.status_code, 200)
        tax = res.json()
        self.assertIn("JavaScript", tax)
        self.assertIn("React", tax)
        self.assertIn("prerequisites", tax["React"])
        self.assertIn("JavaScript", tax["React"]["prerequisites"])

    def test_08_assessment_topics(self):
        """Test /api/assessments/topics lists testable domain categories"""
        res = self.client.get("/api/assessments/topics")
        self.assertEqual(res.status_code, 200)
        topics = res.json()
        self.assertIn("JavaScript", topics)
        self.assertIn("React", topics)
        self.assertIn("Python", topics)
        self.assertIn("SQL", topics)
        self.assertIn("Docker", topics)

    def test_09_assessment_questions_sanitized(self):
        """Test questions returned to students omit correct answers to prevent inspection cheating"""
        res = self.client.get("/api/assessments/questions/JavaScript")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["skill"], "JavaScript")
        self.assertGreater(len(data["questions"]), 0)
        for q in data["questions"]:
            self.assertNotIn("correct_index", q, "Anti-cheat: correct_index must be stripped from student payload")
            self.assertNotIn("explanation", q, "Anti-cheat: explanation must be stripped from student payload")

    def test_10_assessment_questions_unknown_skill(self):
        """Test requesting questions for unknown skill returns HTTP 404"""
        res = self.client.get("/api/assessments/questions/UnknownSkill123")
        self.assertEqual(res.status_code, 404)

    def test_11_assessment_submit_and_persist(self):
        """Test submitting answers evaluates diagnostic, calculates score, and saves to database"""
        payload = {
            "skill": "SQL",
            "answers": {
                "sql_1": 1,
                "sql_2": 1,
                "sql_3": 1,
                "sql_4": 1
            }
        }
        res = self.client.post("/api/assessments/submit", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["skill"], "SQL")
        self.assertIn("score", data)
        self.assertIn("total", data)
        self.assertIn("percentage", data)
        self.assertIn("passed", data)
        self.assertIn("breakdown", data)

    def test_12_agents_status(self):
        """Test /api/agents/status reports all 6 specialized agents in ready state"""
        res = self.client.get("/api/agents/status")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["orchestrator_status"], "Active")
        agents = data["agents"]
        self.assertEqual(len(agents), 6)
        agent_names = [a["name"] for a in agents]
        self.assertIn("Skill Analyst", agent_names)
        self.assertIn("Career Advisor", agent_names)
        self.assertIn("Learning Planner", agent_names)
        self.assertIn("Resource Recommender", agent_names)
        self.assertIn("Assessment Evaluator", agent_names)
        self.assertIn("Progress Monitor", agent_names)

    def test_13_orchestrate_multi_agent_pipeline(self):
        """Test executing 6-agent collaborative orchestration pipeline"""
        payload = {
            "career_id": "full-stack-dev",
            "user_profile": {
                "id": "test_alex",
                "email": "test@example.com",
                "full_name": "Test Alex",
                "target_career_id": "full-stack-dev",
                "skills": [
                    {"name": "HTML/CSS", "level": 3, "category": "Frontend"},
                    {"name": "JavaScript", "level": 2, "category": "Frontend"}
                ]
            }
        }
        res = self.client.post("/api/agents/orchestrate", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("pipeline_id", data)
        self.assertEqual(data["status"], "success")
        self.assertIn("agent_logs", data)
        self.assertGreaterEqual(len(data["agent_logs"]), 6)
        self.assertIn("roadmap", data)
        self.assertIn("phases", data["roadmap"])

    def test_14_roadmap_generate(self):
        """Test generating end-to-end curriculum roadmap with phases and milestone nodes"""
        payload = {
            "career_id": "ai-ml-engineer",
            "user_profile": {
                "id": "alex_demo",
                "email": "alex@example.com",
                "full_name": "Alex",
                "skills": [{"name": "Python", "level": 2, "category": "AI/ML"}]
            }
        }
        res = self.client.post("/api/roadmap/generate", json=payload)
        self.assertEqual(res.status_code, 200)
        roadmap = res.json()
        self.assertEqual(roadmap["career_id"], "ai-ml-engineer")
        self.assertGreater(len(roadmap["phases"]), 0)
        self.assertIn("readiness_score", roadmap)

    def test_15_mentor_context_responses(self):
        """Test AI mentor grounded context generation for various topics"""
        topics_to_test = [
            ("closures in javascript", "closure"),
            ("why did my adaptive roadmap adjust", "adaptive"),
            ("tell me about sql indexing", "sql"),
            ("how should i prepare for technical interviews", "interview")
        ]
        for query, expected_substring in topics_to_test:
            payload = {
                "messages": [{"role": "user", "content": query}],
                "user_context": {
                    "target_career": "Full Stack Developer",
                    "readiness_score": 60,
                    "active_node": "JavaScript Execution"
                }
            }
            res = self.client.post("/api/mentor/chat", json=payload)
            self.assertEqual(res.status_code, 200)
            reply = res.json()["reply"].lower()
            self.assertIn(expected_substring, reply, f"Failed keyword '{expected_substring}' in response for '{query}'")

if __name__ == "__main__":
    unittest.main()
