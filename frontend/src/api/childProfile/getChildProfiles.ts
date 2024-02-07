import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
}

const getChildProfiles = async (idToken: string | null) => {
  try {
    console.log("Haetaan profiileja...");
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
    const response = await axios.get<ChildProfile[]>(
      `${API_BASE_URL}/profiles`,
      config
    );
    console.log("Profiilit haettu onnistuneesti:", response.data);

    // Tallenna profiilit Session Storageen, jos ne ovat muuttuneet
    updateSessionStorage(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Profiilien hakeminen epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe profiileja haettaessa:", error);
    throw error;
  }
};

const updateSessionStorage = (profiles: ChildProfile[]) => {
  const storedProfilesJson = sessionStorage.getItem("childProfiles");
  const storedProfiles = storedProfilesJson
    ? JSON.parse(storedProfilesJson)
    : [];

  // Vertaa haettuja profiileja tallennettuihin
  if (JSON.stringify(profiles) !== JSON.stringify(storedProfiles)) {
    console.log("Profiilit ovat muuttuneet, päivitetään Session Storage");
    sessionStorage.setItem("childProfiles", JSON.stringify(profiles));
  }
};

export { getChildProfiles };
