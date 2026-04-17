from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from src.models.schemas import AIInsights

class InsightEngine:
    """
    Generates high-fidelity AI insights using LLMs.
    Provides summary, strengths, gaps, and recommendation.
    """
    
    def __init__(self, model_name: str = "gpt-4o"):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            print("Warning: OPENAI_API_KEY not found. LLM features will be disabled.")
            self.llm = None
        else:
            self.llm = ChatOpenAI(model=model_name, temperature=0, openai_api_key=self.api_key)

    def generate_insights(self, resume_text: str, jd_text: str, match_result: dict) -> AIInsights:
        if not self.llm:
            return AIInsights(
                summary="AI Insights unavailable (Missing API Key)",
                strengths=[],
                gaps=[],
                recommendation="Please provide an API key for analysis."
            )

        template = """
        You are a Principal Technical Recruiter. Analyze the candidate's resume against the job description.
        
        RESUME: {resume}
        JOB DESCRIPTION: {jd}
        MATCH DATA: {match_data}
        
        Provide:
        1. A 2-sentence professional summary of the candidate's fit.
        2. Top 3 technical strengths relevant to this specific JD.
        3. Clear identification of skill gaps.
        4. A final recommendation (Strong Hire, Hire, Consider, No Hire) with a 1-sentence justification.
        
        Strictly follow this structure:
        Summary: [Text]
        Strengths: - [S1] \n - [S2] \n - [S3]
        Gaps: - [G1] \n - [G2]
        Recommendation: [Decision] - [Justification]
        """
        
        prompt = PromptTemplate(
            input_variables=["resume", "jd", "match_data"],
            template=template
        )
        
        chain = prompt | self.llm
        response = chain.invoke({
            "resume": resume_text[:4000],  # Truncate to save tokens
            "jd": jd_text[:2000],
            "match_data": str(match_result)
        })
        
        # Parsing logic (simplified for this demo)
        content = response.content
        summary = content.split("Summary:")[1].split("Strengths:")[0].strip()
        strengths = [s.strip("- ") for s in content.split("Strengths:")[1].split("Gaps:")[0].strip().split("\n")]
        gaps = [g.strip("- ") for g in content.split("Gaps:")[1].split("Recommendation:")[0].strip().split("\n")]
        recommendation = content.split("Recommendation:")[1].strip()
        
        return AIInsights(
            summary=summary,
            strengths=strengths,
            gaps=gaps,
            recommendation=recommendation
        )
