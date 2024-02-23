import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const stripeSubscription = async (
  idToken: string | null,
  route: string // the action that will be done: fetch, cancel or start
) => {
  const response = await axios.post(
    `${API_BASE_URL}/${route}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

export default stripeSubscription;
