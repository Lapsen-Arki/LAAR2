import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ReturnBtn from "../components/returnBtn";
import { useContext, useEffect, useState } from "react";
import { RecommendationsType } from "../types/recommTypes";
import ChildInfoComp from "../components/coices/childInfoComp";
import { TokenContext } from "../contexts/tokenContext";
import { activityRecomm } from "../utils/previewData/activityRecomm";
import { mealRecomm } from "../utils/previewData/mealRecomm";

export default function Results() {
  const [resultData, setResultData] = useState<RecommendationsType[]>([]);
  const location = useLocation();
  const { isLoggedIn } = useContext(TokenContext);
  const { selectionList, isMealPage } = location.state;

  useEffect(() => {
    let recommsJSON;
    if (isLoggedIn) {
      if (isMealPage) {
        recommsJSON = sessionStorage.getItem("meal");
      } else {
        recommsJSON = sessionStorage.getItem("activity");
      }

      if (recommsJSON) {
        const recomms: RecommendationsType[] = JSON.parse(recommsJSON);
        const recommItems = recomms.filter((recomm) =>
          Object.keys(recomm.recomm).some((key) => selectionList.includes(key))
        );

        setResultData(recommItems);
      }
    } else {
      if (isMealPage) {
        const recommItems = mealRecomm.filter((recomm) =>
          Object.keys(recomm.recomm).some((key) => selectionList.includes(key))
        );
        setResultData(recommItems);
      } else {
        const recommItems = activityRecomm.filter((recomm) =>
          Object.keys(recomm.recomm).some((key) => selectionList.includes(key))
        );
        setResultData(recommItems);
      }
    }
  }, [isMealPage, selectionList, isLoggedIn]);

  return (
    <Container>
      <ReturnBtn />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Tulokset
      </Typography>
      <ChildInfoComp mealType={isMealPage} />
      <Grid
        container
        sx={{ mt: 5, mb: 15, textAlign: "center", justifyContent: "center" }}
      >
        {resultData &&
          resultData?.map((result, index) => {
            return (
              <div key={index}>
                <Typography variant="h5">{result.title}</Typography>
                {Object.entries(result.photos || {}).map(([item, link]) => {
                  if (!selectionList.includes(item)) {
                    return null;
                  }
                  return (
                    <Grid item key={item} sx={{ m: 1 }}>
                      <Typography variant="h6">{item}</Typography>{" "}
                      {link && (
                        <Box
                          sx={{
                            width: 350, // Set width
                            height: 350, // Set height to maintain 1:1 aspect ratio
                            display: "flex", // Use flex to center the image
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden", // Ensure the image is cropped to fit the box
                            backgroundColor: "none", // Example background color
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={link}
                            alt={item}
                            sx={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover", // Ensure the image covers the area, maintaining aspect ratio
                            }}
                          />
                        </Box>
                      )}
                      <Typography>{result.textContent[item]}</Typography>
                    </Grid>
                  );
                })}
              </div>
            );
          })}
      </Grid>
      <ReturnBtn />
    </Container>
  );
}
