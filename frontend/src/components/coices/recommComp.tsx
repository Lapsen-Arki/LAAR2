import { Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
import { RecommendationsType } from "../../types/typesFrontend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Getting real child data somewhere:

export default function RecommComp({
  recommendations,
  multipleSelections,
  mealType = null,
  childAge,
}: {
  recommendations: RecommendationsType[];
  multipleSelections: boolean;
  mealType?: string | null;
  childAge: number;
}) {
  const [selectedBox, setSelectedBox] = useState<string | string[]>("");
  const [selectionList, setSelectionList] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (mealType) {
      navigate("/meal-results", { state: selectionList });
    } else {
      navigate("/meal-results", { state: selectionList });
    }
  };

  const selectionHandler = (itemName: string) => {
    if (multipleSelections) {
      // add the key to the list
      setSelectionList((prev) => {
        const itemIndex = prev.indexOf(itemName);

        if (itemIndex === -1) {
          return [...prev, itemName];
        } else {
          return prev.filter((item) => item !== itemName);
        }
      });

      setSelectedBox((prev) => {
        const isAlreadySelected = prev.includes(itemName);

        if (isAlreadySelected && Array.isArray(prev)) {
          return prev.filter((item) => item !== itemName);
        }

        return [...prev, itemName];
      });
    } else {
      // add one key to the state
      setSelectedBox(itemName);
    }
  };

  return (
    <div>
      {recommendations.map((recommendation, index) => {
        if (mealType) {
          if (
            recommendation.type !== mealType &&
            recommendation.type !== "both"
          ) {
            return;
          }
        }
        return (
          <div key={index} style={{ marginTop: 25 }}>
            {/* TODO: do not render title if not any recommendations */}
            <Typography variant="h5">{recommendation.title}: </Typography>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
              {/* Iterate trough all the recommendations in the object */}

              {Object.entries(recommendation.content).map(
                ([itemName, ageLimit]) => {
                  if (ageLimit <= childAge) {
                    return (
                      <Grid item xs={11} sm={6} md={4} key={itemName}>
                        <Card>
                          <CardActionArea
                            sx={{
                              padding: 2,
                              minHeight: 80,
                              backgroundColor: Array.isArray(selectedBox)
                                ? selectedBox.includes(itemName)
                                  ? "orange"
                                  : "white"
                                : selectedBox === itemName
                                ? "orange"
                                : "white",
                            }}
                            onClick={() => selectionHandler(itemName)}
                          >
                            <Typography variant="h6">{itemName}</Typography>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  }
                }
              )}
            </Grid>
          </div>
        );
      })}
      <Button onClick={handleClick} sx={{ mt: 5, mb: 5 }} variant="contained">
        {mealType ? "Kokoa Ateria" : "Valitse aktiviteetti"}
      </Button>
    </div>
  );
}
