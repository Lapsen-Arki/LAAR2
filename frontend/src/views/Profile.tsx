import { useState, useContext } from 'react';
import '../styles/Profile.css';
import {
  Button,
  Box,
  Tooltip,
  Alert,
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
    childProfiles,
    carerProfiles,
    carerChildProfiles,
    handleAddProfileClick,
    handleAddCarersClick,
    profilesLoaded
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
        {profilesLoaded && childProfiles.length === 0 && carerProfiles.length === 0 && carerChildProfiles.length === 0 ? (
            <Alert severity="info" sx={{ maxWidth: 430 }}>
              <p>Aloitetaan yhdessä matkasi <strong>Lapsen Arki</strong>-sivustolla. Täällä voit helposti hallinnoida lapsesi profiileja ja kutsua hoitajia jakamaan ainutlaatuisia hetkiä ja tärkeitä tietoja.</p>
              <p><strong>Uuden lapsen profiilin luominen:</strong></p>
              <ol>
                <li><strong>Lisää profiili</strong> - Aloittaaksesi, paina "Lisää profiili" -painiketta. Tämä avaa lomakkeen, johon voit syöttää lapsesi tiedot, kuten nimen, syntymäpäivän ja muut tärkeät yksityiskohdat.</li>
                <li>Täytä vaaditut kentät huolellisesti ja valitse "Tallenna" tallentaaksesi uuden profiilin. Näin luot lapsellesi oman ainutlaatuisen profiilin, jota voit päivittää ja hallinnoida milloin tahansa.</li>
              </ol>
              <p><strong>Hoitajan kutsuminen:</strong></p>
              <ol>
                <li><strong>Kutsu hoitaja</strong> - Kun lapsesi profiili on asetettu, voit kutsua hoitajia osallistumaan lapsesi hoitoon. Paina "Kutsu hoitaja" -painiketta aloittaaksesi.</li>
                <li>Syötä hoitajan sähköpostiosoite kutsulomakkeeseen ja lähetä kutsu. Hoitaja saa kutsun liittyä <strong>Lapsen Arki</strong>-sivustolle ja pääsee näkemään sekä osallistumaan lapsesi profiiliin. Kehoita häntä tarkistamaan sähköposti.</li>
              </ol>
              <p><strong>Aloita nyt</strong> ja tee lapsesi päivittäisestä hoidosta sujuvampaa ja interaktiivisempaa. Olemme täällä tukemassa sinua ja perhettäsi joka askeleella.</p>
              <p>Jos tarvitset apua tai sinulla on kysyttävää, älä epäröi ottaa yhteyttä meidän tukitiimiimme.</p>
              <p>Tervetuloa perheeseen!</p>
            </Alert>
          ) : (
            <>
              {childProfiles.length > 0 && <MyChildComponent />}
              {carerProfiles.length > 0 && <InvitedCarersComponent />}
              {carerChildProfiles.length > 0 && <CarerChildComponent />}
            </>
          )}
        </Box>
      </div>
    </div>
  );
}