import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
}

const deleteChildProfile = async (profileId: string, idToken: string | null, profiles: ChildProfile[], setProfiles: React.Dispatch<React.SetStateAction<ChildProfile[]>>) => {
  try {
    // Lähetä DELETE-pyyntö backendiin käyttäen axiosia ja oikeaa idTokenia
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    };
    await axios.delete(`${API_BASE_URL}/profile/${profileId}`, config);
    
    // Päivitä frontend uusilla profiileilla
    const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
    setProfiles(updatedProfiles);

    // Päivitä myös Session Storage poistamalla poistettu profiili
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    if (storedProfilesJson) {
      const storedProfiles = JSON.parse(storedProfilesJson) as ChildProfile[];
      const updatedStoredProfiles = storedProfiles.filter((profile) => profile.id !== profileId);
      sessionStorage.setItem("childProfiles", JSON.stringify(updatedStoredProfiles));
    }
  } catch (error) {
    console.error('Profiilin poisto epäonnistui', error);
  }
};

export default deleteChildProfile;
