import axios from "axios";

// For testing: Move to env variables:
const API_BASE_URL = "http://localhost:3000/api";

export const jwtAuth = async (idToken: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error: ", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
