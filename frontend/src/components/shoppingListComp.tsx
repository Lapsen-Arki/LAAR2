import { Paper, Typography } from "@mui/material";

export default function ShoppingListComp({
  shoppingList,
}: {
  shoppingList: string[];
}) {
  return (
    <Paper
      sx={{ p: 3, pb: 5, maxWidth: 280, m: 5 }}
      variant="elevation"
      elevation={10}
    >
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
  );
}
