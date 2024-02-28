import axios from "axios";
import { getCarerProfile } from "./getCarerProfile";
import { CarerProfile } from "../../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface InviteAccountToProfileData {
  accountEmail: string;
}

// updateSessionStorage funktion määrittely
const updateSessionStorage = (profiles: CarerProfile[]) => {
  sessionStorage.setItem("carerProfiles", JSON.stringify(profiles));
};

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

    // Tarkista, että uusi käyttäjä on lisätty tietokantaan onnistuneesti
    if (response.status === 200) {
      // Hakee kutsutun käyttäjän tiedot getCarerProfile APIlla.
      const newCarerProfile = await getCarerProfile(idToken, true);

      // Päivittää Session Storage uusilla tiedoilla (kutsu funktion updateSessionStorage täällä)
      updateSessionStorage(newCarerProfile);
    }

    return { data: response.data, status: response.status };
  } catch (error) {
    //console.error("Kutsu hoitajaksi -virhe:", error);

    if (axios.isAxiosError(error) && error.response) {
      if (process.env.NODE_ENV !== "production") {
        //console.error("Kutsu hoitajaksi virhe:", error);
      }

      if (typeof error.response.data === "string") {
        return { error: error.response.data, status: error.response.status };
      } else if (typeof error.response.data === "object") {
        return {
          error: JSON.stringify(error.response.data),
          status: error.response.status,
        };
      } else {
        return { error: error.response.data, status: error.response.status };
      }
    }
    throw error;
  }
};

export { getCarerProfile, updateSessionStorage };
