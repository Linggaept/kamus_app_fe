import axios from "axios";

const API_BASE_URL = "https://adminapi.sikuat.online";

export const getAllAdminTerms = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terms`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getByIdTerm = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTermById = async (
  id: number,
  term: string,
  definition: string
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/terms/${id}`, {
      term,
      definition,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTerms = async (term: string, definition: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/terms`, {
      term,
      definition,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTermById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/terms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
