import axios from "axios";
import { CarerProfile } from "../../types/typesFrontend";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://localhost:3000/api";

const getCarerProfile = async (
  idToken: string | null,
  shouldFetchNewData: boolean
): Promise<CarerProfile[]> => {
  try {
    // Tarkista ensin session storage
    if (!shouldFetchNewData) {
      const storedProfilesJson = sessionStorage.getItem("carerProfiles");
      if (storedProfilesJson) {
        return JSON.parse(storedProfilesJson) as CarerProfile[];
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
    const response = await axios.get<CarerProfile[]>(
      `${API_BASE_URL}/carers`,
      config
    );

    // Tallenna hoitajaprofiilit Session Storageen, jos ne ovat muuttuneet
    updateSessionStorage(response.data);

    return response.data;
  } catch (error) {
    //console.error("Virhe hoitajaprofiileja hakiessa:", error);
    // Palauta tyhjä taulukko, jos hoitajaprofiileja ei ole
    return [];
  }
};

const updateSessionStorage = (profiles: CarerProfile[]) => {
  sessionStorage.setItem("carerProfiles", JSON.stringify(profiles));
};

export { getCarerProfile, updateSessionStorage };
