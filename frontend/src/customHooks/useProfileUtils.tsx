import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../contexts/tokenContext";
import { getChildProfiles } from "../api/childProfile/getChildProfiles";
import { getCarerProfile } from "../api/carersProfile/getCarerProfile";
import { getCarerChildProfiles } from '../api/carersProfile/getCarerChildProfiles';
import deleteChildProfile from "../api/childProfile/deleteChildProfile";
import deleteCarerProfile from '../api/carersProfile/deleteCarerProfile';
import { ChildProfile, CarerProfile, CarerChildProfile } from "../types/typesFrontend";

export function useProfileUtils() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedCarerId, setSelectedCarerId] = useState<string | null>(null);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [carerProfiles, setCarerProfiles] = useState<CarerProfile[]>([]);
  const [carerChildProfiles, setCarerChildProfiles] = useState<CarerChildProfile[]>([]);

  useEffect(() => {
    if (!idToken) {
      console.error("JWT token puuttuu");
      setOpenLoginModal(true);
      return;
    }
/*
    const fetchProfilesFromSessionStorage = () => {
      const storedProfilesJson = sessionStorage.getItem("childProfiles");
      if (storedProfilesJson) {
        return JSON.parse(storedProfilesJson) as ChildProfile[];
      }
      return null;
    };
*/

    const fetchProfilesFromSessionStorage = () => {
      const storedProfilesJson = sessionStorage.getItem("childProfiles");
      if (storedProfilesJson) {
        const profiles = JSON.parse(storedProfilesJson) as CarerChildProfile[];
        // Suodata pois profiilit, joissa on creatorName ja creatorEmail
        const filteredProfiles = profiles.filter(profile => !profile.creatorName && !profile.creatorEmail);
        return filteredProfiles;
      }
      return null;
    };

    const fetchProfilesFromServer = async () => {
      //console.log('Haetaan profiileja palvelimelta...');
      const response = await getChildProfiles(idToken);
      if (!("error" in response)) {
        sessionStorage.setItem("childProfiles", JSON.stringify(response));
        setChildProfiles(response);
      } else {
        console.error("Virhe profiilien haussa:", response.error);
      }
    };

    const fetchProfiles = async () => {
      const storedProfiles = fetchProfilesFromSessionStorage();
      if (storedProfiles) {
        //console.log('Käytetään Session Storagessa olevia profiileja');
        setChildProfiles(storedProfiles);
      } else {
        await fetchProfilesFromServer();
      }
    };

    const fetchCarerProfiles = async () => {
      const storedCarerProfilesJson = sessionStorage.getItem("carerProfiles");
      if (storedCarerProfilesJson) {
        setCarerProfiles(JSON.parse(storedCarerProfilesJson));
      } else {
        try {
          const carerProfiles = await getCarerProfile(idToken, true);
          sessionStorage.setItem(
            "carerProfiles",
            JSON.stringify(carerProfiles)
          );
          setCarerProfiles(carerProfiles);
        } catch (error) {
          console.error("Virhe hoitajaprofiilien haussa:", error);
        }
      }
    };

    /* HOIDETTAVAT LAPSET PROFIILI, Lyhennys sit myöhemmi */
    
    const fetchCarerChildProfiles = async () => {
      try {
        // Tarkista, onko profiileja jo tallennettu Session Storageen "childProfiles" alle
        const storedProfilesJson = sessionStorage.getItem("childProfiles");
        let profiles: CarerChildProfile[] = [];
    
        if (storedProfilesJson) {
          // Jos profiileja on olemassa, jäsennä ne Session Storagesta
          profiles = JSON.parse(storedProfilesJson) as CarerChildProfile[];
    
          // Suodata pois profiilit ilman creatorNamea ja creatorEmailia
          const filteredProfiles = profiles.filter(profile => profile.creatorName && profile.creatorEmail);
    
          // Jos suodatettuja profiileja ei löydy, haetaan palvelimelta
          if (filteredProfiles.length === 0) {
            const response = await getCarerChildProfiles();
            if (!("error" in response)) {
              profiles = response;
    
              // Yhdistä olemassa olevat profiilit ja poista duplikaatit
              const combinedProfiles = [...profiles, ...filteredProfiles].filter((profile, index, array) =>
                index === array.findIndex(p => (p.id === profile.id))
              );
    
              // Päivitä Session Storage yhdistetyillä profiileilla
              sessionStorage.setItem("childProfiles", JSON.stringify(combinedProfiles));
              // Päivitä tila uusilla yhdistetyillä profiileilla
              setCarerChildProfiles(combinedProfiles);
            } else {
              console.error("Virhe profiilien haussa:", response.error);
            }
          } else {
            // Päivitä tila suodatetuilla profiileilla, jos ne jo löytyvät Session Storagesta
            setCarerChildProfiles(filteredProfiles);
          }
        } else {
          // Jos profiileja ei ole tallennettu, haetaan ne palvelimelta
          const response = await getCarerChildProfiles();
          if (!("error" in response)) {
            profiles = response.data.carerChildProfiles
    
            // Suodata pois profiilit ilman creatorNamea ja creatorEmailia
            const filteredProfiles = profiles.filter(profile => profile.creatorName && profile.creatorEmail);
    
            // Tallenna suodatetut profiilit Session Storageen ja päivitä tila
            sessionStorage.setItem("childProfiles", JSON.stringify(filteredProfiles));
            setCarerChildProfiles(filteredProfiles);
          } else {
            console.error("Virhe profiilien haussa:", response.error);
          }
        }
      } catch (error) {
        console.error("Virhe profiileja haettaessa:", error);
      }
    };
    

    fetchProfiles();
    fetchCarerProfiles();
    fetchCarerChildProfiles();
  }, [idToken]);

  
  const handleDeleteConfirmed = async () => {
    if (!selectedProfileId && !selectedCarerId) return;
  
    let deletionSuccess = false; // Lisätään muuttuja onnistumisen seurantaan
  
    try {
      if (selectedProfileId) {
        await deleteChildProfile(selectedProfileId, idToken, childProfiles, setChildProfiles);
        setSelectedProfileId(null);
        deletionSuccess = true; // Asetetaan true, jos poisto onnistuu
      } else if (selectedCarerId) {
        await deleteCarerProfile(selectedCarerId, idToken, carerProfiles, setCarerProfiles);
        setSelectedCarerId(null);
        deletionSuccess = true; // Asetetaan true, jos poisto onnistuu
      }
    } catch (error) {
      console.error('Profiilin poisto epäonnistui', error);
      deletionSuccess = false; // Asetetaan false, jos poisto epäonnistuu
      return; // Lopetetaan suoritus, jos poisto epäonnistuu
    } finally {
      setConfirmationDialogOpen(false);
      // Tarkistetaan, oliko poisto onnistunut, ennen kuin näytetään onnistumisviesti
      if (deletionSuccess) {
        //console.log(selectedProfileId ? 'childProfiles Profiili poistettu onnistuneesti.' : 'carerProfiles Profiili poistettu onnistuneesti.');
      }
    }
  };
  
  const handleClickDeleteProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setConfirmationDialogOpen(true);
  };
  
  const handleClickDeleteCarer = (carerId: string) => {
    setSelectedCarerId(carerId);
    setConfirmationDialogOpen(true);
  };
  
  const cancelDelete = () => {
    setConfirmationDialogOpen(false);
  };
  
  const handleEditClick = (profileId: string) => {
    navigate(`/profile-edit/${profileId}`);
  };

  const handleAddProfileClick = () => {
    navigate("/profile-edit");
  };

  const handleAddCarersClick = () => {
    navigate("/profile-share");
  };

  return {
    openLoginModal,
    setOpenLoginModal,
    childProfiles,
    carerProfiles,
    carerChildProfiles,
    setConfirmationDialogOpen,
    confirmationDialogOpen,
    selectedProfileId,
    handleClickDeleteProfile,
    handleClickDeleteCarer,
    handleDeleteConfirmed,
    cancelDelete,
    handleEditClick,
    handleAddProfileClick,
    handleAddCarersClick,
  };
}