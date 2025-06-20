import axios from "axios";

const API_BASE_URL = "http://192.168.1.10:3000";

export const searchKeyword = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { keyword: query },
    });
    return response.data; // pastikan response-nya sesuai
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};
