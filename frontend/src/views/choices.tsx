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
  const [nap, setNap] = useState(false);
  const [tipsFor, setTipsFor] = useState(false);

  //
  const [selectedChild, setSelectedChild] = useState(() => {
    return localStorage.getItem("selectedChild");
  });

  // Handling parent component change of selectedChild
  const handleParentChange = (newValue: string) => {
    setSelectedChild(newValue);
  };

  useEffect(() => {
    switch (renderIdentifier) {
      case "Aamiainen":
        setSmallMeal(true);
        break;
      case "Aktiviteetti":
        setActivity(true);
        break;
      case "Lounas":
        setBigMeal(true);
        break;
      case "Päiväunet":
        setNap(true);
        break;
      case "Välipala":
        setSmallMeal(true);
        break;
      case "Päivällinen":
        setBigMeal(true);
        break;
      case "Iltapala ja iltatoimet":
        setSmallMeal(true);
        setTipsFor(true);
        break;
      case "Hyvää yötä":
        setTipsFor(true);
        break;
    }
  }, [renderIdentifier]);

  return (
    <>
      <Container>
        <ReturnBtn message="🡨 palaa etusivulle" />
        <Typography variant="h2">{renderIdentifier}</Typography>
        <ChildInfoComp selectedChild={selectedChild} />{" "}
        <NameDropDown changerFunc={handleParentChange} />
        <div style={{ marginBottom: 50 }}>
          {tipsFor && <TipsComp renderIdentifier={renderIdentifier} />}
        </div>
        {smallMeal && (
          <div>
            <AllergiesComp />
            <MealComp /> {/* <-- bigMeal identifier prop */}
          </div>
        )}
        {bigMeal && (
          <div>
            <AllergiesComp />
            <MealComp /> {/* <-- smallMeal identifier prop */}
          </div>
        )}
        {activity && <ActivityComp />}
        {nap && <TipsComp renderIdentifier={renderIdentifier} />}
      </Container>
    </>
  );
}
