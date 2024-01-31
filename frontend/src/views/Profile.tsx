import React from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import PleaseLoginModal from "../components/pleaseLoginModal";
import { TokenContext } from "../contexts/tokenContext";
import { getProfiles } from '../api/getProfiles';
import deleteProfile from '../api/deleteProfile';

// kalenteri näytetään oikein, huomioiden synttärit ja karkausvuodet
function calculateAge(birthdate: Date): { age: string, birthdayWish?: string } {
  if (!birthdate) return { age: '' };

  const today = new Date();
  const birthDate = new Date(birthdate);
  const result: { age: string, birthdayWish?: string } = { age: '' };

  if (
    birthDate.getDate() === today.getDate() &&
    birthDate.getMonth() === today.getMonth()
  ) {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? 'v' : 'v';
    const monthLabel = months === 1 ? 'kk' : 'kk';
    const dayLabel = days === 1 ? 'pv' : 'pv';

    result.age = `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
    result.birthdayWish = 'Hyvää Syntymäpäivää! 🥳🎈';
  } else if (birthDate.getTime() > today.getTime()) {
    const timeDifference = birthDate.getTime() - today.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.floor(timeDifference / millisecondsInDay);
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const yearsRemaining = Math.floor(monthsRemaining / 12);

    result.age = `Syntymään jäljellä: ${yearsRemaining}v ${monthsRemaining % 12}kk ${daysRemaining % 30}pv`;
  } else {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? 'v' : 'v';
    const monthLabel = months === 1 ? 'kk' : 'kk';
    const dayLabel = days === 1 ? 'pv' : 'pv';

    result.age = `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
  }

  return result;
}

// nimen rivinvaihtaja
function splitNameToFitWidth(name: string, maxLineLength: number) {
  let result = '';
  let lineLength = 0;

  name.split(' ').forEach(word => {
    if (lineLength + word.length > maxLineLength) {
      result += '\n';
      lineLength = 0;
    }

    result += word + ' ';
    lineLength += word.length + 1; // +1 for the space
  });

  return result.trim();
}

interface ChildProfile {
  id: string;
  accessRights: boolean;
  avatar: string;
  birthdate: string;
  childName: string;
  userId: string;
}

export default function Profile() {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!idToken) {
        console.error("JWT token puuttuu");
        return;
      }

      try {
        console.log("Haetaan profiileja...");
        const response = await getProfiles(idToken);
        console.log("Profiilit haettu onnistuneesti:", response);

        if ('error' in response) {
          console.error('Virhe profiilien haussa:', response.error);
        } else {
          setProfiles(response);
        }
      } catch (error) {
        console.error('Virhe profiilien haussa:', error);
      }
    };

    if (idToken) {
      fetchProfiles();
    }
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
        await deleteProfile(selectedProfileId, idToken, profiles, setProfiles);
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
        <Dialog
          open={confirmationDialogOpen}
          onClose={() => setConfirmationDialogOpen(false)}
        >
          <DialogTitle>Oletko varma että haluat poistaa profiilin?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tämä toiminto poistaa profiilin pysyvästi.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmationDialogOpen(false)}
              color="primary"
            >
              Ei
            </Button>
            <Button
              onClick={handleDeleteConfirmed}
              color="error"
            >
              Kyllä
            </Button>
          </DialogActions>
        </Dialog>

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
                        alt="Avatar"
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