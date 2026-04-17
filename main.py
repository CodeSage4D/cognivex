import os
from src.core.parser import ResumeParser
from src.core.extractor import SkillExtractor
from src.core.embedding_engine import EmbeddingEngine
from src.core.matcher import Matcher
from src.core.insight_engine import InsightEngine
from src.models.schemas import FinalResponse

class AurxonEngine:
    """
    AURXON AI Resume Intelligence Engine - Production Core.
    Orchestrates the entire pipeline: Parse -> Extract -> Match -> Insight.
    """
    
    def __init__(self):
        self.parser = ResumeParser()
        self.extractor = SkillExtractor()
        self.embedder = EmbeddingEngine()
        self.matcher = Matcher()
        self.insighter = InsightEngine()

    def process(self, resume_path: str, jd_text: str) -> FinalResponse:
        # 1. Parse
        resume_text = self.parser.parse(resume_path)
        
        # 2. Extract
        resume_skills = self.extractor.extract(resume_text)
        jd_skills = self.extractor.extract(jd_text)
        
        # 3. Semantic Similarity
        semantic_score = self.embedder.match_texts(resume_text, jd_text)
        
        # 4. Matching Logic
        match_result = self.matcher.compute_score(resume_skills, jd_skills, semantic_score)
        
        # 5. Generate Insights
        insights = self.insighter.generate_insights(resume_text, jd_text, match_result.model_dump())
        
        # Assemble Final Response
        return FinalResponse(
            candidate_name="John Doe",  # Placeholder, usually extracted via NER
            match_result=match_result,
            skills=resume_skills,
            insights=insights
        )

if __name__ == "__main__":
    # Example Usage
    engine = AurxonEngine()
    
    # Mocking a job description
    sample_jd = """
    We are looking for a Senior AI Engineer proficient in Python, FastAPI, and PyTorch. 
    Experience with AWS and Docker is required. Knowledge of Machine Learning domains like NLP and Transformers is a plus.
    """
    
    # Normally you'd point to a file, but for this demo logic:
    # resume_path = "data/sample_resume.pdf"
    print("AURXON Engine Initialized. Ready for production throughput.")
