import React from 'react';
import { Card, CardContent, Typography, Tooltip, Avatar } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { calculateAge, splitNameToFitWidth } from './profileFunctions';
import { useProfileUtils } from '../../customHooks/useProfileUtils';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';

const CarerChildComponent: React.FC = () => {
  const { carerChildProfiles } = useProfileUtils();

  return (
    <div style={{ flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Hoidettavat lapset:
      </Typography>
      {carerChildProfiles.length === 0 ? (
        <div className="Carer">
          <Card className="Carer-cards">
            <CardContent className="Carer-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Sinua ei ole kutsuttu hoitajaksi">
                  <HelpOutlineIcon
                    sx={{
                      fontSize: 40,
                      color: "white",
                      borderRadius: "50%",
                      backgroundColor: "#63c8cc",
                    }}
                  />
                </Tooltip>
                <Typography variant="h6" gutterBottom sx={{ marginLeft: "10px" }}>
                  Sinua ei ole kutsuttu hoitajaksi
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="children">
          {carerChildProfiles.map((profile) => (
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
                <CardContent className="card-content">
                  <Typography component="div" variant="h6" className="multiline-text">
                    {splitNameToFitWidth(profile.childName, 14)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {calculateAge(new Date(profile.birthdate)).age}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {calculateAge(new Date(profile.birthdate)).birthdayWish}
                  </Typography>
                  <Tooltip title="Hoitaja">
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <PersonIcon sx={{ marginRight: '2px' }} /> {profile.creatorName}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Sähköpostiosoite">
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <AlternateEmailIcon sx={{ marginRight: '2px' }} /> {profile.creatorEmail}
                    </Typography>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarerChildComponent;