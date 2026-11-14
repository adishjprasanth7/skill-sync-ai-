"""
SkillSync AI - Form Validation & Input Sanitization Test Suite
Tests input bounds, required fields, schema compliance, and HTTP 422 response behaviors.
"""

import sys
import os
import unittest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

class TestFormValidation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_skill_analysis_valid_form(self):
        """Test skill analysis accepts properly structured skill forms"""
        payload = {
            "skills": [
                {"name": "Python", "level": 3, "category": "AI/ML", "verified": True},
                {"name": "React", "level": 2, "category": "Frontend", "verified": False}
            ],
            "target_career_id": "full-stack-dev"
        }
        res = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["total_skills"], 2)
        self.assertIn("strengths", data)
        self.assertIn("weaknesses", data)

    def test_02_skill_analysis_empty_skill_name_rejected(self):
        """Test skill analysis rejects empty skill name with HTTP 422"""
        payload = {
            "skills": [
                {"name": "", "level": 2, "category": "Frontend"}
            ]
        }
        res = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_03_skill_analysis_level_out_of_bounds_low(self):
        """Test skill analysis rejects level 0 with HTTP 422 (must be between 1 and 4)"""
        payload = {
            "skills": [
                {"name": "Python", "level": 0}
            ]
        }
        res = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_04_skill_analysis_level_out_of_bounds_high(self):
        """Test skill analysis rejects level 5 with HTTP 422 (max level is 4)"""
        payload = {
            "skills": [
                {"name": "Python", "level": 5}
            ]
        }
        res = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_05_skill_analysis_negative_level(self):
        """Test skill analysis rejects negative level with HTTP 422"""
        payload = {
            "skills": [
                {"name": "Python", "level": -2}
            ]
        }
        res = self.client.post("/api/skills/analyze", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_06_assessment_submission_valid(self):
        """Test submitting valid assessment form with answer dictionary"""
        payload = {
            "skill": "JavaScript",
            "answers": {
                "js_1": 1,
                "js_2": 2,
                "js_3": 1,
                "js_4": 1
            }
        }
        res = self.client.post("/api/assessments/submit", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["skill"], "JavaScript")
        self.assertEqual(data["total"], 4)
        self.assertEqual(data["percentage"], 100.0)
        self.assertTrue(data["passed"])

    def test_07_assessment_submission_missing_skill(self):
        """Test submitting assessment without skill name returns HTTP 422"""
        payload = {
            "answers": {"js_1": 1}
        }
        res = self.client.post("/api/assessments/submit", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_08_assessment_submission_invalid_answers_type(self):
        """Test submitting non-integer option index returns HTTP 422"""
        payload = {
            "skill": "JavaScript",
            "answers": {
                "js_1": "not-a-number"
            }
        }
        res = self.client.post("/api/assessments/submit", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_09_adaptive_trigger_remedial_valid(self):
        """Test submitting valid adaptive assessment failure trigger"""
        payload = {
            "trigger_type": "assessment_failure",
            "payload": {
                "skill": "JavaScript",
                "weak_topics": ["Closures & Scoping", "Event Loop"]
            }
        }
        res = self.client.post("/api/adaptive/trigger", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "adaptive_action_applied")
        self.assertEqual(data["action"], "remedial_node_injected")
        self.assertTrue(data["injected_node"]["is_remedial"])

    def test_10_adaptive_trigger_career_pivot_valid(self):
        """Test submitting valid adaptive career pivot trigger"""
        payload = {
            "trigger_type": "career_pivot",
            "payload": {
                "new_career_id": "ai-ml-engineer",
                "user_skills": [{"name": "Python", "level": 3, "category": "AI/ML"}]
            }
        }
        res = self.client.post("/api/adaptive/trigger", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "adaptive_action_applied")
        self.assertIn("recalculated_readiness", data)

    def test_11_adaptive_trigger_missing_type(self):
        """Test adaptive trigger without trigger_type returns HTTP 422"""
        payload = {
            "payload": {"skill": "JavaScript"}
        }
        res = self.client.post("/api/adaptive/trigger", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_12_mentor_chat_valid_and_fallback(self):
        """Test mentor chat with valid message structures"""
        payload = {
            "messages": [
                {"role": "user", "content": "Explain closures with a coding example"}
            ],
            "user_context": {
                "target_career": "Full Stack Developer",
                "readiness_score": 50,
                "active_node": "JavaScript Closures"
            }
        }
        res = self.client.post("/api/mentor/chat", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("reply", data)
        self.assertIn("closure", data["reply"].lower())

    def test_13_mentor_chat_invalid_message_structure(self):
        """Test mentor chat message without required 'content' field returns HTTP 422"""
        payload = {
            "messages": [
                {"role": "user"}  # missing content
            ]
        }
        res = self.client.post("/api/mentor/chat", json=payload)
        self.assertEqual(res.status_code, 422)

if __name__ == "__main__":
    unittest.main()
