from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import tempfile
from main import AurxonEngine
from src.models.schemas import FinalResponse

app = FastAPI(title="AURXON AI Resume Intelligence API")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Engine
engine = AurxonEngine()

@app.get("/health")
def health():
    return {"status": "operational", "engine": "AURXON-v1"}

@app.post("/analyze", response_model=FinalResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    jd_text: str = Form(...)
):
    """
    Primary endpoint for resume analysis.
    Accepts a PDF/DOCX file and a job description string.
    """
    # 1. Save uploaded file to a temporary location
    suffix = os.path.splitext(file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        temp_path = tmp.name

    try:
        # 2. Process via AurxonEngine
        result = engine.process(temp_path, jd_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
