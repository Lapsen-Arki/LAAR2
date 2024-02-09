import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/types";
import useGetRecommData from "../../customHooks/useGetRecommData";

// Fetching here the real data or taking it form sessionStorage/context

export default function ActivityComp({ childAge }: { childAge: number }) {
  const fetchType = "activity";

  const recommendations: RecommendationsType[] = useGetRecommData(fetchType);
  return (
    <>
      <Typography variant="h4">Aktiviteetteja:</Typography>
      <Typography>Lapsen ikään sopivia aktiviteetteja:</Typography>
      <RecommComp
        recommendations={recommendations}
        multipleSelections={false}
        childAge={childAge}
      />
    </>
  );
}
