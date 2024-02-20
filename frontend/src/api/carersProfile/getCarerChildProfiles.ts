import axios from "axios";
import { CarerChildProfile } from "../../types/typesFrontend";
import makeChildObject from "../../utils/makeChildObject";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const getCarerChildProfiles = async () => {
  try {
    const idToken = localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
    if (!idToken) {
      console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
      return [];
    }

    // Suoraan API-kutsu filtteröityjen profiilien hakemiseen
    const response = await axios.get<{ carerChildProfiles: CarerChildProfile[] }>(
      `${API_BASE_URL}/getCarerChildProfiles`, {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );

    const profiilit = response.data.carerChildProfiles;

    // Tallennetaan haetut profiilit Session Storageen
    sessionStorage.setItem("childProfiles", JSON.stringify(profiilit));
    makeChildObject();

    return profiilit;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };