import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
}

const deleteProfile = async (profileId: string, profiles: ChildProfile[], setProfiles: React.Dispatch<React.SetStateAction<ChildProfile[]>>) => {
  try {
    // Lähetä DELETE-pyyntö backendiin käyttäen axiosia
    await axios.delete(`${API_BASE_URL}/profiles/${profileId}`);
    // Päivitä frontend uusilla profiileilla
    const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
    setProfiles(updatedProfiles);
  } catch (error) {
    console.error('Profiilin poisto epäonnistui', error);
  }
};

export default deleteProfile;
