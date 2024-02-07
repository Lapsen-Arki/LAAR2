import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

interface CarerProfile {
  id: string;
  email: string;
  name: string;
}

const getCarerProfile = async (idToken: string | null) => {
  try {
    // Tarkista ensin session storage
    const storedProfilesJson = sessionStorage.getItem("careProfiles");
    if (storedProfilesJson) {
      console.log("Hoitajaprofiilit löytyivät Session Storagessa");
      return JSON.parse(storedProfilesJson) as CarerProfile[];
    }

    console.log("Haetaan hoitajaprofiileja palvelimelta...");
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    };
    const response = await axios.get<CarerProfile[]>(`${API_BASE_URL}/cares`, config);
    console.log("Hoitajaprofiilit haettu onnistuneesti:", response.data);

    // Tallenna hoitajaprofiilit Session Storageen, jos ne ovat muuttuneet
    updateSessionStorage(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Hoitajaprofiilien haku epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe hoitajaprofiileja hakiessa:", error);
    throw error;
  }
};

const updateSessionStorage = (profiles: CarerProfile[]) => {
  sessionStorage.setItem("careProfiles", JSON.stringify(profiles));
  console.log("Hoitajaprofiilit tallennettu Session Storageen");
};

export { getCarerProfile };