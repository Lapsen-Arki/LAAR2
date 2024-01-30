import axios from "axios";

// TODO: Move to env variables etc:
const API_BASE_URL = "http://localhost:3000/api";

interface EditProfileData {
  id: string;
  childName: string;
  birthdate: string;
  avatar: string;
  accessRights: boolean;
  userId: string | null;
}

export const editProfile = async (data: EditProfileData, idToken: string | null) => {
  try {
    console.log("Sending editProfile request with data:", data);

    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    };

    const response = await axios.post(`${API_BASE_URL}/editProfile`, data, config);

    console.log("Response from editProfile:", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Editing profile error: ", error.response.data);
      return { error: error.response.data };
    }
    console.error("Error in editProfile:", error);
    throw error;
  }
};
