import axios from "axios";
import { AddDataToDatabase } from "../types/types";

// TODO: Move to env variables etc:
const API_BASE_URL = "http://localhost:3000/api";

export const adminAddData = async (submitData: AddDataToDatabase) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin`, submitData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error sending the data: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
