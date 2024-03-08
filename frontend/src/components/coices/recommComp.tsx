import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  Button,
  Collapse,
} from "@mui/material";
import { RecommendationsType } from "../../types/recommTypes";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { getSubscriptionStatus } from "../../api/stripeSubscriptions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RecommButtons from "./recommButtons";

// Getting real child data somewhere:

interface CollapseOpen {
  [key: string]: boolean;
}

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
  const [subscribed, setSubscribed] = useState<boolean | null>(false);
  const [collapseOpen, setCollapseOpen] = useState<CollapseOpen>({});
  const { idToken } = useContext(TokenContext);

  useEffect(() => {
    const getSubStatus = async () => {
      let subscribedStatus;
      if (idToken) {
        subscribedStatus = await getSubscriptionStatus(idToken);
        setSubscribed(subscribedStatus);
      }
    };
    getSubStatus();
  }, [idToken]);

  const handleCollapse = (itemName: string) => {
    setCollapseOpen((prevCollapseOpen) => ({
      ...prevCollapseOpen,
      [itemName]: !prevCollapseOpen[itemName],
    }));
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

        const filteredItems = Object.entries(recommendation.recomm).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([itemName, ageLimit]) => {
            itemName; // Doing something useless with this so workflow will not whine
            const numAgeLimit = Number(ageLimit);
            const numChildAge = Number(childAge);
            return numAgeLimit === 0 || numAgeLimit <= numChildAge;
          }
        );

        if (filteredItems.length > 0) {
          return (
            <div key={index} style={{ marginTop: 25, marginBottom: 50 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  textAlign: "center",
                  border: "solid",
                  borderColor: collapseOpen[recommendation.title]
                    ? "orange"
                    : "#fad4b4",
                  borderRadius: 5,
                  ml: -1,
                  pr: 2,
                  pb: 2,
                  maxHeight: collapseOpen[recommendation.title] ? "none" : 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Iterate trough all the recommendations in the object */}
                {Object.entries(recommendation.recomm).map(
                  ([itemName, ageLimit]) => {
                    const numAgeLimit = Number(ageLimit);
                    const numChildAge = Number(childAge);
                    if (numAgeLimit === 0 || numAgeLimit <= numChildAge) {
                      titleRendered++;
                      return (
                        <React.Fragment key={itemName}>
                          {titleRendered === 1 && (
                            <Grid item xs={12}>
                              <Typography
                                variant="h5"
                                sx={{
                                  display: "inline-flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {recommendation.title}:
                                <Button
                                  variant="outlined"
                                  sx={{
                                    fontSize: 8,
                                    p: 0,
                                    width: 2,
                                  }}
                                  onClick={() =>
                                    handleCollapse(recommendation.title)
                                  }
                                >
                                  {!collapseOpen[recommendation.title] && (
                                    <KeyboardArrowDownIcon
                                      sx={{ fontSize: 20 }}
                                    />
                                  )}
                                  {collapseOpen[recommendation.title] && (
                                    <KeyboardArrowUpIcon
                                      sx={{ fontSize: 20 }}
                                    />
                                  )}
                                </Button>
                              </Typography>
                            </Grid>
                          )}
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Collapse in={collapseOpen[recommendation.title]}>
                              <Card>
                                <CardActionArea
                                  sx={{
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
                                  <Typography variant="h6">
                                    {itemName}
                                  </Typography>
                                </CardActionArea>
                              </Card>
                            </Collapse>
                          </Grid>
                        </React.Fragment>
                      );
                    }
                  }
                )}
              </Grid>
            </div>
          );
        }
      })}

      <RecommButtons
        subscribed={subscribed}
        selectedBox={selectedBox}
        mealType={mealType}
        selectionList={selectionList}
      />
    </div>
  );
}
