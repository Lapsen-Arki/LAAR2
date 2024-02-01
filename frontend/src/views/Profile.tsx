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

export default function Profile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
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
  
    const fetchProfiles = async () => {
      const storedProfiles = fetchProfilesFromSessionStorage();
      if (storedProfiles) {
        console.log('Käytetään Session Storagessa olevia profiileja');
        setProfiles(storedProfiles);
      } else {
        await fetchProfilesFromServer();
      }
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="Lisää profiili">
            <Button variant="contained" className="custom-button" onClick={handleAddProfileClick}>Lisää profiili</Button>
          </Tooltip>
          
          <Tooltip title="Lisää hoitaja">
            <Button variant="contained" className="custom-button" onClick={handleAddCarersClick}>Lisää hoitaja</Button>
          </Tooltip>
        </div>

        {/* Varmistusdialogi */}
        <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />

          <Box className="profiles">
            <div style={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Lapset:
              </Typography>

                {/* Ei profiileja */}
                {profiles.length === 0 ? (
                  <div className="cards-wrap">
                    <Card className="children-card" sx={{ height: '100px' }} >
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
              <div className="carer">
                <Card className="carer-cards">
                  <CardContent className="cards-content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="Hoitajia ei ole vielä lisätty">
                        <HelpOutlineIcon sx={{ fontSize: 40, color: 'white', borderRadius: '50%', backgroundColor: '#63c8cc' }} />
                      </Tooltip>
                      <Typography variant="h6" gutterBottom sx={{ marginLeft: '10px' }}>
                        Hoitajia ei ole vielä lisätty
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