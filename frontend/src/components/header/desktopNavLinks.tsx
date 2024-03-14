import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

// HeaderLinks component for individual links
export default function DesktopNavLinks() {
  return (
    <List sx={{ display: { sx: "block", md: "flex" } }}>
      <ListItem disablePadding sx={{ display: { md: "none" } }}>
        <ListItemButton component={Link} to="/" sx={{ textAlign: "left" }}>
          <ListItemText primary="Etusivu" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/shopping-list"
          sx={{ textAlign: "left" }}
        >
          <ListItemText primary="Ostoslista" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="https://www.kauppa.lapsen-arki.fi/kauppa/"
          sx={{ textAlign: "left" }}
        >
          <ListItemText primary="Kauppa" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="https://www.kauppa.lapsen-arki.fi/blogi-artikkelit/"
          sx={{ textAlign: "left" }}
        >
          <ListItemText primary="Blogi" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/" sx={{ textAlign: "left" }}>
          <ListItemText primary="Vinkit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/notebook"
          sx={{ textAlign: "left" }}
        >
          <ListItemText primary="Muistikirja" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
