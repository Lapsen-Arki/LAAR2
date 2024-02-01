import { timeBlockData } from "./blockData";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";

export default function TimeBlockComp() {
  return (
    <Grid container spacing={2} sx={{ mt: 5, mb: 15 }}>
      {timeBlockData.map((block, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardActionArea href="#" sx={{ padding: 2, minHeight: 150 }}>
              {/* Placeholder for text, replace with actual content as needed */}
              <Typography variant="h6">{block.title}</Typography>
              <Typography variant="body1">{block.period}</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
