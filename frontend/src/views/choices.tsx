import { useLocation } from "react-router-dom";
import NameDropDown from "../components/index/nameDropDown";
import ReturnBtn from "../components/returnBtn";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { NamesAndAgesType } from "../types/types";
import makeChildObject from "../utils/makeChildObject";

// comp imports:
import ActivityComp from "../components/coices/activityComp";
import AllergiesComp from "../components/coices/allergiesComp";
import ChildInfoComp from "../components/coices/childInfoComp";
import MealComp from "../components/coices/mealComp";
import TipsComp from "../components/coices/tipsComp";

export default function ChoicesPage() {
  const location = useLocation();
  const { renderIdentifier } = location.state || {};

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
          setSelectedChildAge(3);
          break;
        case "Ulpukka":
          setSelectedChildAge(12);
          break;
        case "Liisa":
          setSelectedChildAge(8);
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
        <ReturnBtn message="palaa etusivulle" />
        <Typography variant="h2">{renderIdentifier}</Typography>
        <ChildInfoComp selectedChild={selectedChild} />{" "}
        <NameDropDown changerFunc={handleParentChange} />
        <div style={{ marginBottom: 50 }}>
          {tipsFor && <TipsComp adviseType={tipsFor} />}
        </div>
        {smallMeal && (
          <div>
            <AllergiesComp />
            {selectedChildAge && (
              <MealComp mealType={mealType} childAge={selectedChildAge} />
            )}{" "}
          </div>
        )}
        {bigMeal && (
          <div>
            <AllergiesComp />
            {selectedChildAge && (
              <MealComp mealType={mealType} childAge={selectedChildAge} />
            )}
          </div>
        )}
        {activity && selectedChildAge && (
          <ActivityComp childAge={selectedChildAge} />
        )}
        <br />
        <br />
        <br />
        <ReturnBtn message="palaa etusivulle" />
      </Container>
    </>
  );
}
