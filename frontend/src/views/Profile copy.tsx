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

import { getProfiles } from '../api/getProfiles';

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

//nimen rivinvaihtaja
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

  const handleAddProfileClick = () => {
    navigate('/profile-edit');
  };

  return (
<div className="profile-container">
      <div className="profile-view">
        <Button variant="contained" sx={{ mx: 'auto', display: 'block', marginBottom: 3 }} className="custom-button" onClick={handleAddProfileClick}>
          Lisää profiili
        </Button>

        <Box className="profiles" style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Lapset:
            </Typography>

            <div className="children" style={{ display: 'flex', flexDirection: 'column' }}>
              {profiles.map((profile) => (
                <div key={profile.childName} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <Card sx={{ width: 430, height: 'auto', display: 'flex', alignItems: 'center', marginRight: 2 }}>
                  <Avatar
                    sx={{ flex: 0.2, width: 40, height: 40, marginLeft: '10px', marginRight: '10px' }}
                    src={profile.avatar || '/broken-image.jpg'}
                    alt="Avatar"
                  />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
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

                    <div style={{ flex: 0.2 }}>
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
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Hoitajat:
            </Typography>
            <div className="carer">
              <Card sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
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
              <Card sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
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
              {/* Voit lisätä kortteja Hoitajat-osioon tarvittaessa */}
            </div>
          </div>
        </Box>
      </div>
    </div>

  );
}