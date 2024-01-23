import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

interface ChildProfile {
    id: string;
    accessRights: boolean;
    avatar: string;
    birthdate: string;
    childName: string;
}

export const getProfiles = async () => {
    try {
        console.log("Haetaan profiileja...");
        const response = await axios.get<ChildProfile[]>(`${API_BASE_URL}/profiles`);
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
