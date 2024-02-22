import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
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
      console.log("Not logged in result data");

      if (isMealPage) {
        const recommItems = mealRecomm.filter((recomm) =>
          Object.keys(recomm.recomm).some((key) => selectionList.includes(key))
        );
        setResultData(recommItems);
      } else {
        console.log("activity recomm:");

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
                        <Card>
                          <CardMedia
                            component="img"
                            height="220"
                            image={link}
                            alt={item}
                          />
                        </Card>
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
