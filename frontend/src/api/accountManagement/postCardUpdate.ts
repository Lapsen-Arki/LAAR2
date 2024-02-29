const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const postCardUpdate = async (
  action: string,
  idToken: string,
  cardId: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ action, cardId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating card:", error);
    return { status: false, msg: "Error updating card" };
  }
};
