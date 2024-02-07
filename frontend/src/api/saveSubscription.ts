import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";

const saveSubscription = async (idToken : string | null, subId : string | undefined) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/save-subscription/${subId}`,
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

export default saveSubscription;
