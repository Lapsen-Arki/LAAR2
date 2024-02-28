import axios from "axios";
import { FinalDataToBackend } from "../types/recommTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Backend needs: userId, idToken, data

export const adminAddData = async (
  idToken: string,
  submitData: FinalDataToBackend
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin`, submitData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error sending the data: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
