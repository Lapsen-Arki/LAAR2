import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

interface ChildProfile {
    id: string;
    accessRights: boolean;
    avatar: string;
    birthdate: string;
    childName: string;
    creatorId: string;
}

export const getProfiles = async (idToken: string | null) => {
    try {
        console.log("Haetaan profiileja...");
        const config = {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        };
        const response = await axios.get<ChildProfile[]>(`${API_BASE_URL}/profiles`, config);
        console.log("Profiilit haettu onnistuneesti:", response.data);
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

export const getProfileById = async (id: string, idToken: string | null) => {
    try {
        console.log(`Haetaan profiilia ID:llä ${id}...`);
        const config = {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        };
        const response = await axios.get<ChildProfile>(`${API_BASE_URL}/profiles/${id}`, config);
        console.log("Profiili haettu onnistuneesti:", response.data);
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
