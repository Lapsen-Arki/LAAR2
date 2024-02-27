import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Box, Tooltip, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext";
import { useContext, useState } from "react";

export default function HeaderIcons({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoggedIn, signOutMethod } = useContext(TokenContext);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleAnchorClose = () => {
    setSettingsAnchor(null);
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 2, mb: 2, mt: 1.5 }}>
      {/* Logout icon: */}
      {isLoggedIn && (
        <div>
          <Tooltip title="Kirjaudu ulos">
            <IconButton
              size="large"
              onClick={() => {
                setOpen(false);
                signOutMethod();
              }}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}

      {/* Profile and login icons: */}
      {isLoggedIn ? (
        <div>
          <Tooltip title="Profiilisivu">
            <IconButton
              size="large"
              component={Link}
              onClick={() => setOpen(false)}
              to="/profile"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>

          <Tooltip title="Asetukset">
            <IconButton
              size="large"
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={settingsAnchor}
            keepMounted
            open={Boolean(settingsAnchor)}
            onClose={() => setSettingsAnchor(null)}
          >
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleAnchorClose}
            >
              Profiilisivu
            </MenuItem>
            <MenuItem
              component={Link}
              to="/account"
              onClick={handleAnchorClose}
            >
              Tilin asetukset
            </MenuItem>
            <MenuItem
              component={Link}
              to="/subscription"
              onClick={handleAnchorClose}
            >
              Tilaus asetukset
            </MenuItem>
            <MenuItem
              component={Link}
              to="/profile"
              onClick={() => {
                handleAnchorClose();
                signOutMethod();
              }}
            >
              Kirjaudu ulos
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Tooltip title="Kirjaudu sisään">
            <IconButton
              onClick={() => setOpen(false)}
              size="large"
              component={Link}
              to="/login"
              color="inherit"
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Box>
  );
}
