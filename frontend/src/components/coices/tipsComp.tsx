import { Box, Button, CardMedia, Collapse, Typography } from "@mui/material";
import { RecommendationsType } from "../../types/recommTypes";
import useGetRecommData from "../../customHooks/useGetRecommData";
import { useContext, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Now there is 3 types of tips: "päiväunet", "iltatoimet", "nukkuminen".
// More tips can be added by changing the choices page and adding more advise types.
// This component renders all advises with matching adviseType

// EXTRA FEATURE: make feature to hide and show tips.

interface CollapseOpen {
  [key: string]: boolean;
}

export default function TipsComp({ adviseType }: { adviseType: string }) {
  const { isLoggedIn } = useContext(TokenContext);
  const [collapseOpen, setCollapseOpen] = useState<CollapseOpen>({});
  const navigate = useNavigate();
  const registerNowClick = () => {
    navigate("/register");
  };

  const handleCollapse = (itemName: string) => {
    setCollapseOpen((prevCollapseOpen) => ({
      ...prevCollapseOpen,
      [itemName]: !prevCollapseOpen[itemName],
    }));
  };

  const correctPhoto = (recommendation: RecommendationsType) => {
    let photoLink: string | null;
    if (recommendation.photos) {
      const photoValues = Object.values(recommendation.photos);

      photoLink = photoValues[0];
      return photoLink;
    }
  };

  const fetchType = "tip";

  const recommendations: RecommendationsType[] = useGetRecommData(fetchType);
  return (
    <div>
      {recommendations.map((recommendation, index) => {
        const correctImage = correctPhoto(recommendation);

        // Check advise type here
        if (recommendation.type !== adviseType) {
          return;
        }
        return (
          <div key={index}>
            <Typography sx={{ mt: 2 }} variant="h4">
              {recommendation.title}
            </Typography>

            <Button
              variant="outlined"
              sx={{
                fontSize: 8,
                p: 0,
                width: 2,
                mb: 1,
              }}
              onClick={() => handleCollapse(recommendation.title)}
            >
              {!collapseOpen[recommendation.title] && (
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              )}
              {collapseOpen[recommendation.title] && (
                <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
              )}
            </Button>

            <Collapse in={collapseOpen[recommendation.title]}>
              {recommendation.photos && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={correctImage}
                    alt="Placeholder Image"
                    sx={{ maxWidth: 300, maxHeight: 300 }}
                  />
                </Box>
              )}

              {Object.entries(recommendation.textContent).map(
                ([key, value]) => (
                  <Typography
                    key={key}
                    component="pre"
                    style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}
                  >
                    {value}
                  </Typography>
                )
              )}
            </Collapse>
            <hr />
            {!isLoggedIn && (
              <>
                <Button
                  onClick={registerNowClick}
                  sx={{ mt: 5, mb: 2 }}
                  variant="contained"
                >
                  Rekisteröidy nyt!
                </Button>
                <Typography>
                  Rekisteröidy nyt avataksesi kaikki ominaisuudet!
                </Typography>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
