import axios from "axios";

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

    const response = await axios.post(
      `${API_BASE_URL}/inviteAccountToProfile`,
      { accountEmail: data.accountEmail },
      config
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Käsittele virheet, mutta älä tulosta niitä konsoliin tuotantotilassa
      if (process.env.NODE_ENV !== 'production') {
        console.error("Kutsu hoitajaksi virhe:", error);
      }

      if (typeof error.response.data === 'string') {
        // Käsittele virheet ja palauta viesti käyttäjälle
        return { error: error.response.data, status: error.response.status };
      } else if (typeof error.response.data === 'object') {
        // Käsittele virheet ja palauta viesti käyttäjälle
        return { error: JSON.stringify(error.response.data), status: error.response.status };
      } else {
        // Käsittele virheet ja palauta viesti käyttäjälle
        return { error: error.response.data, status: error.response.status };
      }
    }
    // Heitä virhe eteenpäin, jos se ei ole Axios-virhe tai ei sisällä vastausta
    throw error;
  }
};
