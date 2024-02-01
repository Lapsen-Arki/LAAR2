import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext";
import { useContext } from "react";

export default function SessionButtons() {
  const { isLoggedIn, signOutMethod } = useContext(TokenContext);
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1.5 }}>
      {/* Logout icon: */}
      {isLoggedIn && (
        <div>
          <IconButton size="large" onClick={signOutMethod} color="inherit">
            <LogoutIcon />
          </IconButton>
        </div>
      )}

      {/* Profile and login icons: */}
      {isLoggedIn ? (
        <div>
          <IconButton
            size="large"
            component={Link}
            to="/profile"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton size="large" component={Link} to="/login" color="inherit">
            <LoginIcon />
          </IconButton>
        </div>
      )}
    </Box>
  );
}
