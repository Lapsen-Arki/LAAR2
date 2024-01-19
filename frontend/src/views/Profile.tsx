import React, { useState } from 'react';
import './Profile.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Profile = () => {
  // Esimerkki profiilitiedoista
  const [profiles, setProfiles] = useState([
    // { name: 'Nimi', birthdate: 'Syntymäaika', avatar: 'Avatar URL' },
  ]);

  // Esimerkki tapahtumankäsittelijöistä
  const handleAddProfileClick = () => {
    // Lisää profiili logiikka
  };

  const handleEditClick = (index) => {
    // Muokkaa profiilia logiikka
  };

  const handleRemoveProfileClick = (index) => {
    // Poista profiili logiikka
  };

  const calculateAge = (birthdate) => {
    // Laske ikä syntymäajasta
    return 'Ikä';
  };

  return (
    <div className="profile-view">
      <div className="input-group">
        <Button variant="contained" className="custom-button" onClick={handleAddProfileClick}>
          Lisää profiili
        </Button>
      </div>

      <label>Lapset:</label>
      <div className="children">
        {profiles.map((profile, index) => (
          <Card key={index}>
            <CardContent className="card-content">
              <div className="avatar-section">
                <Avatar src={profile.avatar} className="avatar" />
              </div>
              <div className="text-section">
                <Typography variant="h5">{profile.name}</Typography>
                <Typography variant="body2">{calculateAge(profile.birthdate)}</Typography>
              </div>
              <div className="edit-icon-section">
                <Tooltip title="Muokkaa profiilia">
                  <Button
                    variant="text"
                    className="edit-button"
                    onClick={() => handleEditClick(index)}
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Poista profiili">
                  <Button
                    variant="text"
                    className="remove-button"
                    onClick={() => handleRemoveProfileClick(index)}
                  >
                    <RemoveCircleOutlineIcon />
                  </Button>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

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

export default Profile;