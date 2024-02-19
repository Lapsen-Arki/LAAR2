import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { getCarerChildProfiles } from '../../api/carersProfile/getCarerChildProfiles';
import { calculateAge, splitNameToFitWidth } from './profileFunctions';

const CarerChildComponent: React.FC = () => {
  const [carerChildProfiles, setCarerChildProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiles = await getCarerChildProfiles();
        setCarerChildProfiles(profiles);
      } catch (error) {
        console.error("Virhe profiileja haettaessa:", error);
      }
    };

    fetchData();
  }, []);

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
          {carerChildProfiles.map((profile: any) => (
            <div className="cards-wrap" key={profile.id}>
              <Card className="children-card">
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

                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {`Huoltaja: ${profile.creatorName}`}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {`Sähköposti: ${profile.creatorEmail}`}
                  </Typography>
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