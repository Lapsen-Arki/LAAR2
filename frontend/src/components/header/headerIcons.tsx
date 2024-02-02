import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext";
import { useContext } from "react";

export default function HeaderIcons({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoggedIn, signOutMethod } = useContext(TokenContext);
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1.5 }}>
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
