import { Box, Button, CardMedia, Typography } from "@mui/material";
import { RecommendationsType } from "../../types/recommTypes";
import useGetRecommData from "../../customHooks/useGetRecommData";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { useNavigate } from "react-router-dom";

// Now there is 3 types of tips: "päiväunet", "iltatoimet", "nukkuminen".
// More tips can be added by changing the choices page and adding more advise types.
// This component renders all advises with matching adviseType

// EXTRA FEATURE: make feature to hide and show tips.

export default function TipsComp({ adviseType }: { adviseType: string }) {
  const { isLoggedIn } = useContext(TokenContext);
  const navigate = useNavigate();
  const registerNowClick = () => {
    navigate("/register");
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
            <Typography variant="h4">{recommendation.title}</Typography>

            {Object.entries(recommendation.textContent).map(([key, value]) => (
              <Typography
                key={key}
                component="pre"
                style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}
              >
                {value}
              </Typography>
            ))}
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
