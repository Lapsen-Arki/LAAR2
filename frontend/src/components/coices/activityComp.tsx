import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/recommTypes";
import useGetRecommData from "../../customHooks/useGetRecommData";

export default function ActivityComp({
  childAge,
  selectedChild,
}: {
  childAge: number;
  selectedChild: string;
}) {
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
        selectedChild={selectedChild}
      />
    </>
  );
}
