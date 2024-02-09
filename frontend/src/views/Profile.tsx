import '../styles/Profile.css';
import {
  Button,
  Box,
  Tooltip,
} from "@mui/material";

import { useProfileUtils } from './profileComponents/profileUtils';
import InvitedCarersComponent from './profileComponents/invitedCarers';
import MyChildComponent from './profileComponents/myChild';
import CarerChildComponent from './profileComponents/carerChild';

export default function Profile() {
  const {
    handleAddProfileClick,
    handleAddCarersClick
  } = useProfileUtils();

  return (
    <div className="profile-container">
      <div className="profile-view">

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

          <MyChildComponent />
          <InvitedCarersComponent />
          <CarerChildComponent />
          
        </Box>
      </div>
    </div>
  );
}
