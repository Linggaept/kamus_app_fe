import axios from "axios";

const API_BASE_URL = "https://api.sikuat.online";

export const getAllTerms = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terms`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Get all terms API error:", error);
    throw error;
  }
};


