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

const updateSessionStorageWithProfile = (profile: ChildProfile) => {
  const storedProfilesJson = sessionStorage.getItem("childProfiles");
  const storedProfiles = storedProfilesJson
    ? (JSON.parse(storedProfilesJson) as ChildProfile[])
    : [];

  // Etsi ja päivitä profiili, jos se on jo tallennettu
  const index = storedProfiles.findIndex((p) => p.id === profile.id);
  if (index !== -1) {
    storedProfiles[index] = profile;
  } else {
    storedProfiles.push(profile);
  }

  sessionStorage.setItem("childProfiles", JSON.stringify(storedProfiles));
};

export const getChildProfileById = async (
  id: string,
  idToken: string | null
) => {
  try {
    console.log(`Haetaan profiilia ID:llä ${id}...`);
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
    const response = await axios.get<ChildProfile>(
      `${API_BASE_URL}/profile/${id}`,
      config
    );
    console.log("Profiili haettu onnistuneesti:", response.data);

    // Tallenna tai päivitä profiili Session Storageen
    updateSessionStorageWithProfile(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Profiilin hakeminen epäonnistui:", error.response.data);
      return { error: error.response.data };
    }
    console.error("Virhe profiilia haettaessa:", error);
    throw error;
  }
};
