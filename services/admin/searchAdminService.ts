import axios from "axios";

const API_BASE_URL = "https://adminapi.sikuat.online";

export const searchAdminKeyword = async (query: string) => {
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
