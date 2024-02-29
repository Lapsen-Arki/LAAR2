import { Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const shoppingListJSON = sessionStorage.getItem("shoppingList");
    if (shoppingListJSON) {
      const savedShoppingList = JSON.parse(shoppingListJSON);
      setShoppingList(savedShoppingList);
    }
  }, []);

  return (
    <Container>
      <Paper sx={{ p: 2, pb: 5 }} variant="elevation" elevation={10}>
        <Typography
          sx={{ fontFamily: "'Indie Flower', cursive", mb: 2 }}
          variant="h3"
        >
          Ostoslista:{" "}
        </Typography>
        {shoppingList.map((listItem) => {
          return (
            <Typography
              key={listItem}
              variant="body1"
              sx={{
                fontFamily: "'Indie Flower', cursive",
                fontSize: 20,
                marginTop: 1,
              }}
            >
              - {listItem}
            </Typography>
          );
        })}
      </Paper>
    </Container>
  );
}
