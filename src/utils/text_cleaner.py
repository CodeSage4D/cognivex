import re
import string

def clean_text(text: str) -> str:
    """
    Production-grade text cleaning for resume processing.
    - Removes non-printable characters.
    - Normalizes whitespace.
    - Preserves case for tech terms (handled later by NLP).
    """
    if not text:
        return ""
    
    # Remove non-printable characters
    text = "".join(filter(lambda x: x in string.printable, text))
    
    # Normalize whitespace (tabs, newlines, multiple spaces)
    text = re.sub(r'\s+', ' ', text)
    
    # Remove weird artifacts like bullet points or symbols
    text = re.sub(r'[•○\t]', ' ', text)
    
    return text.strip()
