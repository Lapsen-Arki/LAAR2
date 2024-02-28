import axios from "axios";
import { CarerChildProfile } from "../../types/typesFrontend";
import makeChildObject from "../../utils/makeChildObject";
import { jwtAuth } from "../jwtAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getCarerChildProfiles = async () => {
  try {
    const idToken =
      localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
    if (!idToken) {
      console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
      return [];
    }

    // Käytetään jwtAuth-funktiota idTokenin tarkistamiseen
    const authStatus = await jwtAuth(idToken);
    if (authStatus !== "success") {
      console.error(
        "ID-tokenin tarkistus epäonnistui tai käyttäjä ei ole kirjautunut."
      );
      return [];
    }

    let existingProfiles: CarerChildProfile[] = [];

    // Tarkista ensin, onko profiileja jo olemassa Session Storagessa
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    if (storedProfilesJson) {
      existingProfiles = JSON.parse(storedProfilesJson) as CarerChildProfile[];
    } else {
      // Jos Session Storagessa ei ole profiileja, tee tietokantahaku
      const response = await axios.get<{
        carerChildProfiles: CarerChildProfile[];
      }>(`${API_BASE_URL}/getCarerChildProfiles`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      const newProfiles = response.data.carerChildProfiles;

      if (newProfiles && newProfiles.length > 0) {
        existingProfiles = newProfiles;
        sessionStorage.setItem(
          "childProfiles",
          JSON.stringify(existingProfiles)
        );
        makeChildObject();
      } else {
        console.log("Uusia profiileja ei löytynyt.");
      }
    }

    return existingProfiles;
  } catch (error) {
    console.error("Virhe profiileja haettaessa:", error);
    return [];
  }
};

export { getCarerChildProfiles };
