import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/types";

export default function MealComp({ mealType }: { mealType: string }) {
  // Example data:

  // Tämä on oikea datamuoto nyt:
  // Fetching here the real data or taking it form sessionStorage/context
  // Meal types are big, small and both
  const recommendations: RecommendationsType[] = [
    {
      id: 1,
      mealType: "both",
      title: "Juoma",
      menuItems: { maito: 0, mehu: 14, vesi: 0 },
      photos: { maito: "", mehu: "", vesi: "" },
    },
    {
      id: 2,
      mealType: "small",
      title: "Aamupala juttu",
      menuItems: { jugurtti: 12, marjoja: 14, kiisseli: 15, puuro: 4 },
      photos: { jugurtti: "", marjoja: "", kiisseli: "", puuro: "4" },
    },
    {
      id: 3,
      mealType: "big",
      title: "Proteiini",
      menuItems: {
        kebab: 1,
        lihapata: 1,
      },
      photos: { kebab: "", lihapata: "" },
    },
  ];

  // 1 This component will be fetching meal recommendation data
  // 2. And passing it to recommComp.tsx to render the recommendations.

  // - Lisää iso vs pieni ateria tunniste
  // - Button tulos sivulle ja routtaus

  return (
    <>
      <Typography sx={{ mt: 5 }} variant="h3">
        Kokoa ateria:
      </Typography>
      <Typography>Lapsen ikään sopivia ruoka suosituksia:</Typography>
      <RecommComp
        recommendations={recommendations}
        multipleSelections={true}
        mealType={mealType}
      />
    </>
  );
}
