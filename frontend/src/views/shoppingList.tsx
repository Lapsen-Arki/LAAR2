import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingListComp from "../components/shoppingListComp";
import ReturnBtn from "../components/returnBtn";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const shoppingListJSON = localStorage.getItem("shoppingList");
    if (shoppingListJSON) {
      const savedShoppingList = JSON.parse(shoppingListJSON);
      setShoppingList(savedShoppingList);
    }
  }, []);

  return (
    <Container sx={{ maxWidth: 350, marginBottom: 50 }}>
      <ReturnBtn />
      {shoppingList.length > 0 ? (
        <ShoppingListComp shoppingList={shoppingList} />
      ) : (
        <>
          <Typography sx={{ textAlign: "center", marginTop: 10 }} variant="h4">
            Ostoslista on tyhjä
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Lisää ostoslistallesi raaka-aineita tai ruokaideoita aterian
            kokoamis sivulla.
          </Typography>
        </>
      )}
      <Typography sx={{ fontSize: 15, mt: 2, textAlign: "center" }}>
        HUOM. Ososlistasi ei näy toisille hoitajille, eikä toisilla laitteilla.
      </Typography>
      {shoppingList.length > 0 && (
        <Button
          onClick={() => {
            localStorage.removeItem("shoppingList");
            setShoppingList([]);
          }}
          sx={{ display: "block", mx: "auto", my: 2 }}
          variant="contained"
        >
          Tyhjennä kauppalista
        </Button>
      )}
    </Container>
  );
}
