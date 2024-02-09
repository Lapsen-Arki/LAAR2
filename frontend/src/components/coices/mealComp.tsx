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
  const fetchType = "ateria";
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
