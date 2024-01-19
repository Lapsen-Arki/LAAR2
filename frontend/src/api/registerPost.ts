import axios from "axios";

// TODO: Move to env variables etc:
const API_BASE_URL = "http://localhost:3000/api";

interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration error: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
