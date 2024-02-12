import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const cancelSubscription = async (idToken: string | null) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cancel-subscription/${idToken}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default cancelSubscription;
