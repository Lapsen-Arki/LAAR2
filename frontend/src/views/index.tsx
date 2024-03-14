import { Card, Container, Typography } from "@mui/material";
import LandingComp from "../components/index/landingComp";
import TimeBlockComp from "../components/index/timeBlockComp";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../contexts/tokenContext";
import NameDropDown from "../components/index/nameDropDown";
import { getChildProfiles } from "../api/childProfile/getChildProfiles";
import makeChildObject from "../utils/makeChildObject";
import { getCarerChildProfiles } from "../api/carersProfile/getCarerChildProfiles";
import selectRandomPhoto from "../utils/randomPhoto";

import InfoIcon from "@mui/icons-material/Info";
import ChildInfoComp from "../components/coices/childInfoComp";
import { getSubscriptionStatus } from "../api/stripeSubscriptions";
import { Link } from "react-router-dom";
import FirstLoginModal from "../components/modals/welcomeModal";

export default function IndexPage() {
  const { isLoggedIn, idToken } = useContext(TokenContext);
  const [openFirstLoginModal, setFirstOpenLoginModal] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild");
  });
  const [showMessage, setShowMessage] = useState(false);

  // Fetching child profiles and making child object in sessionStorage with name and age:
  useEffect(() => {
    if (isLoggedIn && idToken) {
      // Fetching childProfiles
      const retrieveDataAndMakeObject = async () => {
        const subStatus = await getSubscriptionStatus(idToken);
        if (!subStatus) {
          setShowMessage(true);
        }
        await getChildProfiles(idToken);
        await getCarerChildProfiles();
        makeChildObject();

        const notFirstLogin = localStorage.getItem("notFirstLogin");
        if (notFirstLogin === "firstAttempt") {
          setFirstOpenLoginModal(true);
          setIsFirstLogin(true);
          // Show first login modal / message etc
          localStorage.setItem("notFirstLogin", "true");
        }
      };
      retrieveDataAndMakeObject();
    }
  }, [idToken, isLoggedIn, openFirstLoginModal]);

  if (isFirstLogin) {
    return (
      <FirstLoginModal
        open={openFirstLoginModal}
        setOpen={setFirstOpenLoginModal}
      />
    );
  }

  const handleParentChange = (newValue: string) => {
    setSelectedChild(newValue);
  };

  return (
    <>
      <Container>
        <div
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: 20,
            padding: 20,
            background: "#fad5b6",
          }}
        >
          {!isLoggedIn ? (
            <LandingComp />
          ) : (
            <img
              src={selectRandomPhoto()}
              alt="Kuva"
              style={{
                width: "80%",
                maxWidth: 500,
                height: "auto",
                display: "block", // Make the image a block-level element
                marginLeft: "auto", // Automatically adjust the left margin
                marginRight: "auto",
                marginBottom: 20,
              }}
            />
          )}
        </div>
        {!isLoggedIn && (
          <div>
            <Card
              style={{
                display: "inline-block",
                alignItems: "center",
                justifyContent: "center",
                background: "#e0f1ff",
                padding: 25,
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <InfoIcon />

              <Typography variant="h5">
                <strong>1. Valitse oma tai hoidettava lapsesi: </strong>
              </Typography>
              <Typography>
                Voit lisätä lapsillesi omat profiilit tai olla hoitajana toisten
                lapsille. Voit myös kutsua vanhempia omien lapsiesi
                hoitajajiksi. Profiilien tieteoihin kerätään ainoastaan 3
                tietoa: 1. nimi tai lempinimi, 2. syntymäaika ja 3. allergiat.
                Emme kerää mitään muuta tietoa lasten profiileja varten.
              </Typography>
            </Card>
          </div>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
          }}
        >
          <NameDropDown changerFunc={handleParentChange} />
          <ChildInfoComp selectedChild={selectedChild} />
        </div>
        {showMessage && (
          <Typography>
            <InfoIcon sx={{ mt: 0.5, mb: -0.75 }} /> Huom. Näet ainoastaan
            hoidettaiven lasten profiilit, sillä sinulla ei ole voimassaolevaa
            tilausta. <Link to={"/subscription"}>Jatka tilaustasi täältä.</Link>
          </Typography>
        )}
        {!isLoggedIn && selectedChild && (
          <Card
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0f1ff",
              padding: 25,
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 10,
            }}
          >
            <InfoIcon />

            <Typography variant="h5">
              <strong>2. Valitse alta ajankohtaan sopiva laatikko: </strong>
            </Typography>
            <Typography>
              Päivärytmi on laadittu lapsen ikään sopivaksi. Päivärytmi on
              varhaiskasvatuksen ammattilaisen laatima ja perustuu pohjoismaisen
              kasvatuksen parhaisiin standardeihin.
            </Typography>
          </Card>
        )}
        <TimeBlockComp childName={selectedChild} />{" "}
        {/* <-- Routes to choices page with renderIdentif */}
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
