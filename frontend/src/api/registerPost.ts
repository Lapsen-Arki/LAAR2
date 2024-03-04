import axios from "axios";
import { RegisterData } from "../types/typesFrontend";
import { Token } from "@stripe/stripe-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
