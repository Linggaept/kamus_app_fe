import axios from "axios";

const API_BASE_URL = "http://192.168.1.10:4000";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
