import TimeBlockPreview from "../../views/oldPages/TimeBlockPreview";
import { Typography } from "@mui/material";

export default function MealComp() {
  return (
    <>
      <Typography sx={{ mt: 5 }} variant="h3">
        Kokoa ateria:
      </Typography>
      <Typography>Lapsen ikään sopivia ruokia: (map methodilla)</Typography>
      <TimeBlockPreview />
    </>
  );
}
