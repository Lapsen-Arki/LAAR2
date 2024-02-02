import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const TermsAndPrivacy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Käyttöehdot
        </Typography>
        <Typography paragraph>
          Tervetuloa sivustollemme. Jos jatkat sivuston käyttöä, sitoudut
          noudattamaan ja olemaan sitoutunut seuraaviin käyttöehtoihin, jotka
          yhdessä tietosuojaselosteemme kanssa hallitsevat [yrityksesi nimi]n
          suhdetta sinuun tämän verkkosivuston suhteen.
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Sivuston sisältö on tarkoitettu yleiseksi tiedoksi ja käyttöön. Sitä voidaan muuttaa ilman erillistä ilmoitusta." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Emme tarjoa mitään takuuta tai vakuutusta tietojen tarkkuudesta, ajantasaisuudesta, suorituskyvystä, täydellisyydestä tai soveltuvuudesta tiettyyn tarkoitukseen. Hyväksyt, että tällaiset tiedot ja materiaalit voivat sisältää epätarkkuuksia tai virheitä ja nimenomaisesti suljemme pois vastuun tällaisista epätarkkuuksista tai virheistä laajimmassa laillisesti sallitussa määrin." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Käyttösi tämän verkkosivuston materiaaleista, jotka voivat johtaa, mutta eivät rajoitu, tietojen menetykseen tai voittojen menetykseen, on kokonaan omalla vastuullasi." />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom>
          Tietosuojaseloste
        </Typography>
        <Typography paragraph>
          Tämä tietosuojaseloste määrittelee, kuinka [yrityksesi nimi] käyttää
          ja suojaa kaikkia tietoja, joita annat, kun käytät tätä
          verkkosivustoa.
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Voimme kerätä seuraavia tietoja: nimi ja työnimike, yhteystiedot, mukaan lukien sähköpostiosoite, demografiset tiedot, kuten postinumero, mieltymykset ja kiinnostuksen kohteet, muut tiedot asiakaskyselyihin ja/tai tarjouksiin liittyen." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tarvitsemme näitä tietoja ymmärtääksemme tarpeitasi ja tarjotaksemme sinulle parempaa palvelua, ja erityisesti sisäisen kirjanpidon, tuotteiden ja palveluiden parantamisen, ajoittain lähettämien kampanjasähköpostien lähettämisen, joiden uskomme löytävän kiinnostusta, markkinatutkimustarkoituksiin." />
          </ListItem>
        </List>
        <Typography paragraph>
          Jos sinulla on kysyttävää näistä käyttöehdoista tai
          tietosuojaselosteesta, ota meihin yhteyttä.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndPrivacy;
