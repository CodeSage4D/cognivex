from sentence_transformers import SentenceTransformer, util
import torch

class EmbeddingEngine:
    """
    Handles vectorization of text and similarity calculations.
    Uses SentenceTransformers (default: all-MiniLM-L6-v2).
    """
    _instance = None
    _model = None

    def __new__(cls, model_name: str = "all-MiniLM-L6-v2"):
        if cls._instance is None:
            cls._instance = super(EmbeddingEngine, cls).__new__(cls)
            cls._model = SentenceTransformer(model_name)
        return cls._instance

    def get_embedding(self, text: str):
        if not text:
            return torch.zeros((1, 384)) # Default size for MiniLM
        return self._model.encode(text, convert_to_tensor=True)

    def calculate_similarity(self, embedding_1, embedding_2) -> float:
        """
        Computes cosine similarity between two embeddings.
        Returns a float between 0 and 1.
        """
        score = util.cos_sim(embedding_1, embedding_2)
        return float(score.item())

    def match_texts(self, text_1: str, text_2: str) -> float:
        emb_1 = self.get_embedding(text_1)
        emb_2 = self.get_embedding(text_2)
        return self.calculate_similarity(emb_1, emb_2)
