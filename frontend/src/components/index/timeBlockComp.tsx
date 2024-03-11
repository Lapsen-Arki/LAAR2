import { taaperoRytmi } from "./blockData";
import { Grid, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Hidden } from "@mui/material";

export default function TimeBlockComp({
  childName,
}: {
  childName: string | null;
}) {
  const navigate = useNavigate();

  //   Routing to next page with renderIdentifier:
  const handleBlockClick = (blockTitle: string) => {
    navigate("/choices", { state: { renderIdentifier: blockTitle } });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Hidden smDown>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <ArrowForwardIcon />
          <ArrowForwardIcon />
          <ArrowForwardIcon />
        </div>
      </Hidden>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 15,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Mapping the timeBlockData */}
        {taaperoRytmi.map((block, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardActionArea
                key={index}
                onClick={() => handleBlockClick(block.title)}
                sx={{ padding: 2, minHeight: 150 }}
              >
                {childName && <Typography>{childName}</Typography>}
                <Typography variant="h6">{block.title}</Typography>
                <Typography variant="body1">{block.period}</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
