import re
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, field_validator

class UserSkill(BaseModel):
    name: str = Field(..., min_length=1)
    level: int = Field(ge=1, le=4, default=1)  # 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert
    category: Optional[str] = "General"
    verified: bool = False

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str
    target_career_id: Optional[str] = "full-stack-dev"
    skills: List[UserSkill] = []
    career_readiness: float = 0.0
    streak_days: int = 1
    hours_studied: float = 0.0

class UserRegisterRequest(BaseModel):
    email: str = Field(..., min_length=5, description="Valid user email address")
    password: str = Field(..., min_length=6, description="Password with minimum 6 characters")
    full_name: str = Field(..., min_length=2, description="User full name")
    target_career_id: Optional[str] = "full-stack-dev"

    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean = v.strip().lower()
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, clean):
            raise ValueError("Invalid email format")
        return clean

    @field_validator('full_name')
    @classmethod
    def validate_full_name(cls, v: str) -> str:
        clean = v.strip()
        if not clean or len(clean) < 2:
            raise ValueError("Full name must be at least 2 characters long")
        return clean

class UserLoginRequest(BaseModel):
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=1)

    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean = v.strip().lower()
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, clean):
            raise ValueError("Invalid email format")
        return clean

class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]
    message: str

class SkillAnalysisRequest(BaseModel):
    skills: List[UserSkill]
    target_career_id: Optional[str] = "full-stack-dev"

class SkillAnalysisResponse(BaseModel):
    total_skills: int
    category_breakdown: Dict[str, int]
    proficiency_average: float
    strengths: List[str]
    weaknesses: List[str]
    missing_prerequisites: List[Dict[str, Any]]

class CareerMatchResponse(BaseModel):
    career_id: str
    career_title: str
    readiness_score: float
    matched_skills: List[Dict[str, Any]]
    missing_core_skills: List[Dict[str, Any]]
    missing_recommended_skills: List[Dict[str, Any]]
    transferable_skills: List[str]
    estimated_weeks_to_ready: int

class RoadmapNode(BaseModel):
    id: str
    title: str
    category: str
    difficulty: str
    estimated_hours: int
    completed: bool = False
    in_progress: bool = False
    is_remedial: bool = False
    reason: Optional[str] = None
    prerequisites: List[str] = []
    lessons: List[str] = []
    resources: List[Dict[str, str]] = []
    project_prompt: Optional[str] = None

class RoadmapPhase(BaseModel):
    phase_number: int
    title: str
    nodes: List[RoadmapNode]

class RoadmapResponse(BaseModel):
    career_id: str
    career_title: str
    phases: List[RoadmapPhase]
    total_estimated_hours: int
    readiness_score: float

class AssessmentSubmission(BaseModel):
    skill: str
    answers: Dict[str, int]  # question_id -> selected_option_index

class AdaptiveTriggerRequest(BaseModel):
    trigger_type: str  # "assessment_failure", "career_pivot", "fast_track"
    payload: Dict[str, Any]

class ChatMessage(BaseModel):
    role: str  # "user", "assistant", "system"
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_context: Optional[Dict[str, Any]] = None

class AgentExecutionLog(BaseModel):
    agent_name: str
    role: str
    status: str  # "idle", "processing", "completed", "error"
    input_summary: str
    output_summary: str
    tokens_used: int
    timestamp: str

class OrchestrationPipelineResponse(BaseModel):
    pipeline_id: str
    status: str
    total_tokens_consumed: int
    agent_logs: List[AgentExecutionLog]
    final_output: Dict[str, Any]
