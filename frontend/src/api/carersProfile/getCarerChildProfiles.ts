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

    // Haetaan Session Storagesta vanhat tiedot
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    let existingProfiles: CarerChildProfile[] = [];
    if (storedProfilesJson) {
      existingProfiles = JSON.parse(storedProfilesJson) as CarerChildProfile[];
    }

    // Suoraan API-kutsu filtteröityjen profiilien hakemiseen
    const response = await axios.get<{ carerChildProfiles: CarerChildProfile[] }>(
      `${API_BASE_URL}/getCarerChildProfiles`, {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );

    const newProfiles = response.data.carerChildProfiles;

    // Lisätään vain ne uudet profiilit, joita ei ole jo olemassa
    const uniqueProfiles = newProfiles.filter(profile => !existingProfiles.some(existingProfile => existingProfile.id === profile.id));

    // Yhdistetään vanhat ja uudet profiilit
    const combinedProfiles = [...existingProfiles, ...uniqueProfiles];

    // Tallennetaan yhdistetyt profiilit Session Storageen
    sessionStorage.setItem("childProfiles", JSON.stringify(combinedProfiles));

    makeChildObject();

    return combinedProfiles;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };