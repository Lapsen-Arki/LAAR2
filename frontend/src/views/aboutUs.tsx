import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

// Kuvien importtaus (oletetaan, että kuvat ovat src-kansiossa)
// import teamPhoto from "./path/to/your/teamPhoto.jpg"; // Korvaa oikealla polulla
// import visionPhoto from "./path/to/your/visionPhoto.jpg"; // Korvaa oikealla polulla

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Tieto Meistä
      </Typography>

      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meidän Tarinamme
        </Typography>
        <Typography paragraph>
          [Yrityksesi nimi] perustettiin vuonna [perustamisvuosi], kun ryhmä
          [kuvaus siitä, miten yritys sai alkunsa]. Olemme kasvaneet pienestä
          tiimistä suureksi perheeksi, joka on omistautunut [yrityksen
          päämäärä/missio].
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5" component="h3" gutterBottom>
                Miksi Valita Meidät?
              </Typography>
              <Typography paragraph>
                Me [yrityksen nimi]lla uskomme [yrityksen arvot ja vahvuudet].
                Olemme sitoutuneet tarjoamaan [tuotteet/palvelut] korkeimmalla
                mahdollisella laadulla.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            // src={visionPhoto}
            alt="Visio"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <img
            // src={teamPhoto}
            alt="Tiimimme"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h5" component="h3" gutterBottom>
                Tiimimme
              </Typography>
              <Typography paragraph>
                Tiimimme koostuu intohimoisista ammattilaisista, jotka ovat
                omistautuneet [tiimin päämäärä/erikoistuminen].
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ota Yhteyttä
        </Typography>
        <Typography paragraph>
          Jos sinulla on kysyttävää tai haluat oppia lisää siitä, mitä teemme,
          älä epäröi ottaa meihin yhteyttä. Odotamme innolla mahdollisuutta
          työskennellä kanssasi!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
