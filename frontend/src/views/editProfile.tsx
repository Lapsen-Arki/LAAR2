import React from "react";
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editProfile.css';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AnimalAvatarWidget from '../components/AnimalAvatarWidget.tsx';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Avatar,
  Switch,
  Button,
  Alert,
  Box,
  Tooltip,
} from "@mui/material";

import PleaseLoginModal from "../components/modals/pleaseLoginModal.tsx";
import { TokenContext } from "../contexts/tokenContext";
import { createChildProfile } from '../api/childProfile/createChildProfile.ts';
import { editChildProfile } from '../api/childProfile/editChildProfile.ts';
import { getChildProfileById } from '../api/childProfile/getChildProfileById.ts';

interface ChildProfile {
  id: string;
  childName: string;
  birthdate: string; // Päivämäärä on nyt merkkijono "YYYY-MM-DD"
  avatar: string;
  accessRights: boolean;
  creatorId: string;
}

const EditProfile = () => {
  const { id } = useParams();
  const [showAnimalAvatar, setShowAnimalAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [childName, setChildName] = useState('');
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null); // Muutettu käyttämään Date-objektia
  const [nameError, setNameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [accessRights, setAccessRights] = useState(false);
  const navigate = useNavigate();
  const { idToken } = useContext(TokenContext);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  // Tyhjä merkkijono, jos id ei ole määritetty URL:ssä
  console.log(id)
  const profileId = id || '';

  // Etsii ja palauttaa lapsiprofiilin Session Storagesta annetun ID:n perusteella.
  // Jos profiilia ei löydy, palauttaa null.
  const findProfileInSessionStorage = (profileId: string): ChildProfile | null => {
    const storedProfilesJson = sessionStorage.getItem('childProfiles');
    if (!storedProfilesJson) return null;
    
    const storedProfiles: ChildProfile[] = JSON.parse(storedProfilesJson);
    return storedProfiles.find(p => p.id === profileId) || null;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (profileId) {
          console.log('Haetaan profiilin tiedot ID:llä:', profileId);

          // Ensin yritetään löytää profiili Session Storagesta
          const profileDataFromStorage = findProfileInSessionStorage(profileId);
          
          if (profileDataFromStorage) {
            console.log('Käytetään Session Storagessa olevaa profiilia:', profileDataFromStorage);
            setChildName(profileDataFromStorage.childName);
            setBirthdate(profileDataFromStorage.birthdate ? dayjs(profileDataFromStorage.birthdate, "YYYY-MM-DD") : null);
            setSelectedAvatar(profileDataFromStorage.avatar);
            setAccessRights(profileDataFromStorage.accessRights);
          } else {
            // Jos ei löydy Session Storagesta, haetaan palvelimelta
            const profileData: ChildProfile | { error: Error } = await getChildProfileById(profileId, idToken);
            if ('childName' in profileData) {
              console.log('Haettu profiilin tiedot:', profileData);
              setChildName(profileData.childName);
              setBirthdate(profileData.birthdate ? dayjs(profileData.birthdate, "YYYY-MM-DD") : null);
              setSelectedAvatar(profileData.avatar);
              setAccessRights(profileData.accessRights);
            } else {
              console.error('Virheellinen profiilidata', profileData.error);
            }
          }
        }
      } catch (error) {
        console.error('Tietojen haku epäonnistui', error);
      }
    };

    fetchProfileData();
  }, [profileId, idToken]);

  // Tarkista, onko käyttäjä kirjautunut
  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  const handleShowAnimalAvatar = () => {
    setShowAnimalAvatar(true);
  };

  const handleAvatarSelect = (avatar: string | null) => {
    setSelectedAvatar(avatar);
    setShowAnimalAvatar(false);
  };

  const handleSave = async () => {
    // Tarkista, onko nimi tai syntymäaika tyhjä ja aseta virheviesti tarvittaessa
    if (!childName) setNameError('Tämä kenttä on pakollinen');
    else setNameError('');

    if (!birthdate) setBirthdateError('Tämä kenttä on pakollinen');
    else setBirthdateError('');

    if (childName && birthdate) {
      const userData = {
        id: profileId,
        childName,
        birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
        avatar: selectedAvatar || '/broken-image.jpg',
        accessRights,
        creatorId: idToken,
      };

      try {
        if (profileId) {
          // Tarkista, onko ID määritelty
          await editChildProfile(userData, idToken);
        } else {
          // Jos ID:tä ei ole määritelty, luo uusi profiili
          await createChildProfile(userData, idToken);
        }
        console.log('Profiili tallennettu onnistuneesti:', userData);
        navigate('/profile');
      } catch (error) {
        console.error('Profiilin tallennus epäonnistui', error);
      }
    } else {
      console.error('Puuttuvia tietoja tallennuksessa');
    }
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="profile-container">
      {/* Lomakkeen sisältö */}
      <div className="profile-modification">
        <form>
          {/* Lapsen nimi -kenttä */}
          <div className="input-group editProfile">
            <h3>Lapsen nimi tai lempinimi</h3>
            <input type="text" id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} maxLength={14} />
            {nameError && <Alert severity="error">{nameError}</Alert>}
          </div>

          {/* Syntymäaika -kenttä */}
          <div className="input-group editProfile">
            <h3>Lapsen syntymäaika</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={birthdate} onChange={(newDate) => setBirthdate(newDate ? dayjs(newDate) : null)} />
            </LocalizationProvider>
            {birthdateError && <Alert severity="error">{birthdateError}</Alert>}
          </div>

          {/* Avatarin valinta */}
          <div className="input-group editProfile editProfileAvatar">
            <h3>Valitse lapselle avatar</h3>
            {showAnimalAvatar ? (
              <AnimalAvatarWidget onSelect={handleAvatarSelect} />
            ) : selectedAvatar ? (
              <Avatar src={selectedAvatar}
              sx={{
                borderRadius: '50%',
                backgroundColor: '#90c2c5',
              }} />
            ) : (
              <Avatar src="/broken-image.jpg"
              sx={{
                borderRadius: '50%',
                backgroundColor: '#90c2c5',
              }} />
            )}
            {showAnimalAvatar ? null : (
              <Tooltip title="Valitse kuva">
              <Button variant="contained" className="custom-button" onClick={handleShowAnimalAvatar}>Valitse kuva</Button>
              </Tooltip>
            )}
          </div>

          {/* Pääsyoikeudet -kytkin */}
          <div className="input-group editProfile">
            <h5>Tarvitsetko pääsyoikeudet myös muille ihmisille?</h5>
            <div className="switch-group">
              <span>Ei</span>
              <Switch checked={accessRights} onChange={() => setAccessRights(!accessRights)} />
              <span>Kyllä</span>
            </div>
          </div>

          {/* Tallennus- ja paluupainikkeet */}
          <Box sx={{ marginTop: 5 }}>
            <div className="input-group editProfile">
            <Tooltip title="Takaisin profiiliin">
              <Button variant="contained" className="custom-button editProfile" onClick={handleNavigateToProfile}>
                <ArrowBackIosIcon /> Takaisin
              </Button>
              </Tooltip>

            <Tooltip title="Tallenna profiili">
              <Button variant="contained" className="custom-button" onClick={handleSave}>Tallenna</Button>
              </Tooltip>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;