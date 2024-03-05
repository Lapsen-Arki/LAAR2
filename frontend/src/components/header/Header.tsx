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
import CloseIcon from "@mui/icons-material/Close";

import { ThemeProvider } from "@mui/material/styles";
import HeaderLink from "./headerLink";
import HeaderIconsAsText from "./headerIconsAsText";
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
        <CloseIcon />
      </div>
      <HeaderLink />
      <Divider />
      <HeaderIconsAsText />
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
                <HeaderLink />
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
