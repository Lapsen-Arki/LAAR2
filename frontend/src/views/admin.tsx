import React from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const AdminPage = () => {
  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Typography variant="h3">Admin Page</Typography>
      <Typography variant="body1">Lisää tiedot:</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          sx={{
            marginTop: 0,
            background: "white",
          }}
          labelId="category-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          {/* Replace these MenuItem values with your actual categories */}
          <MenuItem value="Category 1">Category 1</MenuItem>
          <MenuItem value="Category 2">Category 2</MenuItem>
          <MenuItem value="Category 3">Category 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        sx={{
          marginTop: 0,
          background: "white",
        }}
        fullWidth
        label="Item"
        margin="normal"
      />
      <TextField
        sx={{
          marginTop: 0,
          background: "white",
        }}
        fullWidth
        label="Age Limit"
        margin="normal"
        type="number"
      />

      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Tallenna tietokantaan
      </Button>
    </div>
  );
};

export default AdminPage;
