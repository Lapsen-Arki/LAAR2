import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const getSubscription = async (idToken : string | null, userId : string | undefined) => {
  try {
	console.log("client api - fetching response")
    const response = await axios.post(
      `${API_BASE_URL}/get-subscription/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
	console.log("client api - response fetched")
    return response.data;
  } catch (error) {
	console.log("client api - error tapahtui")
    throw error;
  }
};

export default getSubscription;
