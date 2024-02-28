const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const postSettings = async (settings: FormData, idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post-account-settings`, {
      method: "POST",
      body: JSON.stringify(settings),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    return error;
  }
};

export default postSettings;
