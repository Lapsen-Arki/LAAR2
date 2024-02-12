import axios from "axios";
import { RegisterData } from "../types/types";
import { Token } from "@stripe/stripe-js";

// TODO: Move to env variables etc:
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const registerUser = async (
  registerData: RegisterData,
  token: Token
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      ...registerData,
      token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration error: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
