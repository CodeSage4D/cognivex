from typing import Dict, List
from src.models.schemas import MatchResult

class Matcher:
    """
    Multi-layer scoring engine.
    Combines hard skill overlap with semantic similarity.
    """
    
    def __init__(self, semantic_weight: float = 0.4, skill_weight: float = 0.6):
        self.semantic_weight = semantic_weight
        self.skill_weight = skill_weight

    def compute_score(self, resume_data: Dict, jd_data: Dict, semantic_score: float) -> MatchResult:
        """
        Calculates final weighted match score.
        """
        resume_set = set(resume_data['skills'] + resume_data['tools'])
        jd_set = set(jd_data['skills'] + jd_data['tools'])
        
        matched = resume_set.intersection(jd_set)
        missing = jd_set - resume_set
        additional = resume_set - jd_set
        
        # Skill Overlap Score (0-100)
        if not jd_set:
            skill_score = 100
        else:
            skill_score = (len(matched) / len(jd_set)) * 100
            
        # Semantic Score (Normalized to 0-100)
        semantic_score_normalized = max(0, semantic_score * 100)
        
        # Weighted combination
        final_score = (skill_score * self.skill_weight) + (semantic_score_normalized * self.semantic_weight)
        
        return MatchResult(
            match_score=round(final_score),
            matched_skills=list(matched),
            missing_skills=list(missing),
            additional_skills=list(additional),
            scoring_breakdown={
                "skill_overlap": skill_score,
                "semantic_similarity": semantic_score_normalized
            }
        )
