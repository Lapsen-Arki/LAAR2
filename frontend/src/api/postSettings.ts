const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const postSettings = async (settings: FormData, idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/edit-account`, {
      method: "POST",
      body: settings,
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
