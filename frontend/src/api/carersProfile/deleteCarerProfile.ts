import axios from 'axios';
import { CarerProfile } from "../../types/typesFrontend";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const deleteCarerProfile = async (
    carerId: string,
    idToken: string | null,
    profiles: CarerProfile[],
    setProfiles: React.Dispatch<React.SetStateAction<CarerProfile[]>>
  ) => {
    try {
      //console.log('Lähetetään DELETE-pyyntö hoitajaprofiilin poistamiseksi. Hoitajan ID:', carerId); // console log
      // Lähetä DELETE-pyyntö backendiin käyttäen axiosia ja oikeaa idTokenia
      const config = {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      };
      //console.log('Pyyntö-otsikot:', config.headers); // console log
      
      await axios.delete(`${API_BASE_URL}/carer/${carerId}`, config);
      //const response = await axios.delete(`${API_BASE_URL}/carer/${carerId}`, config);  // jos käytät alempaa testausta, vaaditaan tämän käyttöönotto.
      //console.log('DELETE-pyyntö hoitajaprofiilin poistamiseksi onnistui. Vastaus:', response.data); // console log
      
      // Päivitä frontend uusilla profiileilla
      const updatedProfiles = profiles.filter(
        (profile) => profile.receiverUid !== carerId
      );
      setProfiles(updatedProfiles);
      //console.log('Profiilit päivitetty frontendissä.'); // console log
    
      // Päivitä myös Session Storage poistamalla poistettu profiili
      const storedProfilesJson = sessionStorage.getItem("carerProfiles");
      if (storedProfilesJson) {
        const storedProfiles = JSON.parse(storedProfilesJson) as CarerProfile[];
        const updatedStoredProfiles = storedProfiles.filter(
          (profile) => profile.receiverUid !== carerId
        );
        sessionStorage.setItem(
          "carerProfiles",
          JSON.stringify(updatedStoredProfiles)
        );
        //console.log('Session Storage päivitetty.'); // console log
      }
    } catch (error) {
      console.error('Profiilin poisto epäonnistui', error);
    }
  };  
  
  export default deleteCarerProfile;
