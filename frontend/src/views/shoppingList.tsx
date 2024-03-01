import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingListComp from "../components/shoppingListComp";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  useEffect(() => {
    const shoppingListJSON = sessionStorage.getItem("shoppingList");
    if (shoppingListJSON) {
      const savedShoppingList = JSON.parse(shoppingListJSON);
      setShoppingList(savedShoppingList);
    }
  }, []);

  return (
    <Container>
      <ShoppingListComp shoppingList={shoppingList} />
    </Container>
  );
}
