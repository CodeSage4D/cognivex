from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class SkillData(BaseModel):
    skills: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    domains: List[str] = Field(default_factory=list)

class MatchResult(BaseModel):
    match_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    additional_skills: List[str]
    scoring_breakdown: Dict[str, float]

class AIInsights(BaseModel):
    summary: str
    strengths: List[str]
    gaps: List[str]
    recommendation: str

class FinalResponse(BaseModel):
    candidate_name: Optional[str] = "Unknown"
    match_result: MatchResult
    skills: SkillData
    insights: AIInsights
