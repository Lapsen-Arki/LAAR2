import axios from "axios";
import { CarerChildProfile } from "../../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const getCarerChildProfiles = async () => {
  try {
    const idToken = localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
    if (!idToken) {
      console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
      return [];
    }

    const response = await axios.get<{ carerChildProfiles: CarerChildProfile[] }>(
      `${API_BASE_URL}/getCarerChildProfiles`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const profiilit = response.data.carerChildProfiles;

    // Haetaan olemassa olevat profiilit Session Storagesta
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    let existingProfiles: CarerChildProfile[] = [];
    if (storedProfilesJson) {
      existingProfiles = JSON.parse(storedProfilesJson);
    }

    // Lisätään vain ne profiilit, joiden ID:tä ei vielä ole olemassa
    const uniqueProfiles = profiilit.filter(profile => !existingProfiles.some(existingProfile => existingProfile.id === profile.id));
    const updatedProfiles = [...existingProfiles, ...uniqueProfiles];

    // Tallennetaan päivitetyt profiilit Session Storageen
    sessionStorage.setItem("childProfiles", JSON.stringify(updatedProfiles));

    return uniqueProfiles;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };



/* DP TOIMII, ÄLÄ MUUTA!!!!!!:

import axios from "axios";
import { CarerChildProfile } from "../../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const getCarerChildProfiles = async () => {
  try {
    const idToken = localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
    if (!idToken) {
      console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
      return [];
    }

    const response = await axios.get<{ carerChildProfiles: CarerChildProfile[] }>(
      `${API_BASE_URL}/getCarerChildProfiles`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const profiilit = response.data.carerChildProfiles;
    //("Haetut profiilit:", profiilit);
    return profiilit;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };
*/
