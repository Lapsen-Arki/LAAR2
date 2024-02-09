import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/types";
import useGetRecommData from "../../customHooks/useGetRecommData";

export default function MealComp({
  mealType,
  childAge,
}: {
  mealType: string;
  childAge: number;
}) {
  // Example data:

  // Tämä on oikea datamuoto nyt:
  // Fetching here the real data or taking it form sessionStorage/context
  // Meal types are big, small and both

  const fetchType = "meal";

  const recommendations: RecommendationsType[] = useGetRecommData(fetchType);

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
        childAge={childAge}
      />
    </>
  );
}
