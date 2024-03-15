import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Box, Tooltip, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext";
import { useContext, useState } from "react";

export default function HeaderIcons() {
  const { isLoggedIn, signOutMethod } = useContext(TokenContext);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleAnchorClose = () => {
    setSettingsAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ml: 2,
        mb: 2,
        mt: 1.5,
      }}
    >
      {/* Logout icon: */}
      {isLoggedIn && (
        <div>
          <Tooltip title="Kirjaudu ulos">
            <IconButton
              size="large"
              onClick={() => {
                signOutMethod();
              }}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}

      {/* Home, Profile and login icons: */}
      {isLoggedIn ? (
        <div>
          <Tooltip title="Etusivu">
            <IconButton size="large" component={Link} to="/" color="inherit">
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profiilisivu">
            <IconButton
              size="large"
              component={Link}
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
            sx={{ display: { xs: "none", md: "block" } }}
          >
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
              Tilaus
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
              size="large"
              component={Link}
              to="/login"
              color="inherit"
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Etusivu">
            <IconButton size="large" component={Link} to="/" color="inherit">
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Box>
  );
}
