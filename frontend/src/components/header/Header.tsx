import * as React from "react";
import { headingTheme } from "../../styles/themeMUI";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Toolbar,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import { ThemeProvider } from "@mui/material/styles";
import DesktopNavLinks from "./desktopNavLinks";
import MobileNavLinks from "./mobileNavLinks";
import HeaderIcons from "./headerIcons";
import BrandingBanner from "./headerBrandingBanner";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", margin: 2 }}>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <BrandingBanner />
        <CancelPresentationIcon />
      </div>
      <DesktopNavLinks />
      <Divider />
      <MobileNavLinks />
    </Box>
  );

  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <ThemeProvider theme={headingTheme}>
          <AppBar component="nav">
            <Toolbar>
              <BrandingBanner />
              {/* Burger menu icon: */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              {/* NavBar Navigation links */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <DesktopNavLinks />
                <HeaderIcons />
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "360px",
                  backgroundColor: "#fff4ec",
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </ThemeProvider>
      </Box>
    </header>
  );
}
