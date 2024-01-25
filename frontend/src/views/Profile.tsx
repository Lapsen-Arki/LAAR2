import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { getProfiles } from '../api/getProfiles';
import deleteProfile from '../api/deleteProfile';

// kalenteri näytetään oikein, huomioiden synttärit ja karkausvuodet
function calculateAge(birthdate: Date): string {
  if (!birthdate) return '';

  const today = new Date();
  const birthDate = new Date(birthdate);

  if (
    birthDate.getDate() === today.getDate() &&
    birthDate.getMonth() === today.getMonth()
  ) {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Huomioi karkausvuodet

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? 'v' : 'v';
    const monthLabel = months === 1 ? 'kk' : 'kk';
    const dayLabel = days === 1 ? 'pv' : 'pv';

    return `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}, Hyvää Syntymäpäivää! 🥳🎈`;
  }

  if (birthDate.getTime() > today.getTime()) {
    // Syntymäpäivä on tulevaisuudessa
    const timeDifference = birthDate.getTime() - today.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.floor(timeDifference / millisecondsInDay);
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const yearsRemaining = Math.floor(monthsRemaining / 12);

    return `Syntymään jäljellä: ${yearsRemaining}v ${monthsRemaining % 12}kk ${daysRemaining % 30}pv`;
  }

  const ageInMilliseconds = today.getTime() - birthDate.getTime();
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Huomioi karkausvuodet

  const years = Math.floor(ageInYears);
  const monthsInMilliseconds = (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
  const months = Math.floor(monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12)));
  const daysInMilliseconds = monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
  const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

  const yearLabel = years === 1 ? 'v' : 'v';
  const monthLabel = months === 1 ? 'kk' : 'kk';
  const dayLabel = days === 1 ? 'pv' : 'pv';

  return `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
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
}

export default function Profile() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getProfiles();
        if ('error' in response) {
          console.error('Virhe profiilien haussa', response.error);
        } else {
          setProfiles(response);
        }
      } catch (error) {
        console.error('Virhe profiilien haussa', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleClickDelete = async (profileId: string) => {
    setSelectedProfileId(profileId);
    setConfirmationDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (selectedProfileId) {
      await deleteProfile(selectedProfileId, profiles, setProfiles);
      setSelectedProfileId(null);
    }
    setConfirmationDialogOpen(false);
  };

  const handleEditClick = (profileId: string) => {
    navigate(`/profile-edit/${profileId}`);
  };

  const handleAddProfileClick = () => {
    navigate('/profile-edit');
  };

  return (
    <div className="profile-container">
      <div className="profile-view">
        <Button variant="contained" sx={{ mx: 'auto', display: 'block', marginBottom: 3 }} className="custom-button" onClick={handleAddProfileClick}>
          Lisää profiili
        </Button>

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

        {/* Profiilit */}
        <Box className="profiles">
          <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Lapset:
            </Typography>

            <div className="children">
              {profiles.map((profile) => (
                <div className="cards-wrap" key={profile.id}>

                  <Card className="children-card">
                    <Avatar
                      className="card-avatar"
                      src={profile.avatar || '/broken-image.jpg'}
                      alt="Avatar"
                    />
                    
                    <Box className="card-content">
                      <Typography component="div" variant="h6" className="multiline-text">
                        {splitNameToFitWidth(profile.childName, 14)}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {calculateAge(new Date(profile.birthdate))}
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
          </div>

          <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Hoitajat:
            </Typography>
            <div className="carer">

              <Card className="carer-cards">
                <CardContent className="cards-content">
                  <Typography component="div" variant="h6">
                    Kortti1
                  </Typography>
                  <div>
                    <Tooltip title="Muokkaa profiilia">
                      <IconButton color="primary" aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Poista profiili">
                      <IconButton color="error" aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>

              <Card className="carer-cards">
                <CardContent className="cards-content">
                  <Typography component="div" variant="h6">
                    Kortti2
                  </Typography>
                  <div>
                    <Tooltip title="Muokkaa profiilia">
                      <IconButton color="primary" aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Poista profiili">
                      <IconButton color="error" aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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