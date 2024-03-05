import { TokenContext } from "../../contexts/tokenContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText 
} from "@mui/material";

export default function HeaderIconsAsText() {
  const { isLoggedIn, signOutMethod } = useContext(TokenContext);

  return (
    <List>
      {/* Home, Profile and login icons as text (drawer): */}
      {isLoggedIn ? (
        <div>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemText primary="Profiili" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/account">
              <ListItemText primary="Tilin asetukset" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/subscription">
              <ListItemText primary="Tilaukset" />
            </ListItemButton>
          </ListItem>
        </div>
      ) : (
        <div>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Kirjaudu sisään" />
            </ListItemButton>
          </ListItem>
        </div>
      )}
      {/* Logout icon: */}
      {isLoggedIn && (
        <div>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                signOutMethod();
              }}
            >
              <ListItemText primary="Kirjaudu ulos" />
            </ListItemButton>
          </ListItem>
        </div>
      )}
    </List>
  );
}
