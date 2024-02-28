import { headingTheme } from "../../styles/themeMUI";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";

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
          <AppBar position="fixed">
            <Toolbar>
              <div style={{ flexGrow: 1, marginTop: 5, marginBottom: 5 }}>
                {/* Logo: */}
                <Link to="/" onClick={() => setOpenBurger(false)}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Flogos%2FVAUVA%20TURKOOSI%20VALKOINEN%20REUNA.png?alt=media&token=3c6c2e81-d4ac-42d4-b037-b31047cad413"
                    alt="Logo"
                    style={{
                      height: "45px",
                      flexGrow: 1,
                      marginRight: 5,
                    }}
                  ></img>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/laar-48852.appspot.com/o/photos%2Flogos%2Flaar%20logo%20teksti%20musta%20valkoinen%20reuna.png?alt=media&token=48a12693-2d14-4238-9caa-2b6d5876464d"
                    alt="Logo"
                    style={{ height: "30px", flexGrow: 1 }}
                  ></img>
                </Link>
                <Typography
                  style={{
                    height: "20px",
                    marginLeft: "4px",
                  }}
                >
                  Beta
                </Typography>
              </div>

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
                    navLinkTo="https://www.kauppa.lapsen-arki.fi/blogi-artikkelit/"
                    navLinkName="Blogi"
                  />
                  <HeaderLink
                    setOpen={setOpenBurger}
                    navLinkTo="https://www.kauppa.lapsen-arki.fi/kauppa/"
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
