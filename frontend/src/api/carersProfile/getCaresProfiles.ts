import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

const getCaresProfiles = async (idToken: string | null) => {
  try {
    console.log("Haetaan hoitajaprofiileja...");
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    };
    const response = await axios.get<UserProfile[]>(`${API_BASE_URL}/cares`, config);
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

const updateSessionStorage = (profiles: UserProfile[]) => {
  const storedProfilesJson = sessionStorage.getItem("careProfiles");
  const storedProfiles = storedProfilesJson ? JSON.parse(storedProfilesJson) : [];

  // Vertaa haettuja hoitajaprofiileja tallennettuihin
  if (JSON.stringify(profiles) !== JSON.stringify(storedProfiles)) {
    console.log("Hoitajaprofiilit ovat muuttuneet, päivitetään Session Storage");
    sessionStorage.setItem("careProfiles", JSON.stringify(profiles));
  }
};

export { getCaresProfiles };