import { Button, Typography } from "@mui/material";
import ReturnBtn from "../returnBtn";
import ShoppingListComp from "../shoppingListComp";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";

export default function RecommButtons({
  subscribed,
  selectedBox,
  mealType,
  selectionList,
}: {
  subscribed: boolean | null;
  selectedBox: string | string[];
  mealType: string | null;
  selectionList: string[];
}) {
  const [shoppingList, setShoppingList] = useState<string[] | null>(null);
  const { isLoggedIn, idToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedShoppingListJSON = localStorage.getItem("shoppingList");
    if (savedShoppingListJSON) {
      const savedShoppingList = JSON.parse(savedShoppingListJSON);
      setShoppingList(savedShoppingList);
    }
  }, [idToken]);

  const handleClick = () => {
    navigate("/results", {
      state: { selectionList, isMealPage: mealType },
    });
    window.scrollTo(0, 0);
  };

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

  const registerNowClick = () => {
    navigate("/register");
    window.scrollTo(0, 0);
  };

  const subscribeNowClick = () => {
    navigate("/subscription");
    window.scrollTo(0, 0);
  };

  return (
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

          {shoppingList.length > 15 && <ReturnBtn message="palaa etusivulle" />}
        </div>
      )}
    </div>
  );
}
