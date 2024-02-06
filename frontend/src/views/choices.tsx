import { useLocation } from "react-router-dom";
import NameDropDown from "../components/index/nameDropDown";
import ReturnBtn from "../components/returnBtn";
import { useEffect, useState } from "react";

// comp imports:
import ActivityComp from "../components/coices/activityComp";
import AllergiesComp from "../components/coices/allergiesComp";
import ChildInfoComp from "../components/coices/childInfoComp";
import MealComp from "../components/coices/mealComp";
import TipsComp from "../components/coices/tipsComp";
import { Container, Typography } from "@mui/material";

export default function ChoicesPage() {
  const location = useLocation();
  const { renderIdentifier } = location.state || {};

  // Rendering states:
  const [activity, setActivity] = useState(false);
  const [smallMeal, setSmallMeal] = useState(false);
  const [bigMeal, setBigMeal] = useState(false);
  const [tipsFor, setTipsFor] = useState<null | string>(null);
  const [mealType, setMealType] = useState("");

  //
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild");
  });

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
        setTipsFor("päiväunet");
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
        setTipsFor("iltatoimet");
        setMealType("small");
        break;
      case "Hyvää yötä":
        setTipsFor("nukkuminen");
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
            xs: "100%",
            sm: "600px",
            md: "800px",
            lg: "1200px",
          },
          maxWidth: "100%",
        }}
      >
        <ReturnBtn message="🡨 palaa etusivulle" />
        <Typography variant="h2">{renderIdentifier}</Typography>
        <ChildInfoComp selectedChild={selectedChild} />{" "}
        <NameDropDown changerFunc={handleParentChange} />
        <div style={{ marginBottom: 50 }}>
          {tipsFor && <TipsComp adviseType={tipsFor} />}
        </div>
        {smallMeal && (
          <div>
            <AllergiesComp />
            <MealComp mealType={mealType} />{" "}
          </div>
        )}
        {bigMeal && (
          <div>
            <AllergiesComp />
            <MealComp mealType={mealType} />
          </div>
        )}
        {activity && <ActivityComp />}
      </Container>
    </>
  );
}
