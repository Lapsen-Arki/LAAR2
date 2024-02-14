import { useState, useContext } from 'react';
import '../styles/Profile.css';
import {
  Button,
  Box,
  Tooltip,
} from "@mui/material";

import { TokenContext } from "../contexts/tokenContext";
import PleaseLoginModal from "../components/modals/pleaseLoginModal.tsx";

import { useProfileUtils } from '../customHooks/useProfileUtils.tsx';
import InvitedCarersComponent from '../components/profileComponents/invitedCarers.tsx';
import MyChildComponent from '../components/profileComponents/myChild.tsx';
import CarerChildComponent from '../components/profileComponents/carerChild.tsx';

export default function Profile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const {
    handleAddProfileClick,
    handleAddCarersClick
  } = useProfileUtils();

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-view">
        {/* Otsikkorivi painikkeille */}
        <div className="buttons-header">
          <Tooltip title="Lisää profiili">
            <Button
              variant="contained"
              className="custom-button"
              onClick={handleAddProfileClick}
            >
              Lisää profiili
            </Button>
          </Tooltip>
          <Tooltip title="Kutsu hoitaja">
            <Button
              variant="contained"
              className="custom-button Carer"
              onClick={handleAddCarersClick}
            >
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
