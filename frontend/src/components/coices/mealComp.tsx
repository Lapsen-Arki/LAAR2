import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/types";

export default function MealComp() {
  // Example data:

  // Fetching here the real data or taking it form sessionStorage/context
  const recommendations: RecommendationsType[] = [
    {
      id: 1,
      title: "Juoma",
      menuItems: { maito: 0, mehu: 14, kiisseli: 1, juusto: 5 },
    },
    { id: 2, title: "Leipä", menuItems: { näkkileipä: 12, hapankorppu: 14 } },
    { id: 3, title: "Kasvis", menuItems: { kurkku: 1, tomaatti: 1 } },
  ];

  // 1 This component will be fetching meal recommendation data
  // 2. And passing it to recommComp.tsx to render the recommendations.

  // - Lisää iso vs pieni ateria tunniste
  // - Tee aterian valinta useState list
  // - Valittujen laatikoiden tyylin muutos
  // - Button tulos sivulle ja routtaus

  return (
    <>
      <Typography sx={{ mt: 5 }} variant="h3">
        Kokoa ateria:
      </Typography>
      <Typography>Lapsen ikään sopivia ruoka suosituksia:</Typography>
      <RecommComp recommendations={recommendations} multipleSelections={true} />
    </>
  );
}
