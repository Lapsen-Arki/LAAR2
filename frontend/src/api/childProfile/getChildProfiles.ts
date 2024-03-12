import axios from "axios";
import { ChildProfile } from "../../types/typesFrontend";
import { getSubscriptionStatus } from "../stripeSubscriptions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getChildProfiles = async (idToken: string | null) => {
  try {
    const subStatus = await getSubscriptionStatus(idToken);
    if (subStatus) {
      let profiles: ChildProfile[] = [];

      // Tarkista ensin Session Storage
      const storedProfilesJson = sessionStorage.getItem("childProfiles");
      if (storedProfilesJson) {
        profiles = JSON.parse(storedProfilesJson);
      } else {
        // Jos ei ole tallennettu Session Storagessa, haetaan tietokannasta
        const config = {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        };
        const response = await axios.get<ChildProfile[]>(
          `${API_BASE_URL}/profiles`,
          config
        );
        profiles = response.data;
        // Tallenna profiilit Session Storageen
        sessionStorage.setItem("childProfiles", JSON.stringify(profiles));
      }

      return profiles;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Profiilien hakeminen epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe profiileja haettaessa:", error);
    throw error;
  }
};

export { getChildProfiles };
