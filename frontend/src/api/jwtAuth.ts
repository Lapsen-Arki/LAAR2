import axios from "axios";

// THIS FUNCTION IS RETURNING ONLY: TRUE, FALSE OR "emailNotVerified"

// For testing: Move to env variables:
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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

    // Returning true if status 200
    return response.status === 200 ? "success" : "error";
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error: ", error.response.data);
      if (error.response.data.error === "emailNotVerified") {
        return "emailNotVerified";
      }
      return "error";
    }
    throw error;
  }
};
