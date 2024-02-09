import { Typography } from "@mui/material";

// Now there is 3 types of tips: "päiväunet", "iltatoimet", "nukkuminen".
// More tips can be added by changing the choices page and adding more advise types.
// This component renders all advises with matching adviseType
// Fetching here the real data or taking it form sessionStorage/context

// EXTRA FEATURE: make feature to hide and show tips.

export default function TipsComp({ adviseType }: { adviseType: string }) {
  return (
    <div>
      {recommendations.map((recommendation, index) => {
        // Check advise type here
        if (recommendation.adviseType !== adviseType) {
          return;
        }
        return (
          <div key={index}>
            <Typography variant="h4">{recommendation.title}</Typography>

            <Typography
              component="pre"
              style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}
            >
              {recommendation.textContents}
            </Typography>
          </div>
        );
      })}

      <hr />
    </div>
  );
}
