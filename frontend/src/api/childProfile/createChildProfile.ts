import axios from "axios";
import makeChildObject from "../../utils/makeChildObject";
import { CreateChildProfileData } from "../../types/typesFrontend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createChildProfile = async (
  data: CreateChildProfileData,
  idToken: string | null
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/createChildProfile`,
      data,
      config
    );

    // Lisää uusi profiili Session Storageen
    const newProfile = { ...data, id: response.data.id }; // Oletetaan, että palvelin palauttaa uuden profiilin ID:n
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    const storedProfiles = storedProfilesJson
      ? (JSON.parse(storedProfilesJson) as CreateChildProfileData[])
      : [];
    storedProfiles.push(newProfile);
    sessionStorage.setItem("childProfiles", JSON.stringify(storedProfiles));
    makeChildObject();

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Creating child profile error:", error.response.data);
      return { error: error.response.data };
    }
    throw error;
  }
};
