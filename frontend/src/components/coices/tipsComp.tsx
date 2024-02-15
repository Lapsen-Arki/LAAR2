import { Typography } from "@mui/material";
import { RecommendationsType } from "../../types/recommTypes";
import useGetRecommData from "../../customHooks/useGetRecommData";

// Now there is 3 types of tips: "päiväunet", "iltatoimet", "nukkuminen".
// More tips can be added by changing the choices page and adding more advise types.
// This component renders all advises with matching adviseType

// EXTRA FEATURE: make feature to hide and show tips.

export default function TipsComp({ adviseType }: { adviseType: string }) {
  const fetchType = "tip";

  const recommendations: RecommendationsType[] = useGetRecommData(fetchType);
  return (
    <div>
      {recommendations.map((recommendation, index) => {
        // Check advise type here
        if (recommendation.type !== adviseType) {
          return;
        }
        return (
          <div key={index}>
            <Typography variant="h4">{recommendation.title}</Typography>

            <Typography
              component="pre"
              style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}
            >
              {recommendation.textContent[recommendation.title]}
            </Typography>
          </div>
        );
      })}

      <hr />
    </div>
  );
}
