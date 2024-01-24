import { useState, useEffect } from 'react';
import './Profile.css';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Avatar from '@mui/material/Avatar';
import AnimalAvatarWidget from '../components/AnimalAvatarWidget.tsx';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { editProfile } from '../api/editProfilePost.ts';
import { getProfileById } from '../api/getProfiles';

interface ChildProfile {
  id: string;
  childName: string;
  birthdate: string; // Päivämäärä on nyt merkkijono "YYYY-MM-DD"
  avatar: string;
  accessRights: boolean;
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

  // Tyhjä merkkijono, jos id ei ole määritetty URL:ssä
  console.log(id)
  const profileId = id || '';

  useEffect(() => {
    // Haetaan valitun profiilin tiedot, kun komponentti latautuu
    const fetchProfileData = async () => {
      try {
        if (profileId) {
          console.log('Haetaan profiilin tiedot ID:llä:', profileId);
          const profileData: ChildProfile | { error: Error } = await getProfileById(profileId);
          if ('childName' in profileData) {
            console.log('Haettu profiilin tiedot:', profileData);
            setChildName(profileData.childName);
            
            // Muunnetaan saatu päivämäärä dayjs-objektiksi
            const birthdateFromApi = profileData.birthdate ? dayjs(profileData.birthdate, "YYYY-MM-DD") : null;
            setBirthdate(birthdateFromApi);

            setSelectedAvatar(profileData.avatar);
            setAccessRights(profileData.accessRights);
          } else {
            console.error('Virheellinen profiilidata', profileData.error);
          }
        }
      } catch (error) {
        console.error('Tietojen haku epäonnistui', error);
      }
    };

    fetchProfileData();
  }, [profileId]);

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
      try {
        const userData = {
          id: profileId,
          childName,
          birthdate: dayjs(birthdate).format("YYYY-MM-DD"), // Muunna takaisin merkkijonoksi tallennusta varten
          avatar: selectedAvatar || '/broken-image.jpg',
          accessRights,
        };

        // Luo uusi profiili tai päivitä olemassa oleva
        await editProfile(userData);
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
          <div className="input-group">
            <h3>Lapsen nimi tai lempinimi</h3>
            <input type="text" id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} maxLength={14} />
            {nameError && <Alert severity="error">{nameError}</Alert>}
          </div>

          {/* Syntymäaika -kenttä */}
          <div className="input-group">
            <h3>Lapsen syntymäaika</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={birthdate} onChange={(newDate) => setBirthdate(newDate ? dayjs(newDate) : null)} />
            </LocalizationProvider>
            {birthdateError && <Alert severity="error">{birthdateError}</Alert>}
          </div>

          {/* Avatarin valinta */}
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Valitse lapselle avatar</h3>
            {showAnimalAvatar ? (
              <AnimalAvatarWidget onSelect={handleAvatarSelect} />
            ) : selectedAvatar ? (
              <Avatar src={selectedAvatar} />
            ) : (
              <Avatar src="/broken-image.jpg" />
            )}
            {showAnimalAvatar ? null : (
              <Button variant="contained" className="custom-button" onClick={handleShowAnimalAvatar}>Valitse kuva</Button>
            )}
          </div>

          {/* Pääsyoikeudet -kytkin */}
          <div className="input-group">
            <h5>Tarvitsetko pääsyoikeudet myös muille ihmisille?</h5>
            <div className="switch-group">
              <span>Ei</span>
              <Switch checked={accessRights} onChange={() => setAccessRights(!accessRights)} />
              <span>Kyllä</span>
            </div>
          </div>

          {/* Tallennus- ja paluupainikkeet */}
          <Box sx={{ marginTop: 5 }}>
            <div className="input-group">
              <Button variant="contained" className="custom-button" onClick={handleNavigateToProfile} sx={{ marginRight: 3 }}>
                <ArrowBackIosIcon /> Takaisin
              </Button>
              <Button variant="contained" className="custom-button" onClick={handleSave}>Tallenna</Button>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;