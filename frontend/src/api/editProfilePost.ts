import axios from "axios";

// TODO: Move to env variables etc:
const API_BASE_URL = "http://localhost:3000/api";

interface EditProfileData {
  childName: string;
  birthdate: string;
  avatar: string;
  accessRights: boolean;
}

export const editProfile = async (data: EditProfileData) => {
  try {
    console.log("Sending editProfile request with data:", data); // Lisää tämä console.log-pyyntö

    const response = await axios.post(`${API_BASE_URL}/editProfile`, data);

    console.log("Response from editProfile:", response.data); // Lisää tämä console.log-vastaus

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Editing profile error: ", error.response.data);
      return { error: error.response.data };
    }
    console.error("Error in editProfile:", error); // Lisää tämä console.log-virhe
    throw error;
  }
};
