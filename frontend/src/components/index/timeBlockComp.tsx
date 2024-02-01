import { timeBlockData } from "./blockData";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TimeBlockComp() {
  const navigate = useNavigate();

  //   Routing to next page and sending block title as renderIdentifier
  //   to render correct page contents
  const handleBlockClick = (blockTitle: string) => {
    navigate("/choices", { state: { renderIdentifier: blockTitle } });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 5, mb: 15, textAlign: "center" }}>
      {/* Mapping the timeBlockData */}
      {timeBlockData.map((block, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardActionArea
              key={index}
              onClick={() => handleBlockClick(block.title)}
              sx={{ padding: 2, minHeight: 150 }}
            >
              <Typography variant="h6">{block.title}</Typography>
              <Typography variant="body1">{block.period}</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
