import axios from "axios";
import { ChildProfile } from "../../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const getCarerChildProfiles = async () => {
  try {
    const idToken = localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
    if (!idToken) {
      console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
      return [];
    }

    const response = await axios.get<{ carerChildProfiles: ChildProfile[] }>(
      `${API_BASE_URL}/getCarerChildProfiles`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const profiilit = response.data.carerChildProfiles;
    console.log("Haetut profiilit:", profiilit);
    return profiilit;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };
