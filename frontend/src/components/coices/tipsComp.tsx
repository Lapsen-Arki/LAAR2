import { Typography } from "@mui/material";

export default function TipsComp({
  renderIdentifier,
}: {
  renderIdentifier: string;
}) {
  renderIdentifier = "tätä tarvitaan oikeiden vinkkien renderöintiin";
  console.log("renderIdentifier: ", renderIdentifier);

  return (
    <>
      <h1>Vinkkejä</h1>
      <Typography>Lapsen ikään ja aktiviteettiin sopivia vinkkejä:</Typography>
      <hr />
    </>
  );
}
