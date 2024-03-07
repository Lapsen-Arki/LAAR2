const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postDeleteAccount = async (idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
