import { Container, Typography } from "@mui/material";

import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext, useEffect } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";

import { getChildProfiles } from "../api/childProfile/getChildProfiles";
import makeChildObject from "../utils/makeChildObject";

export default function IndexPage() {
  const { isLoggedIn, idToken } = useContext(TokenContext);

  // Fetching child profiles and making child object in sessionStorage with name and age:
  useEffect(() => {
    if (isLoggedIn && idToken) {
      // TODO: Make sure this updates after login redirect
      // Fetching childProfiles
      const retrieveDataAndMakeObject = async () => {
        await getChildProfiles(idToken);
        makeChildObject();
      };
      retrieveDataAndMakeObject();
    }
  }, [idToken, isLoggedIn]);

  return (
    <>
      <Container>
        {!isLoggedIn && <LandingComp />}
        <NameDropDown />
        <TimeBlockComp /> {/* <-- Routes to choices page with renderIdentif */}
        <Typography variant="h5">
          Lämmin kiitos osallistumisestasi sovelluksemme beta-testaukseen!
        </Typography>
        <br />
        <Typography>
          Panostuksesi on meille korvaamaton, ja toivomme saavamme sinulta
          avointa palautetta kokemuksestasi. Haluamme muistuttaa, että sovellus
          toimii testauksen jälkeen täysin samalla tavalla kuin ennenkin, ja
          kaikki käyttäjätiedot säilyvät turvallisesti. Olethan yhteydessä
          meihin sähköpostitse osoitteeseen{" "}
          <strong>testing@lapsen-arki.fi</strong>, mikäli kohtaat bugeja tai
          sinulla on ehdotuksia sovelluksemme parantamiseksi. Vakuutamme, että
          käsittelemme jokaisen palautteen huolellisesti ja pyrimme jatkuvasti
          kehittämään sovellusta saamamme palautteen perusteella. Tavoitteenamme
          on tarjota paras mahdollinen käyttökokemus, ja juuri sinun panoksesi
          on tässä avainasemassa. Arvostamme luottamustasi ja sitoutumistasi
          sovelluksemme kehitykseen.
        </Typography>
      </Container>
    </>
  );
}
