import { Typography } from "@mui/material";

// Fetching here the real data or taking it form sessionStorage/context
const recommendations: RecommendationsType[] = [
  {
    id: 1,
    title: "Juoma",
    menuItems: { maito: 0, mehu: 14, kiisseli: 1, juusto: 5 },
  },
  { id: 2, title: "Leipä", menuItems: { näkkileipä: 12, hapankorppu: 14 } },
  { id: 3, title: "Kasvis", menuItems: { kurkku: 1, tomaatti: 1 } },
];

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
