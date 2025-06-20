import axios from "axios";

const API_BASE_URL = "http://192.168.1.10:3000";

export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error("Get history API error:", error);
    throw error;
  }
};

export const deleteHistory = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/history/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Clear history API error:", error);
    throw error;
  }
};

export const addHistory = async (id: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/history`, {
      term_id: id,
    });
    return response.data;
  } catch (error) {
    console.error("Add history API error:", error);
    throw error;
  }
};
