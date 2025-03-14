const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const postSettings = async (settings: object, idToken: string) => {
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
      return { status: false, message: data.message };
    }
  } catch (error) {
    console.error(error);
  }
};

export default postSettings;
