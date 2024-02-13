import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ReturnBtn from "../components/returnBtn";
import { useEffect } from "react";
import { RecommendationsType } from "../types/typesFrontend";

export default function Results() {
  const location = useLocation();
  const selectionList = location.state;
  console.log(selectionList);

  // 2. Filtteröi sieltä jutut selectionListin perusteella ja nappaa oikeat linki sieltä
  // 3. Rendaa selectioni otsikot ja linkit

  useEffect(() => {
    const recommsJSON =
      sessionStorage.getItem("meal") || sessionStorage.getItem("activity");

    if (recommsJSON) {
      const recomms: RecommendationsType[] = JSON.parse(recommsJSON);
      const recommItems = recomms.filter((recomm) =>
        selectionList.includes(Object.keys(recomm.content))
      );
      console.log(recommItems);
    }
  }, [selectionList]);

  return (
    <div>
      <ReturnBtn />
      <Typography variant="h3">Tulokset</Typography>
    </div>
  );
}
