import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const cognivexApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const analyzeResume = async (file: File, jdText: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("jd_text", jdText);

  try {
    const response = await cognivexApi.post("/analyze", formData);
    return response.data;
  } catch (error) {
    console.error("Cognivex API Error:", error);
    throw error;
  }
};
