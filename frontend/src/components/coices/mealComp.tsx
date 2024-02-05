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

  return (
    <>
      <Typography sx={{ mt: 12 }} variant="h3">
        Kokoa ateria:
      </Typography>
      <Typography>Lapsen ikään sopivia ruokia: (map methodilla)</Typography>
      {/* Iterate trough all the objects */}
      {recommendations.map((recommendation) => (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h5">{recommendation.title}: </Typography>
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            {/* Iterate trough all the recommendations in the object */}
            {Object.entries(recommendation.menuItems).map(([key, value]) => {
              if (value <= childAge) {
                return (
                  <Grid item xs={5} sm={5} md={6} key={key}>
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
