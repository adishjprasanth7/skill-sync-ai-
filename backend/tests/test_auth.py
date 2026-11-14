"""
SkillSync AI - Authentication & User Registration Test Suite
Tests user registration, login, token generation, profile retrieval, and demo switching.
"""

import sys
import os
import unittest
import uuid
from fastapi.testclient import TestClient

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from database import db

class TestAuthentication(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def setUp(self):
        # Generate unique test email for each test run to ensure isolation
        self.unique_id = uuid.uuid4().hex[:8]
        self.test_email = f"testuser_{self.unique_id}@example.com"
        self.test_password = "SecurePassword123"
        self.test_name = f"Test Engineer {self.unique_id}"

    def test_01_register_user_success(self):
        """Test happy-path registration creates user, returns token, and HTTP 201"""
        payload = {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name,
            "target_career_id": "full-stack-dev"
        }
        response = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertIn("access_token", data)
        self.assertTrue(data["access_token"].startswith("tok_"))
        self.assertIn("user", data)
        self.assertEqual(data["user"]["email"], self.test_email)
        self.assertEqual(data["user"]["full_name"], self.test_name)
        self.assertEqual(data["user"]["target_career_id"], "full-stack-dev")

    def test_02_register_duplicate_email(self):
        """Test registering with an existing email returns HTTP 409 Conflict"""
        payload = {
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name
        }
        # First registration
        r1 = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(r1.status_code, 201)

        # Duplicate registration
        r2 = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(r2.status_code, 409)
        self.assertIn("already registered", r2.json()["detail"].lower())

    def test_03_register_invalid_email_format(self):
        """Test registration rejects invalid email format with HTTP 422"""
        invalid_emails = ["notanemail", "test@", "@domain.com", "user space@test.com"]
        for bad_email in invalid_emails:
            payload = {
                "email": bad_email,
                "password": "ValidPassword123",
                "full_name": "Valid Name"
            }
            res = self.client.post("/api/auth/register", json=payload)
            self.assertEqual(res.status_code, 422, f"Failed for email: {bad_email}")

    def test_04_register_short_password(self):
        """Test registration rejects passwords shorter than 6 characters with HTTP 422"""
        payload = {
            "email": f"shortpwd_{self.unique_id}@example.com",
            "password": "123",
            "full_name": "Valid Name"
        }
        res = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_05_register_short_full_name(self):
        """Test registration rejects empty or single-character full name with HTTP 422"""
        payload = {
            "email": f"shortname_{self.unique_id}@example.com",
            "password": "ValidPassword123",
            "full_name": " "
        }
        res = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(res.status_code, 422)

    def test_06_login_user_success(self):
        """Test logging in with valid registered credentials returns HTTP 200 and auth token"""
        # First create the user
        self.client.post("/api/auth/register", json={
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name
        })

        # Now login
        login_res = self.client.post("/api/auth/login", json={
            "email": self.test_email,
            "password": self.test_password
        })
        self.assertEqual(login_res.status_code, 200)
        data = login_res.json()
        self.assertIn("access_token", data)
        self.assertEqual(data["user"]["email"], self.test_email)

    def test_07_login_wrong_password(self):
        """Test login with incorrect password returns HTTP 401 Unauthorized"""
        self.client.post("/api/auth/register", json={
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name
        })

        res = self.client.post("/api/auth/login", json={
            "email": self.test_email,
            "password": "WrongPassword!"
        })
        self.assertEqual(res.status_code, 401)
        self.assertIn("Invalid email or password", res.json()["detail"])

    def test_08_login_nonexistent_email(self):
        """Test login with unregistered email returns HTTP 401 Unauthorized"""
        res = self.client.post("/api/auth/login", json={
            "email": "completely_unregistered_999@example.com",
            "password": "SomePassword123"
        })
        self.assertEqual(res.status_code, 401)

    def test_09_authenticated_me_endpoint(self):
        """Test /api/auth/me with valid token retrieves current user profile"""
        reg_res = self.client.post("/api/auth/register", json={
            "email": self.test_email,
            "password": self.test_password,
            "full_name": self.test_name
        })
        token = reg_res.json()["access_token"]

        # Retrieve profile via token
        me_res = self.client.get(f"/api/auth/me?token={token}")
        self.assertEqual(me_res.status_code, 200)
        self.assertEqual(me_res.json()["email"], self.test_email)

    def test_10_authenticated_me_invalid_token(self):
        """Test /api/auth/me with invalid or missing token returns HTTP 401"""
        res_no_tok = self.client.get("/api/auth/me")
        self.assertEqual(res_no_tok.status_code, 401)

        res_bad_tok = self.client.get("/api/auth/me?token=invalid_tok_12345")
        self.assertEqual(res_bad_tok.status_code, 401)

    def test_11_get_user_profile_endpoints(self):
        """Test retrieving user profiles and 404 on missing user"""
        res = self.client.get("/api/auth/profile/alex_demo")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["id"], "alex_demo")

        res_404 = self.client.get("/api/auth/profile/non_existent_user_9999")
        self.assertEqual(res_404.status_code, 404)

    def test_12_demo_switch_endpoints(self):
        """Test demo profile switching and 404 handling on unknown profile"""
        res_alex = self.client.post("/api/auth/demo-switch/alex_demo")
        self.assertEqual(res_alex.status_code, 200)
        self.assertIn("Alex Rivera", res_alex.json()["message"])

        res_maya = self.client.post("/api/auth/demo-switch/maya_demo")
        self.assertEqual(res_maya.status_code, 200)
        self.assertIn("Maya Lin", res_maya.json()["message"])

        res_bad = self.client.post("/api/auth/demo-switch/unknown_demo_user")
        self.assertEqual(res_bad.status_code, 404)

if __name__ == "__main__":
    unittest.main()
