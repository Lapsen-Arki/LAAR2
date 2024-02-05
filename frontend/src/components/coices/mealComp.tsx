import { Typography, Grid, Card, CardActionArea } from "@mui/material";

export default function MealComp() {
  // Example data:
  const childAge = 12;
  const recommendations = [
    {
      id: 1,
      title: "Juoma",
      menuItems: { maito: 0, mehu: 14, kiisseli: 1, juusto: 5 },
    },
    { id: 2, title: "Leipä", menuItems: { näkkileipä: 12, hapankorppu: 14 } },
    { id: 3, title: "Kasvis", menuItems: { kurkku: 1, tomaatti: 1 } },
  ];

  // 1 This component will be fetching meal recommendation data
  // 2. And passing it to recommComp.tsx to render the recommendations.

  // - Lisää iso vs pieni ateria tunniste
  // - Tee aterian valinta useState list
  // - Valittujen laatikoiden tyylin muutos
  // - Refactoroi suositukset omaan komponenttin -> käytä aterioissa ja aktiviteeteissa
  // - Button tulos sivulle ja routtaus

  return (
    <>
      <Typography sx={{ mt: 5 }} variant="h3">
        Kokoa ateria:
      </Typography>
      <Typography>Lapsen ikään sopivia ruoka suosituksia:</Typography>
      {/* RECOMMENDATIONS: */}
      {/* TODO: refactor this to recommComp.tsx, so it will be reusable: */}
      {recommendations.map((recommendation) => (
        <div style={{ marginTop: 25 }}>
          <Typography variant="h5">{recommendation.title}: </Typography>
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            {/* Iterate trough all the recommendations in the object */}
            {Object.entries(recommendation.menuItems).map(([key, value]) => {
              if (value <= childAge) {
                return (
                  <Grid item xs={11} sm={6} md={4} key={key}>
                    <Card>
                      <CardActionArea
                        key={key}
                        sx={{ padding: 2, minHeight: 100 }}
                      >
                        <Typography variant="h6">{key}</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
      ))}
    </>
  );
}
