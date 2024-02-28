import axios from "axios";
import { ChildProfile } from "../../types/typesFrontend";
import makeChildObject from "../../utils/makeChildObject";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deleteChildProfile = async (
  profileId: string,
  idToken: string | null,
  profiles: ChildProfile[],
  setProfiles: React.Dispatch<React.SetStateAction<ChildProfile[]>>
) => {
  try {
    // Lähetä DELETE-pyyntö backendiin käyttäen axiosia ja oikeaa idTokenia
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
    await axios.delete(`${API_BASE_URL}/profile/${profileId}`, config);

    // Päivitä frontend uusilla profiileilla
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== profileId
    );
    setProfiles(updatedProfiles);

    // Päivitä myös Session Storage poistamalla poistettu profiili
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    if (storedProfilesJson) {
      const storedProfiles = JSON.parse(storedProfilesJson) as ChildProfile[];
      const updatedStoredProfiles = storedProfiles.filter(
        (profile) => profile.id !== profileId
      );
      sessionStorage.setItem(
        "childProfiles",
        JSON.stringify(updatedStoredProfiles)
      );
      makeChildObject();
    }
  } catch (error) {
    console.error("Profiilin poisto epäonnistui", error);
  }
};

export default deleteChildProfile;
