import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/recommTypes";
import useGetRecommData from "../../customHooks/useGetRecommData";

export default function ActivityComp({
  childAge = 0,
  selectedChild,
}: {
  childAge?: number;
  selectedChild: string;
}) {
  const fetchType = "activity";
  const recommendations: RecommendationsType[] = useGetRecommData(fetchType);

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Aktiviteetteja:
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Lapsen ikään sopivia aktiviteetteja:
      </Typography>
      <RecommComp
        recommendations={recommendations}
        multipleSelections={true}
        childAge={childAge}
        selectedChild={selectedChild}
      />
    </>
  );
}
