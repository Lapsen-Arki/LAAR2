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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Typography variant="h3">Admin Page</Typography>
      <h3>Lisää tiedot:</h3>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Kategoria</InputLabel>
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
            <MenuItem value="Category 1">Aktiviteetit</MenuItem>
            <MenuItem value="Category 2">Pienet ateriat</MenuItem>
            <MenuItem value="Category 3">Isot ateriat</MenuItem>
            <MenuItem value="Category 4">Iltatoimet</MenuItem>
            <MenuItem value="Category 5">Nukkuminen</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          fullWidth
          label="Valikko"
          margin="normal"
        />
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          fullWidth
          label="Nimi"
          margin="normal"
        />
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          fullWidth
          label="Ikäraja/kk"
          margin="normal"
          type="number"
        />
        <h3>Kuva</h3>
        <p>Valitse kuvan URL linkki tai valitse tiedosto:</p>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          fullWidth
          label="Kuvan linkki"
          margin="normal"
        />

        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          fullWidth
          margin="normal"
          type="file"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Tallenna tietokantaan
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
