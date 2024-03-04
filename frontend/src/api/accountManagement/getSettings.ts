const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getSettings = async (idToken: string) => {
  try {
    const data = await fetch(`${API_BASE_URL}/get-account-settings`, {
      method: "GET", // Assuming you're making a GET request
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    return error;
  }
};

export default getSettings;
