import { useLocation } from "react-router-dom";
import NameDropDown from "../components/index/nameDropDown";
import ReturnBtn from "../components/returnBtn";
import { useContext, useEffect, useState } from "react";
import { Card, Container, Typography } from "@mui/material";
import { NamesAndAgesType } from "../types/typesFrontend";
import makeChildObject from "../utils/makeChildObject";
import InfoIcon from "@mui/icons-material/Info";

// comp imports:
import ActivityComp from "../components/coices/activityComp";
import ChildInfoComp from "../components/coices/childInfoComp";
import MealComp from "../components/coices/mealComp";
import TipsComp from "../components/coices/tipsComp";
import { TokenContext } from "../contexts/tokenContext";

export default function ChoicesPage() {
  const location = useLocation();
  const { renderIdentifier } = location.state || {};
  const { isLoggedIn } = useContext(TokenContext);

  // Rendering states:
  const [activity, setActivity] = useState(false);
  const [smallMeal, setSmallMeal] = useState(false);
  const [bigMeal, setBigMeal] = useState(false);
  const [tipsFor, setTipsFor] = useState<null | string>(null);
  const [mealType, setMealType] = useState("");

  // selected child states:
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild");
  });
  const [selectedChildAge, setSelectedChildAge] = useState<number>();

  useEffect(() => {
    const childNamesAndAgesJSON = sessionStorage.getItem("childNamesAndAges");
    makeChildObject();
    if (childNamesAndAgesJSON) {
      const childNamesAndAges = JSON.parse(
        childNamesAndAgesJSON
      ) as NamesAndAgesType[];

      const child = childNamesAndAges.find(
        (child) => child.childName === selectedChild
      );
      if (child) {
        setSelectedChildAge(child.age);
      }
    } else {
      switch (selectedChild) {
        case "Kullervo":
          setSelectedChildAge(12);
          break;
        case "Ulpukka":
          setSelectedChildAge(1);
          break;
        case "Liisa":
          setSelectedChildAge(36);
          break;
      }
    }
  }, [selectedChild]);

  // Handling parent component change of selectedChild
  const handleParentChange = (newValue: string) => {
    setSelectedChild(newValue);
  };

  useEffect(() => {
    switch (renderIdentifier) {
      case "Aamiainen":
        setSmallMeal(true);
        setMealType("small");
        break;
      case "Aktiviteetti":
        setActivity(true);
        break;
      case "Lounas":
        setBigMeal(true);
        setMealType("big");
        break;
      case "Päiväunet":
        setTipsFor("nap");
        break;
      case "Välipala":
        setSmallMeal(true);
        setMealType("small");
        break;
      case "Päivällinen":
        setBigMeal(true);
        setMealType("big");
        break;
      case "Iltapala ja iltatoimet":
        setSmallMeal(true);
        setTipsFor("bedtime");
        setMealType("small");
        break;
      case "Hyvää yötä":
        setTipsFor("sleep");
        break;
      case "Nukkumista":
        setTipsFor("sleep");
        break;
    }
  }, [renderIdentifier]);

  // Conditionally rendering correct components to the page by using renderIdentirfier:
  // Components will fetch the correct recommendation data and caching it.
  // So for now mealComp and TipsComp will be doing all the recomm data fetching.
  return (
    <>
      <Container
        sx={{
          width: {
            xs: "98%",
            sm: "600px",
            md: "800px",
            lg: "1200px",
            textAlign: "center",
          },
          maxWidth: "100%",
        }}
      >
        <ReturnBtn message="palaa etusivulle" />
        <div
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: 20,
            padding: 25,
            background: "#fad5b6",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            {renderIdentifier}
          </Typography>
          <NameDropDown changerFunc={handleParentChange} />
          <ChildInfoComp
            selectedChild={selectedChild}
            mealType={mealType}
          />{" "}
        </div>
        <div style={{ marginBottom: 50 }}>
          {tipsFor && <TipsComp adviseType={tipsFor} />}
        </div>
        {!selectedChild && (
          <Card
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0f1ff",
              padding: 25,
              maxWidth: 450,
              borderRadius: 10,
            }}
          >
            <InfoIcon />
            <Typography sx={{ mt: 1 }} variant="h5">
              Näin pääset alkuun:
            </Typography>
            <br />
            <Typography>
              <strong> 1. Valitse lapsi </strong> <br /> Valitse yläpuolella
              olevasta valikosta oma tai hoidettava lapsesi, niin ehdotukset
              tulevat näkyviin tähän kohtaan.
            </Typography>
            <br />
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong> 2. Selaa ehdotuksia </strong> <br /> Selaa oman tai
              hoidettavan lapsesi ikään sopivia ehdotuksia ja ideoita. Lapsen
              allergiat tulevat näkyviin ateriasivuilla ja kaikki hoitajat
              näkevät nämä.
            </Typography>
            <br />
            <Typography>
              <strong> 3. Valitse </strong> <br /> Valitse hauskimmat,
              mieluisimmat ja maukkaimmat ideat.
            </Typography>
            <br />
            <Typography>
              <strong> 4. Katso tulokset </strong> <br /> Näytä tulossivu
              painamalla "Kokoa ateria" tai "Valitse aktiviteetti" ja luo
              halutessasi ostoslista ateriasivuilla. Tulossivulla saat
              valintojesi perusteella ammattilaisen laatimia hyödyllisiä
              vinkkejä parhaaseen lapsen arkeen.
            </Typography>
          </Card>
        )}
        {!isLoggedIn && selectedChild && !tipsFor && (
          <Card
            style={{
              display: "inline-block",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0f1ff",
              padding: 25,
              maxWidth: 450,
              borderRadius: 10,
            }}
          >
            <InfoIcon />
            <Typography>
              Noin! Nyt olet suosittelusivulla. Tällä sivulla sinulle
              suositellaan valitsemaasi ajankohtaan sopivia ehdotuksia.
              Ehdotuksina voi olla esimerkiksi lapsen ikään sopivia ruokia,
              aktiviteetteja tai vinkkejä helpompaan ja viihtyisämpään perheen
              arkeen.
            </Typography>
            <br />

            <Typography sx={{ wordBreak: "break-word" }}>
              <strong> 3. Selaa ehdotuksia ja huomioi allergiat </strong> <br />{" "}
              Selaa oman tai hoidettavan lapsesi ikään sopivia ehdotuksia ja
              ideoita. Lapsen allergiat tulevat näkyviin yläpuolelle
              ateriasivuilla ja kaikki lapsen hoitajat näkevät ne. Allergioita
              ei oteta automaattisesti huomioon ruokasuosituksissa, eli muista
              aina tarkistaa ne pakkausselosteista.
            </Typography>
            <br />
            <Typography>
              <strong> 4. Valinnan vapaus </strong> <br /> Valitse hauskimmat,
              mieluisimmat ja maukkaimmat ideat. Voit valita ehdotuksia
              aterioille ja aktiviteeteille. Sitten voit koota niistä
              monipuolisen aterian tai hauskan hetken aktiviteeteille.
            </Typography>
          </Card>
        )}
        {smallMeal && (
          <div>
            {selectedChild && (
              <MealComp
                mealType={mealType}
                childAge={selectedChildAge}
                selectedChild={selectedChild}
              />
            )}{" "}
          </div>
        )}
        {bigMeal && (
          <div>
            {selectedChild && (
              <MealComp
                mealType={mealType}
                childAge={selectedChildAge}
                selectedChild={selectedChild}
              />
            )}
          </div>
        )}
        {activity && selectedChild && (
          <ActivityComp
            childAge={selectedChildAge}
            selectedChild={selectedChild}
          />
        )}

        <br />
        <br />
        <br />
      </Container>
    </>
  );
}
