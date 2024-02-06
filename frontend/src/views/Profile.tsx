import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import PleaseLoginModal from "../components/modals/pleaseLoginModal";
import { TokenContext } from "../contexts/tokenContext";
import { getChildProfiles } from '../api/childProfile/getChildProfiles';
import deleteChildProfile from '../api/childProfile/deleteChildProfile';
import { getCaresProfiles } from '../api/carersProfile/getCaresProfiles';

import { calculateAge, splitNameToFitWidth } from './utils/profileUtils';
import ConfirmationDialog from './utils/profileConfirmationDialog';

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  creatorId: string;
}

interface CareProfile {
  id: string;
  email: string;
  name: string;
}

export default function Profile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [careProfiles, setCareProfiles] = useState<CareProfile[]>([]); // Lisää hoitajien profiilit
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const fetchProfilesFromSessionStorage = () => {
    const storedProfilesJson = sessionStorage.getItem('childProfiles');
    if (storedProfilesJson) {
      return JSON.parse(storedProfilesJson) as ChildProfile[];
    }
    return null;
  };

  useEffect(() => {
    if (!idToken) {
      console.error('JWT token puuttuu');
      setOpenLoginModal(true);
      return;
    }

    const fetchProfilesFromServer = async () => {
      console.log('Haetaan profiileja palvelimelta...');
      const response = await getChildProfiles(idToken);
      if (!('error' in response)) {
        sessionStorage.setItem('storedProfiles', JSON.stringify(response));
        setProfiles(response);
      } else {
        console.error('Virhe profiilien haussa:', response.error);
      }
    };

    // Alusta hoitajien profiilit käyttäen getCaresProfiles-funktiota
    const fetchCareProfiles = async () => {
      try {
        const careProfilesResponse = await getCaresProfiles(idToken);
        if (!('error' in careProfilesResponse)) {
          setCareProfiles(careProfilesResponse);
        } else {
          console.error('Virhe hoitajien haussa:', careProfilesResponse.error);
        }
      } catch (error) {
        console.error('Virhe hoitajien haussa:', error);
      }
    };
  
    const fetchProfiles = async () => {
      const storedProfiles = fetchProfilesFromSessionStorage();
      if (storedProfiles) {
        console.log('Käytetään Session Storagessa olevia profiileja');
        setProfiles(storedProfiles);
      } else {
        await fetchProfilesFromServer();
      }
      await fetchCareProfiles(); // Haetaan hoitajien profiilit
    };
  
    fetchProfiles();
  }, [idToken]);

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  console.log("Renderöidään profiilisivu, profiilit:", profiles);

  const handleClickDelete = async (profileId: string) => {
    setSelectedProfileId(profileId);
    setConfirmationDialogOpen(true);
  };
  
  const handleDeleteConfirmed = async () => {
    if (selectedProfileId) {
      try {
        // Lisää tyyppiannotaatiot profiles ja setProfiles parametreille
        await deleteChildProfile(selectedProfileId, idToken, profiles, setProfiles);
        setSelectedProfileId(null);
      } catch (error) {
        console.error('Profiilin poisto epäonnistui', error);
      }
    }
    setConfirmationDialogOpen(false);
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

  return (
    <div className="profile-container">
  <div className="profile-view">

    <ConfirmationDialog
      open={confirmationDialogOpen}
      onClose={() => setConfirmationDialogOpen(false)}
      onConfirm={handleDeleteConfirmed}
    />

    {/* Otsikkorivi painikkeille */}
    <div className="buttons-header">
      <Tooltip title="Lisää profiili">
        <Button variant="contained" className="custom-button" onClick={handleAddProfileClick}>
          Lisää profiili
        </Button>
      </Tooltip>
      <Tooltip title="Kutsu hoitaja">
        <Button variant="contained" className="custom-button Carer" onClick={handleAddCarersClick}>
          Kutsu hoitaja
        </Button>
      </Tooltip>
      {/* Tyhjä tila tai näkymätön painike joka täyttää kolmannen painikkeen paikan */}
      <div className="custom-button-placeholder"></div>
    </div>

          <Box className="profiles">
            <div style={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Lapset:
              </Typography>

                {/* Ei profiileja */}
                {profiles.length === 0 ? (
                  <div className="cards-wrap">
                    <Card className="children-card" sx={{ height: '111px' }} >
                    <Tooltip title="Profiileja ei ole vielä luotu">
                    <HelpOutlineIcon sx={{ fontSize: 40, color: 'white', borderRadius: '50%', backgroundColor: '#63c8cc', marginLeft: '16px' }} />
                    </Tooltip>
                      <Box className="card-content">
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                            Profiileja ei ole vielä luotu
                        </Typography>
                      </Box>
                    </Card>
                  </div>
                ) : (
              <div className="children">
                {/* Profiileja */}
                {profiles.map((profile) => (
                  <div className="cards-wrap" key={profile.id}>

                    <Card className="children-card">
                      <Avatar
                        className="card-avatar"
                        src={profile.avatar || '/broken-image.jpg'}
                        sx={{
                          borderRadius: '50%',
                          backgroundColor: '#90c2c5',
                        }}
                      />
                      
                      <Box className="card-content">
                        <Typography component="div" variant="h6" className="multiline-text">
                          {splitNameToFitWidth(profile.childName, 14)}
                        </Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {calculateAge(new Date(profile.birthdate)).age}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {calculateAge(new Date(profile.birthdate)).birthdayWish}
                        </Typography>


                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {`Pääsy muilla: ${profile.accessRights ? 'Kyllä' : 'Ei'}`}
                        </Typography>
                      </Box>

                      <div className="card-icons">
                        <Tooltip title="Muokkaa profiilia">
                          <IconButton color="primary" aria-label="Edit" onClick={() => handleEditClick(profile.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Poista profiili">
                          <IconButton color="error" aria-label="Delete" onClick={() => handleClickDelete(profile.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Hoitajat:
            </Typography>

            {/* Ei hoitajia */}
            {careProfiles.length === 0 ? (
              <div className="cards-wrap">
                <Card className="children-card" sx={{ height: '111px' }}>
                  <Tooltip title="Hoitajia ei ole vielä lisätty">
                    <HelpOutlineIcon sx={{ fontSize: 40, color: 'white', borderRadius: '50%', backgroundColor: '#63c8cc', marginLeft: '16px' }} />
                  </Tooltip>
                  <Box className="card-content">
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      Hoitajia ei ole vielä lisätty
                    </Typography>
                  </Box>
                </Card>
              </div>
            ) : (
              <div className="children">
                {/* Hoitajat */}
                {careProfiles.map((profile) => (
                  <div className="cards-wrap" key={profile.id}>
                    <Card className="children-card">
                      
                      <Box className="card-content">
                        <Typography component="div" variant="h6" className="multiline-text">
                          {profile.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {profile.email}
                        </Typography>
                        {/* Voit lisätä muita hoitajan tietoja tarpeen mukaan */}
                      </Box>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>

            <div style={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Hoidettavat lapset:
              </Typography>
              <div className="Carer">
                <Card className="Carer-cards">
                  <CardContent className="Carer-content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="Sinua ei ole kutsuttu hoitajaksi">
                        <HelpOutlineIcon sx={{ fontSize: 40, color: 'white', borderRadius: '50%', backgroundColor: '#63c8cc' }} />
                      </Tooltip>
                      <Typography variant="h6" gutterBottom sx={{ marginLeft: '10px' }}>
                        Sinua ei ole kutsuttu hoitajaksi
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
          </Box>

        </div>
      </div>
    );
  }