import spacy
from spacy.pipeline import EntityRuler
from typing import Dict, List, Set
import re

class SkillExtractor:
    """
    Hybrid Skill Extraction Engine:
    1. NLP-based (spaCy) for general entity recognition.
    2. Pattern-based (EntityRuler) for high-precision technology extraction.
    3. Regex matching for edge cases.
    """
    
    def __init__(self, model_name: str = "en_core_web_md"):
        try:
            self.nlp = spacy.load(model_name)
        except OSError:
            # Fallback if model not found during testing
            print(f"Warning: Model {model_name} not found. Attempting to use en_core_web_sm.")
            self.nlp = spacy.load("en_core_web_sm")
            
        self.ruler = self.nlp.add_pipe("entity_ruler", before="ner")
        self._add_skill_patterns()

    def _add_skill_patterns(self):
        """
        Populate the EntityRuler with common tech patterns.
        In production, this would load from a JSON or database.
        """
        patterns = [
            # Languages
            {"label": "SKILL", "pattern": [{"LOWER": "python"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "javascript"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "typescript"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "golang"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "rust"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "java"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "cpp"}]},
            {"label": "SKILL", "pattern": [{"LOWER": "c++"}]},
            
            # Frameworks
            {"label": "TOOL", "pattern": [{"LOWER": "react"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "next.js"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "vue"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "fastapi"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "django"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "pytorch"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "tensorflow"}]},
            
            # Infrastructure
            {"label": "TOOL", "pattern": [{"LOWER": "aws"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "docker"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "kubernetes"}]},
            {"label": "TOOL", "pattern": [{"LOWER": "terraform"}]},
            
            # Domains
            {"label": "DOMAIN", "pattern": [{"LOWER": "machine"}, {"LOWER": "learning"}]},
            {"label": "DOMAIN", "pattern": [{"LOWER": "deep"}, {"LOWER": "learning"}]},
            {"label": "DOMAIN", "pattern": [{"LOWER": "data"}, {"LOWER": "science"}]},
            {"label": "DOMAIN", "pattern": [{"LOWER": "cloud"}, {"LOWER": "computing"}]},
        ]
        self.ruler.add_patterns(patterns)

    def extract(self, text: str) -> Dict[str, List[str]]:
        doc = self.nlp(text)
        
        extracted = {
            "skills": set(),
            "tools": set(),
            "domains": set()
        }
        
        for ent in doc.ents:
            if ent.label_ == "SKILL":
                extracted["skills"].add(ent.text)
            elif ent.label_ == "TOOL":
                extracted["tools"].add(ent.text)
            elif ent.label_ == "DOMAIN":
                extracted["domains"].add(ent.text)
        
        # Additional cleanup and deduplication
        return {k: sorted(list(v)) for k, v in extracted.items()}
