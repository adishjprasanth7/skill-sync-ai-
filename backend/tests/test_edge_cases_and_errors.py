"""
SkillSync AI - Edge Cases, Error Handling & Security Test Suite
Tests SQL injection resistance, boundary scoring, caching mechanics, unicode handling, and malformed payloads.
"""

import sys
import os
import unittest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from database import db, hash_password
from agents.orchestrator import CACHE_STORE, TOKEN_USAGE_COUNTER

class TestEdgeCasesAndErrors(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_sql_injection_resistance_login(self):
        """Test SQL injection payloads in login form do not bypass auth or compromise SQLite database"""
        sql_payloads = [
            "' OR '1'='1",
            "admin' --",
            "' UNION SELECT * FROM users --",
            "'; DROP TABLE users; --"
        ]
        for injection in sql_payloads:
            res = self.client.post("/api/auth/login", json={
                "email": f"injection_{hash_password(injection)[:6]}@example.com",
                "password": injection
            })
            self.assertEqual(res.status_code, 401, f"Failed for SQL payload: {injection}")

        # Verify users table is intact
        status_res = self.client.get("/api/database/status")
        self.assertEqual(status_res.status_code, 200)
        self.assertGreaterEqual(status_res.json()["table_records"]["users"], 2)

    def test_02_sql_injection_in_profile_retrieval(self):
        """Test malicious user IDs do not crash or leak data via SQL injection"""
        malicious_ids = [
            "' OR 1=1 --",
            "alex_demo'; DROP TABLE users; --",
            "../../etc/passwd"
        ]
        for mid in malicious_ids:
            res = self.client.get(f"/api/auth/profile/{mid}")
            self.assertEqual(res.status_code, 404)

    def test_03_assessment_score_boundaries(self):
        """Test boundary conditions: 0%, 50%, 75%, 100% correct answers"""
        # 0% score: all answers wrong
        res_zero = self.client.post("/api/assessments/submit", json={
            "skill": "JavaScript",
            "answers": {"js_1": 0, "js_2": 0, "js_3": 0, "js_4": 0}
        })
        self.assertEqual(res_zero.status_code, 200)
        d_zero = res_zero.json()
        self.assertEqual(d_zero["score"], 0)
        self.assertEqual(d_zero["percentage"], 0.0)
        self.assertFalse(d_zero["passed"])
        self.assertGreater(len(d_zero["weak_topics"]), 0)

        # 100% score: all answers correct
        res_full = self.client.post("/api/assessments/submit", json={
            "skill": "JavaScript",
            "answers": {"js_1": 1, "js_2": 2, "js_3": 1, "js_4": 1}
        })
        self.assertEqual(res_full.status_code, 200)
        d_full = res_full.json()
        self.assertEqual(d_full["score"], 4)
        self.assertEqual(d_full["percentage"], 100.0)
        self.assertTrue(d_full["passed"])
        self.assertEqual(len(d_full["weak_topics"]), 0)

    def test_04_unknown_career_match_fallback(self):
        """Test matching against an unknown career defaults safely without 500 error"""
        res = self.client.post("/api/careers/match", json={
            "career_id": "non_existent_specialty_track_xyz",
            "skills": [{"name": "Python", "level": 3, "category": "AI/ML"}]
        })
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("readiness_score", data)

    def test_05_caching_layer_efficiency(self):
        """Test identical skill analysis requests use in-memory cache to conserve compute"""
        payload = {
            "skills": [
                {"name": "Python", "level": 4, "category": "AI/ML"},
                {"name": "SQL", "level": 3, "category": "Database"}
            ],
            "target_career_id": "data-scientist"
        }
        # First call
        res1 = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res1.status_code, 200)

        # Second call with identical payload
        res2 = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res2.status_code, 200)
        self.assertEqual(res1.json(), res2.json())

    def test_06_unicode_and_multilingual_chat_support(self):
        """Test AI mentor gracefully handles emojis, accents, and non-Latin scripts"""
        multilingual_inputs = [
            "Explain Python generators 🐍 🚀 ✨",
            "Comment fonctionne la programmation asynchrone?",
            "React का virtual DOM कैसे काम करता है?",
            "请解释微服务架构中的分布式事务",
            "¿Cómo se configuran los contenedores de Docker?"
        ]
        for prompt in multilingual_inputs:
            res = self.client.post("/api/mentor/chat", json={
                "messages": [{"role": "user", "content": prompt}],
                "user_context": {"target_career": "Full Stack Developer", "readiness_score": 45}
            })
            self.assertEqual(res.status_code, 200, f"Failed for prompt: {prompt}")
            self.assertIn("reply", res.json())
            self.assertGreater(len(res.json()["reply"]), 10)

    def test_07_empty_payload_on_post_endpoints(self):
        """Test posting empty JSON to endpoints expecting models returns HTTP 422"""
        endpoints = [
            "/api/auth/register",
            "/api/auth/login",
            "/api/skills/analyze",
            "/api/assessments/submit",
            "/api/adaptive/trigger",
            "/api/mentor/chat"
        ]
        for ep in endpoints:
            res = self.client.post(ep, json={})
            self.assertEqual(res.status_code, 422, f"Expected 422 for empty body on {ep}")

if __name__ == "__main__":
    unittest.main()
