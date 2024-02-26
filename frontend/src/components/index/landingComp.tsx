import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LandingComp() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Ftips%2Fhampaiden%20pesu%20(2).png?alt=media&token=7701c522-d9e8-44b7-a6e9-a3f7e20a5b2e"
          alt="Kuva"
          style={{ width: "80%", height: "auto" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3">Lapsen Arki</Typography>
        <Typography variant="h5">Tueksi vanhemmuuden polulla.</Typography>
        <hr />
        <Typography variant="body1">
          Olemme täällä auttamassa uusien vanhempien arkea ja arkirutiinia,
          antamassa haluskoja suositukisa aktiviteetteihin, käytännön vinkkejä
          sekä ideoita aterioiden kokoamiseen eri ikäisille vauva- ja
          taaperoikäisille lapsille.
        </Typography>
        <br />
        <Typography variant="body1">
          Tutustu alla siihen, miten sovelluksemme voi rikastuttaa sinun ja
          perheesi arkea. Jos koet, että Lapsen Arki voisi olla osa teidän
          perheenjäsentenne päivittäistä elämää, liittykää rohkeasti mukaan
          yhteisöömme. Toivotamme sinut lämpimästi tervetulleeksi!
        </Typography>
        <Grid sx={{ textAlign: "center", marginTop: 2 }}>
          <Link to="/register">
            <Button variant="contained">
              aloita 14 päivän ilmainen kokeilu
            </Button>
          </Link>
          <Link to="https://www.kauppa.lapsen-arki.fi/">
            <Button sx={{ color: "#63c8cc" }}>Tai lue lisää</Button>
          </Link>

          <br />
          <Typography sx={{ marginTop: 3 }}>
            <strong>
              Alta voit tutustua myös sovelluksen esittelyversioon:
            </strong>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
