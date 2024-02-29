import axios from "axios";
import { CarerChildProfile } from "../../types/typesFrontend";
import makeChildObject from "../../utils/makeChildObject";
import { jwtAuth } from "../jwtAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getCarerChildProfiles = async () => {
    try {
      // Hankitaan idToken localStoragesta tai sessionStoragesta
      const idToken = localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
      if (!idToken) {
        console.error("ID-tokenia ei löydy, käyttäjä ei ole kirjautunut.");
        return [];
      }
  
      // Oletetaan, että jwtAuth-funktion toteutus on olemassa ja se tarkistaa tokenin validiteetin
      const authStatus = await jwtAuth(idToken); // Kutsutaan jwtAuth oikealla idTokenilla
      if (authStatus !== "success") {
        console.error("ID-tokenin tarkistus epäonnistui tai käyttäjä ei ole kirjautunut.");
        return [];
      }
  
      let existingProfiles: CarerChildProfile[] = [];
  
      // Tarkista ensin, onko profiileja jo olemassa Session Storagessa
      const storedProfilesJson = sessionStorage.getItem("childProfiles");
      if (storedProfilesJson) {
        existingProfiles = JSON.parse(storedProfilesJson);
      }
  
      // Suoraan API-kutsu profiilien hakemiseen
      const response = await axios.get<{ carerChildProfiles: CarerChildProfile[] }>(`${API_BASE_URL}/getCarerChildProfiles`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
  
      const newProfiles = response.data.carerChildProfiles;

    // Tarkistetaan, onko uusia profiileja löydetty
    if (!newProfiles || newProfiles.length === 0) {
      //("Profiileja ei ole vielä lisätty.");
      return [];
    }
  
      // Lisätään vain ne uudet profiilit, joita ei ole jo olemassa
      const uniqueProfiles = newProfiles.filter(newProfile => 
        !existingProfiles.some(existingProfile => existingProfile.id === newProfile.id)
      );
  
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
