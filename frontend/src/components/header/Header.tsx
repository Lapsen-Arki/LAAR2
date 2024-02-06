import { headingTheme } from "../Layout/themeMUI";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { ThemeProvider } from "@mui/material/styles";
import HeaderLink from "./headerLink";
import HeaderIcons from "./headerIcons";
import { useState, useEffect } from "react";

export default function Header() {
  const [openBurger, setOpenBurger] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Update the state based on window width
      setSmallScreen(window.innerWidth < 600);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <header>
      <Box>
        <ThemeProvider theme={headingTheme}>
          <AppBar position="fixed" sx={{ width: "100%" }}>
            <Toolbar>
              {/* LAAR text logo: */}
              <Typography
                variant="h5"
                component={Link}
                onClick={() => setOpenBurger(false)}
                to="/"
                sx={{ flexGrow: 1, ml: 0.5 }}
              >
                LAAR
              </Typography>

              {/* Burger menu icon: */}
              <div>
                <Box
                  sx={{
                    position: "fixed",
                    top: 5, // Adjust according to your AppBar height
                    right: 8, // Position it from the right edge of the viewport
                    zIndex: 1, // Ensure it's above other content
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={() => setOpenBurger((openBurger) => !openBurger)}
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>

                {/* NavBar Navigation links */}
                <Box
                  sx={{
                    display: {
                      xs: openBurger && smallScreen ? "block" : "none",
                      sm: "flex",
                      marginRight: openBurger && smallScreen ? "25px" : "0px",
                      width: openBurger && smallScreen ? "180px" : "maxWidth",
                    },
                  }}
                >
                  <HeaderLink
                    setOpen={setOpenBurger}
                    navLinkTo="#"
                    navLinkName="Päiväkirja"
                  />
                  <HeaderLink
                    setOpen={setOpenBurger}
                    navLinkTo="#"
                    navLinkName="Blogi"
                  />
                  <HeaderLink
                    setOpen={setOpenBurger}
                    navLinkTo="#"
                    navLinkName="Kauppa"
                  />
                  <HeaderIcons setOpen={setOpenBurger} />
                </Box>
              </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
    </header>
  );
}
