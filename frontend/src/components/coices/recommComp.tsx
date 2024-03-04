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
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/tokenContext";
import { getSubscriptionStatus } from "../../api/stripeSubscriptions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingListComp from "../shoppingListComp";
import ReturnBtn from "../returnBtn";

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
  const [shoppingList, setShoppingList] = useState<string[] | null>(null);
  const { isLoggedIn, idToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubStatus = async () => {
      let subscribedStatus;
      if (idToken) {
        subscribedStatus = await getSubscriptionStatus(idToken);
        setSubscribed(subscribedStatus);
      }
    };
    getSubStatus();
    const savedShoppingListJSON = localStorage.getItem("shoppingList");
    if (savedShoppingListJSON) {
      const savedShoppingList = JSON.parse(savedShoppingListJSON);
      setShoppingList(savedShoppingList);
    }
  }, [idToken]);

  const handleShoppingList = () => {
    // 1. Tallentaa tai päivittää ensin session storageen
    const shoppingListJSON = localStorage.getItem("shoppingList");
    if (!shoppingListJSON) {
      localStorage.setItem("shoppingList", JSON.stringify(selectionList));
      setShoppingList(selectionList);
    } else {
      const oldShoppingList = JSON.parse(shoppingListJSON);
      const filteredList = selectionList.filter(
        (item) => !oldShoppingList.includes(item)
      );
      const newList: string[] = [...oldShoppingList, ...filteredList];
      localStorage.setItem("shoppingList", JSON.stringify(newList));
      setShoppingList(newList);
    }
    // 2. 10-30 sekunnun timeoutin jälkeen tallentaa tietokantaan, eli kutsuu API function:
    // Koska muuten: "eikun lisäänkin mansikat vielä ostoslistalle" tms
  };

  const handleCollapse = (itemName: string) => {
    setCollapseOpen((prevCollapseOpen) => ({
      ...prevCollapseOpen,
      [itemName]: !prevCollapseOpen[itemName],
    }));
  };

  const handleClick = () => {
    navigate("/results", {
      state: { selectionList, isMealPage: mealType },
    });
    window.scrollTo(0, 0);
  };

  const registerNowClick = () => {
    navigate("/register");
    window.scrollTo(0, 0);
  };

  const subscribeNowClick = () => {
    navigate("/subscription");
    window.scrollTo(0, 0);
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
                  borderColor: "#fad4b4",
                  pr: 2,
                  pb: 2,
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

      <div style={{ textAlign: "right" }}>
        <div>
          {/* Kokoa Ateria btn */}
          {subscribed && isLoggedIn && selectedBox.length > 0 && (
            <Button
              onClick={handleClick}
              sx={{ mt: 0.5, mb: 0.5, mr: 0.5 }}
              variant="contained"
            >
              {mealType ? "Kokoa Ateria" : "Valitse aktiviteetti"}
            </Button>
          )}
          {/* Ostoslistqa btn */}
          {mealType && selectedBox.length > 0 && (
            <Button
              onClick={handleShoppingList}
              sx={{ mt: 0.5, mb: 0.5, mr: 0.5 }}
              variant="contained"
            >
              {shoppingList ? "Lisää ostoslistalle" : "Luo ostoslista"}
            </Button>
          )}
        </div>

        {/* Avaa kaikki ominaisuudet btn */}
        {!isLoggedIn && selectedBox.length > 0 && (
          <>
            <Button
              onClick={registerNowClick}
              sx={{ mt: 0.5, mb: 0.5, mr: 0.5 }}
              variant="contained"
            >
              Rekisteröidy nyt!
            </Button>
            <Typography>
              Avaa kaikki ominaisuudet ja aloita 14 päivän ilmainen kokeilu!
            </Typography>
          </>
        )}
        {/* Jatka tilausta btn */}
        {isLoggedIn && !subscribed && selectedBox.length > 0 && (
          <>
            <Button
              onClick={subscribeNowClick}
              sx={{ mt: 0.5, mb: 0.5, mr: 0.5 }}
              variant="contained"
            >
              Jatka tilausta
            </Button>
            <Typography>Ja avaa kaikki ominaisuudet!</Typography>
          </>
        )}
        <div style={{ marginTop: 50 }}>
          <ReturnBtn message="Palaa etusivulle" />
        </div>
        {/* Shopping list: */}
        {shoppingList && mealType && (
          <div style={{ textAlign: "left" }}>
            <ShoppingListComp shoppingList={shoppingList} />

            {shoppingList.length > 15 && (
              <ReturnBtn message="palaa etusivulle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
