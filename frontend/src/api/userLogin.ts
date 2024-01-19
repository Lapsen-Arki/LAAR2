import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Consider moving to env variables

export const userLogin = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  const data = { email, password, rememberMe }; // Object shorthand notation
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
