import { Typography, Grid, Card, CardActionArea } from "@mui/material";
import { RecommendationsType } from "../../types/types";
import { useState } from "react";

// Getting real child data somewhere:
const childAge = 12;

export default function RecommComp({
  recommendations,
  multipleSelections,
}: {
  recommendations: RecommendationsType[];
  multipleSelections: boolean;
}) {
  const [selectedBox, setSelectedBox] = useState<string | string[]>("");

  const selectionHandler = (itemName: string) => {
    if (multipleSelections) {
      // add the key to the list
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
      {recommendations.map((recommendation) => (
        <div style={{ marginTop: 25 }}>
          <Typography variant="h5">{recommendation.title}: </Typography>
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            {/* Iterate trough all the recommendations in the object */}
            {Object.entries(recommendation.menuItems).map(
              ([itemName, ageLimit]) => {
                if (ageLimit <= childAge) {
                  return (
                    <Grid item xs={11} sm={6} md={4} key={itemName}>
                      <Card>
                        <CardActionArea
                          key={itemName}
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
      ))}
    </div>
  );
}
