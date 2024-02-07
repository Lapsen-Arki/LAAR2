import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";

const startSubscription = async (idToken : string | null, userId : string | undefined) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/start-subscription/${userId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default startSubscription;
