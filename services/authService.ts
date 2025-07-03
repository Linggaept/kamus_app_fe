import axios from "axios";

const API_BASE_URL = "https://api.sikuat.online";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // pastikan response-nya sesuai
  } catch (error) {
    throw error;
  }
};

export const regiterUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      email,
      password,
    });
    return response.data; // pastikan response-nya sesuai
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data; // pastikan response-nya sesuai
  } catch (error) {
    throw error;
  }
};
