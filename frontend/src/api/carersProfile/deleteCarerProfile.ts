import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

interface CarerProfile {
  id: string;
  email: string;
  name: string;
}

const deleteCarerProfile = async (
  carerId: string,
  idToken: string | null,
  profiles: CarerProfile[],
  setProfiles: React.Dispatch<React.SetStateAction<CarerProfile[]>>
) => {
  try {
    // Lähetä DELETE-pyyntö backendiin käyttäen axiosia ja oikeaa idTokenia
    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };
    await axios.delete(`${API_BASE_URL}/carer/${carerId}`, config);

    // Päivitä frontend uusilla profiileilla
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== carerId
    );
    setProfiles(updatedProfiles);

    // Päivitä myös Session Storage poistamalla poistettu profiili
    const storedProfilesJson = sessionStorage.getItem("carerProfiles");
    if (storedProfilesJson) {
      const storedProfiles = JSON.parse(storedProfilesJson) as CarerProfile[];
      const updatedStoredProfiles = storedProfiles.filter(
        (profile) => profile.id !== carerId
      );
      sessionStorage.setItem(
        "carerProfiles",
        JSON.stringify(updatedStoredProfiles)
      );
    }
  } catch (error) {
    console.error("Profiilin poisto epäonnistui", error);
  }
};

export default deleteCarerProfile;
