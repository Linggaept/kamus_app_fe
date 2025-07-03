import axios from "axios";

const API_BASE_URL = "https://api.sikuat.online";

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
