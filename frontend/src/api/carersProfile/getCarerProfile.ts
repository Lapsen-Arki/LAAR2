import axios from "axios";
import { CarerProfile } from "../../../src/types/types";

const API_BASE_URL = "http://localhost:3000/api";

const getCarerProfile = async (idToken: string | null, shouldFetchNewData: boolean): Promise<CarerProfile[] | never> => {
  try {
    // Tarkista ensin session storage
    if (!shouldFetchNewData) {
      const storedProfilesJson = sessionStorage.getItem("carerProfiles");
      if (storedProfilesJson) {
        console.log("Hoitajaprofiilit löytyivät Session Storagessa:", JSON.parse(storedProfilesJson));
        return JSON.parse(storedProfilesJson) as CarerProfile[];
      }
    }

    console.log("Haetaan hoitajaprofiileja palvelimelta...");
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    };
    const response = await axios.get<CarerProfile[]>(`${API_BASE_URL}/carers`, config);
    console.log("Hoitajaprofiilit haettu onnistuneesti:", response.data);

    // Tallenna hoitajaprofiilit Session Storageen, jos ne ovat muuttuneet
    updateSessionStorage(response.data);

    return response.data;
  } catch (error) {
    console.error("Virhe hoitajaprofiileja hakiessa:", error);
    if (axios.isAxiosError(error)) {
      // Heitä virhe eteenpäin selkeällä virhesanomalla
      throw new Error(error.response?.data || "Hoitajaprofiilien haku epäonnistui");
    } else {
      // Heitä yleinen virhe, jos virhe ei ole Axios-virhe
      throw new Error("Yleinen virhe hoitajaprofiileja hakiessa");
    }
  }
};

const updateSessionStorage = (profiles: CarerProfile[]) => {
  sessionStorage.setItem("carerProfiles", JSON.stringify(profiles));
  console.log("Hoitajaprofiilit tallennettu Session Storageen:", profiles);
};

export { getCarerProfile, updateSessionStorage };