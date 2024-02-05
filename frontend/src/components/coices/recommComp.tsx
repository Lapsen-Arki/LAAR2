import { Typography, Grid, Card, CardActionArea } from "@mui/material";
import { RecommendationsType } from "../../types/types";

const childAge = 12;

export default function RecommComp({
  recommendations,
}: {
  recommendations: RecommendationsType[];
}) {
  return (
    <div>
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
                        sx={{ padding: 2, minHeight: 80 }}
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
    </div>
  );
}
