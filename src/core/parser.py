import fitz  # PyMuPDF
from docx import Document
import os
from src.utils.text_cleaner import clean_text

class ResumeParser:
    """
    Handles extraction of text from various file formats (PDF, DOCX).
    Ensures text is cleaned and normalized for downstream NLP tasks.
    """
    
    @staticmethod
    def extract_text_from_pdf(file_path: str) -> str:
        text = ""
        try:
            with fitz.open(file_path) as doc:
                for page in doc:
                    text += page.get_text("text")
        except Exception as e:
            print(f"Error parsing PDF: {e}")
        return clean_text(text)

    @staticmethod
    def extract_text_from_docx(file_path: str) -> str:
        text = ""
        try:
            doc = Document(file_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception as e:
            print(f"Error parsing DOCX: {e}")
        return clean_text(text)

    def parse(self, file_path: str) -> str:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf":
            return self.extract_text_from_pdf(file_path)
        elif ext == ".docx":
            return self.extract_text_from_docx(file_path)
        else:
            raise ValueError(f"Unsupported file format: {ext}")
