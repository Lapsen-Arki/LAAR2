import axios from "axios";

// TODO: Move to env variables etc:
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface EditChildProfileData {
  id: string;
  childName: string;
  birthdate: string;
  avatar: string;
  accessRights: boolean;
  creatorId: string | null;
}

export const editChildProfile = async (
  data: EditChildProfileData,
  idToken: string | null
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/editChildProfile/${data.id}`,
      data,
      config
    );

    // Päivitä Session Storage
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    const storedProfiles = storedProfilesJson
      ? (JSON.parse(storedProfilesJson) as EditChildProfileData[])
      : [];
    const index = storedProfiles.findIndex((profile) => profile.id === data.id);
    if (index !== -1) {
      storedProfiles[index] = data;
      sessionStorage.setItem("childProfiles", JSON.stringify(storedProfiles));
    }

    //console.log("Profiili tallennettu onnistuneesti:", data);
    // Päivitä Session Storage manuaalisesti
    const updatedStoredProfilesJson = JSON.stringify(storedProfiles);
    window.sessionStorage.setItem("childProfiles", updatedStoredProfilesJson);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Editing child profile error:", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
