import { Grid, Typography } from "@mui/material";

export default function LandingComp() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <img
          src="/Kuva.jpg"
          alt="Kuva"
          style={{ width: "100%", height: "auto" }}
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
      </Grid>
    </Grid>
  );
}
