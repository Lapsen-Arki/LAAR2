import { Typography } from "@mui/material";
import RecommComp from "./recommComp";
import { RecommendationsType } from "../../types/types";

// Fetching here the real data or taking it form sessionStorage/context
const recommendations: RecommendationsType[] = [
  {
    id: 1,
    title: "Ulkoilu aktiviteetit",
    menuItems: { pihaleikki: 3, kävely: 12, pulkkailu: 8 },
  },
  { id: 2, title: "Sisä aktiviteetit", menuItems: { joku12: 12 } },
  { id: 3, title: "Muut aktiviteetit", menuItems: { joku1: 1, joku6: 6 } },
];

export default function ActivityComp() {
  return (
    <>
      <Typography variant="h4">Aktiviteetteja:</Typography>
      <Typography>Lapsen ikään sopivia aktiviteetteja:</Typography>
      <RecommComp
        recommendations={recommendations}
        multipleSelections={false}
      />
    </>
  );
}
