import { Typography, Grid, Card, CardActionArea, Button } from "@mui/material";
import { RecommendationsType } from "../../types/recommTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Getting real child data somewhere:

export default function RecommComp({
  recommendations,
  multipleSelections,
  mealType = null,
  childAge,
  selectedChild,
}: {
  recommendations: RecommendationsType[];
  multipleSelections: boolean;
  mealType?: string | null;
  childAge: number;
  selectedChild: string;
}) {
  // selectedChild pitää saada tänne -> resetoida selectionList kun se muuttuu.
  const [selectedBox, setSelectedBox] = useState<string | string[]>("");
  const [selectionList, setSelectionList] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/results", {
      state: { selectionList, isMealPage: multipleSelections },
    });
  };

  // Reset selectionList if selected child changes
  useEffect(() => {
    setSelectionList([]);
    setSelectedBox("");
  }, [selectedChild]);

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
      setSelectionList([itemName]);
    }
  };

  return (
    <div>
      {recommendations.map((recommendation, index) => {
        let titleRendered = 0; // <- when 2 not rendering more
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
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
              {/* Iterate trough all the recommendations in the object */}
              {Object.entries(recommendation.recomm).map(
                ([itemName, ageLimit]) => {
                  const numAgeLimit = Number(ageLimit);
                  const numChildAge = Number(childAge);
                  console.log(`ageLimit: ${ageLimit}, childAge: ${childAge}`);
                  if (numAgeLimit === 0 || numAgeLimit <= numChildAge) {
                    console.log("in if statement block");

                    titleRendered++;
                    return (
                      <Grid item xs={11} sm={6} md={4} key={itemName}>
                        <Grid
                          sx={{
                            minHeight: { sm: "32px" }, // Apply minHeight starting from the 'md' breakpoint
                          }}
                        >
                          {titleRendered === 1 && (
                            <Typography variant="h5">
                              {recommendation.title}:
                            </Typography>
                          )}
                        </Grid>
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
      {selectedBox.length > 0 && (
        <Button onClick={handleClick} sx={{ mt: 5, mb: 5 }} variant="contained">
          {mealType ? "Kokoa Ateria" : "Valitse aktiviteetti"}
        </Button>
      )}
    </div>
  );
}
