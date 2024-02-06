import axios from "axios";

// TODO: Move to env variables etc:
const API_BASE_URL = "http://localhost:3000/api";

interface InviteAccountToProfileData {
  accountEmail: string;
}

export const inviteAccountToProfile = async (
  data: InviteAccountToProfileData,
  idToken: string | null
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    console.log("Lähetä kutsupyyntö tietoineen:", data); // Tarkistus
    const response = await axios.post(
      `${API_BASE_URL}/inviteAccountToProfile`,
      { accountEmail: data.accountEmail }, // Muokkaa tietorakenne yhteensopivaksi
      config
    );

    console.log("Kutsupyynnönvastaus:", response.data); // Tarkistus
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (typeof error.response.data === 'string') {
        console.error("Tilin kutsuessa profiiliin error:", error.response.data);
      } else if (typeof error.response.data === 'object') {
        console.error("Tilin kutsuessa profiiliin error:", JSON.stringify(error.response.data));
      } else {
        console.error("Tilin kutsuessa profiiliin error:", error.response.data);
      }
      return { error: error.response.data };
    }
    throw error;
  }
};