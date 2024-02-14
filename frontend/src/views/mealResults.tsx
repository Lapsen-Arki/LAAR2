import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ReturnBtn from "../components/returnBtn";
import { useEffect, useState } from "react";
import { RecommendationsType } from "../types/typesFrontend";

export default function MealResults() {
  const [resultData, setResultData] = useState<RecommendationsType[]>([]);
  const location = useLocation();
  const selectionList = location.state;

  useEffect(() => {
    const recommsJSON =
      sessionStorage.getItem("meal") || sessionStorage.getItem("activity");

    if (recommsJSON) {
      const recomms: RecommendationsType[] = JSON.parse(recommsJSON);
      const recommItems = recomms.filter((recomm) =>
        Object.keys(recomm.content).some((key) => selectionList.includes(key))
      );
      setResultData(recommItems);
    }
  }, [selectionList]);

  return (
    <div>
      <ReturnBtn />
      <Typography variant="h3">Tulokset</Typography>
      <Grid
        container
        sx={{ mt: 5, mb: 15, textAlign: "center", justifyContent: "center" }}
      >
        {resultData?.map((result, index) => {
          return (
            <div key={index}>
              {Object.entries(result.photos || {}).map(([item, link]) => {
                return (
                  <Grid item key={item} sx={{ m: 1 }}>
                    <Typography variant="h5">{item}</Typography>{" "}
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
                  </Grid>
                );
              })}
            </div>
          );
        })}
      </Grid>
    </div>
  );
}
