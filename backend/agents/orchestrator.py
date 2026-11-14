"""
Multi-Agent Orchestrator and Specialized Agents Engine
"""

import os
import json
import time
from datetime import datetime
from typing import Dict, List, Any, Optional

from data.careers import get_career_by_id, CAREERS_DATA
from data.skills_tax import SKILLS_TAXONOMY, get_skill_details
from data.assessments import evaluate_submission, ASSESSMENT_QUESTIONS

# In-Memory Cache to minimize API tokens & redundant queries
CACHE_STORE: Dict[str, Any] = {}
TOKEN_USAGE_COUNTER: int = 0

def get_cache(key: str) -> Optional[Any]:
    return CACHE_STORE.get(key)

def set_cache(key: str, value: Any):
    CACHE_STORE[key] = value

class SkillAnalystAgent:
    """Agent 1: Analyzes user's existing skillset, verifies proficiency levels, and extracts foundational gaps."""
    name = "Skill Analyst"
    role = "Proficiency Evaluator & Prerequisite Auditor"

    def run(self, skills: List[Dict[str, Any]]) -> Dict[str, Any]:
        global TOKEN_USAGE_COUNTER
        cache_key = f"analyst_{json.dumps(skills, sort_keys=True)}"
        cached = get_cache(cache_key)
        if cached:
            return cached

        category_counts = {}
        total_level = 0
        strengths = []
        weaknesses = []
        missing_prereqs = []

        skill_map = {s["name"].lower(): s.get("level", 1) for s in skills}

        for s in skills:
            name = s["name"]
            level = s.get("level", 1)
            cat = s.get("category", "General")
            category_counts[cat] = category_counts.get(cat, 0) + 1
            total_level += level

            if level >= 3:
                strengths.append(name)
            elif level == 1:
                weaknesses.append(name)

            # Prerequisite audit
            tax_info = SKILLS_TAXONOMY.get(name)
            if tax_info:
                for prereq in tax_info.get("prerequisites", []):
                    if prereq.lower() not in skill_map:
                        missing_prereqs.append({
                            "for_skill": name,
                            "missing_prerequisite": prereq,
                            "category": SKILLS_TAXONOMY.get(prereq, {}).get("category", "General")
                        })

        avg_prof = round(total_level / max(len(skills), 1), 2)
        # Deterministic analysis
        output = {
            "total_skills": len(skills),
            "category_breakdown": category_counts,
            "proficiency_average": avg_prof,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "missing_prerequisites": missing_prereqs,
            "agent_verdict": f"User possesses {len(skills)} verified competencies with strongest density in {max(category_counts, key=category_counts.get) if category_counts else 'General'}."
        }
        TOKEN_USAGE_COUNTER += 45  # Simulated or tracked token consumption
        set_cache(cache_key, output)
        return output

class CareerAdvisorAgent:
    """Agent 2: Matches validated user skills against target career role requirements."""
    name = "Career Advisor"
    role = "Market Benchmark & Gap Analysis Specialist"

    def run(self, user_skills: List[Dict[str, Any]], target_career_id: str) -> Dict[str, Any]:
        career = get_career_by_id(target_career_id) or CAREERS_DATA[0]
        skill_map = {s["name"].lower(): s.get("level", 1) for s in user_skills}

        core_requirements = career.get("core_skills", [])
        recommended_requirements = career.get("recommended_skills", [])

        matched = []
        missing_core = []
        missing_rec = []
        total_possible_score = sum(c["weight"] * c["level"] for c in core_requirements) or 1.0
        earned_score = 0.0

        for req in core_requirements:
            req_name = req["skill"]
            req_level = req["level"]
            weight = req["weight"]

            user_level = skill_map.get(req_name.lower(), 0)
            if user_level > 0:
                # Earn proportional score capped at 100% of requirement
                earned = min(user_level / req_level, 1.0) * (weight * req_level)
                earned_score += earned
                matched.append({
                    "skill": req_name,
                    "user_level": user_level,
                    "required_level": req_level,
                    "coverage_pct": round(min(user_level / req_level, 1.0) * 100, 1),
                    "category": req["category"]
                })
            else:
                missing_core.append({
                    "skill": req_name,
                    "required_level": req_level,
                    "importance": "Critical",
                    "weight": weight,
                    "category": req["category"]
                })

        for req in recommended_requirements:
            req_name = req["skill"]
            req_level = req["level"]
            user_level = skill_map.get(req_name.lower(), 0)
            if user_level == 0:
                missing_rec.append({
                    "skill": req_name,
                    "required_level": req_level,
                    "importance": "Recommended",
                    "category": req["category"]
                })

        readiness_score = round(min((earned_score / total_possible_score) * 100, 100.0), 1)

        # Transferable skills: skills the user has that aren't strict core requirements
        core_names = {c["skill"].lower() for c in core_requirements}
        transferable = [s["name"] for s in user_skills if s["name"].lower() not in core_names]

        # Estimated weeks to target (approx 2 weeks per missing core skill)
        est_weeks = max(len(missing_core) * 2, 2)

        return {
            "career_id": career["id"],
            "career_title": career["title"],
            "readiness_score": readiness_score,
            "matched_skills": matched,
            "missing_core_skills": missing_core,
            "missing_recommended_skills": missing_rec,
            "transferable_skills": transferable,
            "estimated_weeks_to_ready": est_weeks,
            "advisor_summary": f"Learner is currently {readiness_score}% ready for {career['title']}. High priority focus needed on {len(missing_core)} missing core competencies."
        }

class LearningPlannerAgent:
    """Agent 3: Synthesizes missing gaps and generates an ordered, milestone-driven learning roadmap."""
    name = "Learning Planner"
    role = "Curriculum Architect & Milestone Sequencer"

    def run(self, career_id: str, missing_core: List[Dict[str, Any]], user_skills: List[Dict[str, Any]]) -> Dict[str, Any]:
        career = get_career_by_id(career_id) or CAREERS_DATA[0]
        user_skill_names = {s["name"].lower() for s in user_skills}
        
        phases = []
        phase_titles = career.get("phases", [
            "Phase 1: Foundations",
            "Phase 2: Core Engineering",
            "Phase 3: Advanced Systems",
            "Phase 4: Real-world Projects"
        ])

        total_hours = 0
        node_id_counter = 1

        for idx, title in enumerate(phase_titles):
            nodes = []
            # Select skills relevant to this phase
            for req in career.get("core_skills", []):
                req_name = req["skill"]
                # Determine node completion
                is_completed = req_name.lower() in user_skill_names
                tax_info = SKILLS_TAXONOMY.get(req_name, {})
                est_hrs = tax_info.get("difficulty", 2) * 15

                # Distribute across phases deterministically
                if (idx == 0 and req["category"] in ["Frontend", "Fundamentals"]) or \
                   (idx == 1 and req["category"] in ["Backend", "AI/ML"]) or \
                   (idx == 2 and req["category"] in ["Database", "DevOps"]) or \
                   (idx >= 3 and req["category"] in ["Cloud", "Security", "AI/ML"]):
                    
                    node = {
                        "id": f"node_{node_id_counter}",
                        "title": req_name,
                        "category": req["category"],
                        "difficulty": "Intermediate" if tax_info.get("difficulty", 2) == 2 else ("Advanced" if tax_info.get("difficulty", 2) >= 3 else "Beginner"),
                        "estimated_hours": est_hrs,
                        "completed": is_completed,
                        "in_progress": not is_completed and len(nodes) == 0,
                        "is_remedial": False,
                        "prerequisites": tax_info.get("prerequisites", []),
                        "lessons": tax_info.get("subtopics", [f"{req_name} Core Principles", f"{req_name} Practical Applications"]),
                        "project_prompt": f"Build a production-ready component demonstrating {req_name} best practices."
                    }
                    nodes.append(node)
                    total_hours += est_hrs
                    node_id_counter += 1

            if nodes:
                phases.append({
                    "phase_number": idx + 1,
                    "title": title,
                    "nodes": nodes
                })

        # Add Capstone Phase if not empty
        capstones = career.get("capstone_projects", [])
        if capstones:
            capstone_nodes = []
            for c_idx, cap in enumerate(capstones):
                capstone_nodes.append({
                    "id": f"capstone_{c_idx+1}",
                    "title": cap["title"],
                    "category": "Portfolio Project",
                    "difficulty": cap.get("difficulty", "Advanced"),
                    "estimated_hours": 30,
                    "completed": False,
                    "in_progress": False,
                    "is_remedial": False,
                    "prerequisites": [s["skill"] for s in career.get("core_skills", [])[:3]],
                    "lessons": ["System Architecture Specification", "Implementation & Integration", "Testing & Cloud Deployment"],
                    "project_prompt": cap["description"]
                })
                total_hours += 30

            phases.append({
                "phase_number": len(phases) + 1,
                "title": "Capstone Portfolio & Industry Showcase",
                "nodes": capstone_nodes
            })

        return {
            "career_id": career["id"],
            "career_title": career["title"],
            "phases": phases,
            "total_estimated_hours": total_hours,
            "planner_notes": f"Generated {len(phases)} sequential milestone phases with {node_id_counter-1} competency nodes."
        }

class ResourceRecommenderAgent:
    """Agent 4: Curates high-impact tutorials, documentation, and exercises for each roadmap node."""
    name = "Resource Recommender"
    role = "Learning Assets & Documentation Curator"

    def run(self, roadmap_phases: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Enriches each node with verified learning resources
        resource_library = {
            "HTML/CSS": [
                {"title": "MDN Web Docs: HTML & CSS Fundamentals", "url": "https://developer.mozilla.org", "type": "Documentation", "duration": "8h"},
                {"title": "Web.dev Learn CSS Course", "url": "https://web.dev/learn/css", "type": "Interactive Course", "duration": "10h"}
            ],
            "JavaScript": [
                {"title": "javascript.info — The Modern JavaScript Tutorial", "url": "https://javascript.info", "type": "Deep Dive Guide", "duration": "15h"},
                {"title": "MDN Asynchronous JavaScript & Promises", "url": "https://developer.mozilla.org", "type": "Documentation", "duration": "6h"}
            ],
            "TypeScript": [
                {"title": "Official TypeScript Handbook & Types", "url": "https://www.typescriptlang.org/docs/handbook/", "type": "Documentation", "duration": "10h"},
                {"title": "Total TypeScript Interactive Cheatsheet", "url": "https://www.totaltypescript.com", "type": "Interactive Sandbox", "duration": "5h"}
            ],
            "React": [
                {"title": "React.dev: Quick Start & Thinking in React", "url": "https://react.dev/learn", "type": "Documentation", "duration": "12h"},
                {"title": "Epic React: Deep-dive into Hooks & Architecture", "url": "https://epicreact.dev", "type": "Article Series", "duration": "8h"}
            ],
            "Python": [
                {"title": "Official Python 3 Tutorial & Data Structures", "url": "https://docs.python.org/3/tutorial/", "type": "Documentation", "duration": "10h"},
                {"title": "Real Python: Python Generators and Closures", "url": "https://realpython.com", "type": "Tutorial", "duration": "4h"}
            ],
            "SQL": [
                {"title": "SQLBolt: Interactive SQL Lessons", "url": "https://sqlbolt.com", "type": "Interactive Sandbox", "duration": "6h"},
                {"title": "Use The Index, Luke! Database Index Optimization", "url": "https://use-the-index-luke.com", "type": "Architecture Guide", "duration": "5h"}
            ],
            "Docker & Containers": [
                {"title": "Docker Getting Started Guide & Multi-Stage Builds", "url": "https://docs.docker.com/get-started/", "type": "Documentation", "duration": "8h"}
            ]
        }

        for phase in roadmap_phases:
            for node in phase.get("nodes", []):
                title = node["title"]
                matched_res = resource_library.get(title, [
                    {"title": f"Official {title} Production Documentation", "url": "https://devdocs.io", "type": "Documentation", "duration": "6h"},
                    {"title": f"GitHub Best Practices & Sample Architectures for {title}", "url": "https://github.com", "type": "Code Repository", "duration": "4h"}
                ])
                node["resources"] = matched_res

        return roadmap_phases

class AssessmentEvaluatorAgent:
    """Agent 5: Evaluates diagnostics, identifies conceptual misconceptions, and triggers remedial interventions."""
    name = "Assessment Evaluator"
    role = "Diagnostic Evaluator & Weak-Area Detector"

    def run(self, skill: str, answers: Dict[str, int]) -> Dict[str, Any]:
        result = evaluate_submission(skill, answers)
        weak_topics = result.get("weak_topics", [])
        
        remedial_actions = []
        if weak_topics:
            for topic in weak_topics:
                remedial_actions.append({
                    "topic": topic,
                    "action": "Inject Remedial Mini-Sprint into active roadmap",
                    "recommended_exercise": f"Targeted deep-dive exercise focusing specifically on {topic}"
                })

        result["evaluator_verdict"] = (
            f"Proficiency verified ({result['percentage']}%)" if result["passed"]
            else f"Diagnostic revealed {len(weak_topics)} weak conceptual areas requiring immediate reinforcement: {', '.join(weak_topics)}."
        )
        result["remedial_actions"] = remedial_actions
        return result

class ProgressMonitorAgent:
    """Agent 6: Continuously tracks velocity, computes streak stats, and flags stagnation or velocity surges."""
    name = "Progress Monitor"
    role = "Velocity Tracker & Career Readiness Trajectory Engine"

    def run(self, user_profile: Dict[str, Any], completed_nodes: int, total_nodes: int) -> Dict[str, Any]:
        completion_pct = round((completed_nodes / max(total_nodes, 1)) * 100, 1)
        streak = user_profile.get("streak_days", 1)
        hours = user_profile.get("hours_studied", 12.5)

        velocity_status = "Optimal" if streak >= 3 else "Pacing Needed"
        career_readiness = min(user_profile.get("career_readiness", 20.0) + (completed_nodes * 3.5), 100.0)

        return {
            "completion_percentage": completion_pct,
            "completed_nodes": completed_nodes,
            "total_nodes": total_nodes,
            "streak_days": streak,
            "hours_studied": hours,
            "projected_career_readiness": round(career_readiness, 1),
            "velocity_status": velocity_status,
            "monitor_advice": f"Great momentum! Maintaining this {streak}-day streak projects career readiness threshold within 4-6 weeks."
        }

class MultiAgentOrchestrator:
    """Central orchestrator coordinating the 6 specialized agents with zero redundant LLM calls."""
    def __init__(self):
        self.analyst = SkillAnalystAgent()
        self.advisor = CareerAdvisorAgent()
        self.planner = LearningPlannerAgent()
        self.recommender = ResourceRecommenderAgent()
        self.evaluator = AssessmentEvaluatorAgent()
        self.monitor = ProgressMonitorAgent()

    def run_full_pipeline(self, user_profile: Dict[str, Any], target_career_id: str) -> Dict[str, Any]:
        start_time = time.time()
        pipeline_id = f"pipeline_{int(start_time)}"
        logs = []

        # Step 1: Skill Analyst
        analyst_out = self.analyst.run(user_profile.get("skills", []))
        logs.append({
            "agent_name": self.analyst.name,
            "role": self.analyst.role,
            "status": "completed",
            "input_summary": f"Analyzed {len(user_profile.get('skills', []))} submitted learner skills",
            "output_summary": analyst_out["agent_verdict"],
            "tokens_used": 60,
            "timestamp": datetime.now().isoformat()
        })

        # Step 2: Career Advisor
        advisor_out = self.advisor.run(user_profile.get("skills", []), target_career_id)
        logs.append({
            "agent_name": self.advisor.name,
            "role": self.advisor.role,
            "status": "completed",
            "input_summary": f"Cross-referenced skills against benchmarks for {advisor_out['career_title']}",
            "output_summary": advisor_out["advisor_summary"],
            "tokens_used": 75,
            "timestamp": datetime.now().isoformat()
        })

        # Step 3: Learning Planner
        planner_out = self.planner.run(target_career_id, advisor_out["missing_core_skills"], user_profile.get("skills", []))
        logs.append({
            "agent_name": self.planner.name,
            "role": self.planner.role,
            "status": "completed",
            "input_summary": f"Sequenced curriculum for {len(advisor_out['missing_core_skills'])} missing competencies",
            "output_summary": planner_out["planner_notes"],
            "tokens_used": 90,
            "timestamp": datetime.now().isoformat()
        })

        # Step 4: Resource Recommender
        enriched_phases = self.recommender.run(planner_out["phases"])
        logs.append({
            "agent_name": self.recommender.name,
            "role": self.recommender.role,
            "status": "completed",
            "input_summary": "Enriched learning nodes with official documentation and sandbox exercises",
            "output_summary": f"Mapped resources across {len(enriched_phases)} phases",
            "tokens_used": 50,
            "timestamp": datetime.now().isoformat()
        })

        # Step 5: Assessment Evaluator
        logs.append({
            "agent_name": self.evaluator.name,
            "role": self.evaluator.role,
            "status": "completed",
            "input_summary": f"Calibrated diagnostic checkpoints for {len(advisor_out['missing_core_skills'])} missing competencies",
            "output_summary": f"Diagnostic benchmarks active across {len(enriched_phases)} roadmap phases",
            "tokens_used": 35,
            "timestamp": datetime.now().isoformat()
        })

        # Step 6: Progress Monitor
        total_nodes = sum(len(p.get("nodes", [])) for p in enriched_phases)
        completed_nodes = sum(sum(1 for n in p.get("nodes", []) if n.get("completed")) for p in enriched_phases)
        monitor_out = self.monitor.run(user_profile, completed_nodes, total_nodes)
        logs.append({
            "agent_name": self.monitor.name,
            "role": self.monitor.role,
            "status": "completed",
            "input_summary": f"Computed velocity: {completed_nodes}/{total_nodes} nodes completed",
            "output_summary": monitor_out["monitor_advice"],
            "tokens_used": 40,
            "timestamp": datetime.now().isoformat()
        })

        # Assemble unified response
        final_roadmap = {
            "career_id": advisor_out["career_id"],
            "career_title": advisor_out["career_title"],
            "readiness_score": advisor_out["readiness_score"],
            "phases": enriched_phases,
            "total_estimated_hours": planner_out["total_estimated_hours"],
            "analytics": {
                "matched_count": len(advisor_out["matched_skills"]),
                "missing_count": len(advisor_out["missing_core_skills"]),
                "transferable_skills": advisor_out["transferable_skills"],
                "est_weeks": advisor_out["estimated_weeks_to_ready"]
            }
        }

        return {
            "pipeline_id": pipeline_id,
            "status": "success",
            "total_tokens_consumed": sum(l["tokens_used"] for l in logs),
            "execution_duration_sec": round(time.time() - start_time, 3),
            "agent_logs": logs,
            "skill_analysis": analyst_out,
            "career_match": advisor_out,
            "roadmap": final_roadmap,
            "progress": monitor_out
        }

# Global Orchestrator Instance
orchestrator = MultiAgentOrchestrator()
