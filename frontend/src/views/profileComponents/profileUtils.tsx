import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from "../../contexts/tokenContext";
import { getChildProfiles } from '../../api/childProfile/getChildProfiles';
import { getCarerProfile } from '../../api/carersProfile/getCarerProfile';
import deleteChildProfile from '../../api/childProfile/deleteChildProfile';
import { ChildProfile, CarerProfile } from "../../../src/types/types";

export function useProfileUtils() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [confirmedDelete, setConfirmedDelete] = useState(false); // Tila vahvistetun poiston seuraamiseksi

  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [carerProfiles, setCarerProfiles] = useState<CarerProfile[]>([]);

  useEffect(() => {
    if (!idToken) {
      console.error('JWT token puuttuu');
      setOpenLoginModal(true);
      return;
    }

    const fetchProfilesFromSessionStorage = () => {
      const storedProfilesJson = sessionStorage.getItem('childProfiles');
      if (storedProfilesJson) {
        return JSON.parse(storedProfilesJson) as ChildProfile[];
      }
      return null;
    };

    const fetchProfilesFromServer = async () => {
      console.log('Haetaan profiileja palvelimelta...');
      const response = await getChildProfiles(idToken);
      if (!('error' in response)) {
        sessionStorage.setItem('childProfiles', JSON.stringify(response));
        setChildProfiles(response);
      } else {
        console.error('Virhe profiilien haussa:', response.error);
      }
    };

    const fetchProfiles = async () => {
      const storedProfiles = fetchProfilesFromSessionStorage();
      if (storedProfiles) {
        console.log('Käytetään Session Storagessa olevia profiileja');
        setChildProfiles(storedProfiles);
      } else {
        await fetchProfilesFromServer();
      }
    };

    const fetchCarerProfiles = async () => {
      const storedCarerProfilesJson = sessionStorage.getItem('carerProfiles');
      if (storedCarerProfilesJson) {
        setCarerProfiles(JSON.parse(storedCarerProfilesJson));
      } else {
        try {
          const carerProfiles = await getCarerProfile(idToken, true);
          sessionStorage.setItem('carerProfiles', JSON.stringify(carerProfiles));
          setCarerProfiles(carerProfiles);
        } catch (error) {
          console.error('Virhe hoitajaprofiilien haussa:', error);
        }
      }
    };

    fetchProfiles();
    fetchCarerProfiles();
  }, [idToken]);

  const handleClickDeleteProfile = async (profileId: string) => {
    setSelectedProfileId(profileId);
    setConfirmationDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (selectedProfileId) {
      try {
        if (confirmationDialogOpen) { // Varmista, että vahvistusikkuna on avoinna
          setConfirmationDialogOpen(false); // Sulje vahvistusikkuna
          setConfirmedDelete(true); // Aseta vahvistuksen tila todeksi
          if (confirmedDelete) { // Tarkista, onko poisto vahvistettu
            setSelectedProfileId(null); // Tyhjennä valittu profiili
            await deleteChildProfile(selectedProfileId, idToken, childProfiles, setChildProfiles); // Suorita poisto
          }
        }
      } catch (error) {
        console.error('Profiilin poisto epäonnistui', error);
      }
    }
  };

  const handleEditClick = (profileId: string) => {
    navigate(`/profile-edit/${profileId}`);
  };

  const handleAddProfileClick = () => {
    navigate('/profile-edit');
  };

  const handleAddCarersClick = () => {
    navigate('/profile-share');
  };

  return {
    openLoginModal,
    setOpenLoginModal,
    childProfiles,
    carerProfiles,
    setConfirmationDialogOpen,
    confirmationDialogOpen,
    selectedProfileId,
    handleClickDeleteProfile,
    handleDeleteConfirmed,
    handleEditClick,
    handleAddProfileClick,
    handleAddCarersClick
  };
}