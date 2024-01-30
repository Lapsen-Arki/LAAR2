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
import { AddDataToDatabase } from "../../types/types";
import { adminAddData } from "../../api/adminAddData";
import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import PleaseLoginModal from "../../components/pleaseLoginModal";
import { TokenContextType } from "../../types/types";

// TODO: add following features: 1. Remove data from recommendation database collection
// 2. Adding feature for adding and removing admin users by superuser

const AdminPage = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [formData, setFormData] = React.useState<AddDataToDatabase>({
    choice: "",
    name: "",
    ageLimit: 0,
    photoLink: "",
    photoFileName: "",
  });
  const { idToken } = useContext(TokenContext) as TokenContextType;

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const submitData = { category, ...formData };
    const response = await adminAddData(submitData);
    if (response && response.error) {
      setErrorMessage(response.error);
    } else {
      setSuccessMessage(
        "Tietokantaan tallentaminen onnistui! Lisää uusi tieto tai voit poistua sivulta."
      );
    }
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
            name="category"
            labelId="category-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
            required
          >
            {/* Replace these MenuItem values with your actual categories */}
            <MenuItem value="aktiviteetti">Aktiviteetti</MenuItem>
            <MenuItem value="pieniAteria">Pieni ateria</MenuItem>
            <MenuItem value="isoAteria">Iso ateria</MenuItem>
            <MenuItem value="iltatoimi">Iltatoimi</MenuItem>
            <MenuItem value="nukkuminen">Nukkuminen</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="choice"
          fullWidth
          label="Valikko"
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="name"
          fullWidth
          label="Nimi"
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="ageLimit"
          fullWidth
          label="Ikäraja/kk"
          margin="normal"
          type="number"
          onChange={handleChange}
          required
        />
        <h3>Kuva</h3>
        <p>Valitse kuvan URL linkki tai valitse tiedosto:</p>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="photoLink"
          fullWidth
          label="Kuvan linkki"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="photoFileName"
          fullWidth
          margin="normal"
          type="file"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Tallenna tietokantaan
        </Button>
        <Typography sx={{ color: "red", marginBottom: 2, marginTop: 2 }}>
          {errorMessage}
        </Typography>
        <Typography sx={{ color: "green", marginBottom: 2, marginTop: 2 }}>
          {successMessage}
        </Typography>
      </form>
    </div>
  );
};

export default AdminPage;
