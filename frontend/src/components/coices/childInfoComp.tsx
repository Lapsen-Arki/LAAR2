import { Typography } from "@mui/material";

export default function ChildInfoComp({
  selectedChild,
}: {
  selectedChild: string | null;
}) {
  return (
    <>
      <Typography variant="h4">{selectedChild}</Typography>
      <Typography variant="body1">
        Avatar nimen viereen ja Lyhyt kuvaus tähän?
      </Typography>
    </>
  );
}
