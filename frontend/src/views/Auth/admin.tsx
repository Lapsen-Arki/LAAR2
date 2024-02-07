import React from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { AddDataToDatabase } from "../../types/types";
import { adminAddData } from "../../api/adminAddData";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import PleaseLoginModal from "../../components/modals/pleaseLoginModal";

// TODO: add following features: 1. Remove data from recommendation database collection
// 2. Adding feature for adding and removing admin users by superuser

const AdminPage = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [typeSelect, setTypeSelect] = React.useState("");
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [formData, setFormData] = React.useState<AddDataToDatabase>({
    choice: "",
    name: "",
    ageLimit: 0,
    photoLink: "",
    photoFileName: "",
  });
  const { idToken } = useContext(TokenContext);

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const submitData = { category, typeSelect, ...formData };

    const response = await adminAddData(idToken, submitData);
    if (response && response.error) {
      setErrorMessage(response.error);
    } else {
      setSuccessMessage(
        "Tietokantaan tallentaminen onnistui! Lisää uusi tieto tai voit poistua sivulta."
      );
    }
  };

  let typeMenuItems;
  if (category) {
    typeMenuItems =
      category === "ateria"
        ? [
            { value: "small", label: "pieni" },
            { value: "big", label: "iso" },
            { value: "both", label: "molemmat" },
          ]
        : [
            { value: "päiväunet", label: "päiväunet" },
            { value: "iltatoimet", label: "iltatoimet" },
            { value: "nukkuminen", label: "nukkuminen" },
          ];
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <Typography variant="h3">Admin Page</Typography>
      <h3>Lisää tiedot:</h3>

      {/*main category */}
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
            onChange={(e) => {
              if (typeSelect) {
                // Reset type field if selected to prevent out of range warning
                setTypeSelect("");
              }
              setCategory(e.target.value);
            }}
            required
          >
            <MenuItem value="ateria">ateria</MenuItem>
            <MenuItem value="aktiviteetti">aktiviteetti</MenuItem>
            <MenuItem value="vinkki">vinkki</MenuItem>
          </Select>
        </FormControl>
        {/*type / identifier: */}
        {category !== "aktiviteetti" && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-select">Tyyppi</InputLabel>
            <Select
              sx={{
                marginTop: 0,
                background: "white",
              }}
              name="type"
              labelId="type-label"
              id="type-select"
              label="type"
              value={typeSelect}
              onChange={(e) => setTypeSelect(e.target.value)}
              required
            >
              {typeMenuItems &&
                typeMenuItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="title"
          fullWidth
          label="otsikko"
          margin="normal"
          onChange={handleChange}
          required
        />

        {category !== "vinkki" ? (
          <div>
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
          </div>
        ) : (
          <div>
            <Typography>Teksti sisältö:</Typography>

            <TextareaAutosize
              name="textContents"
              minRows={8} // Minimum number of rows
              maxRows={8} // Maximum number of rows
              style={{ width: 495 }}
              onChange={() => handleChange}
              required
            />
            <Typography>
              HUOM: Teksti formatoituu täsmälleen samalla tavalla kuin kirjoitat
              sen tähän. mm. rivinvaihdot, välimerkit jne.
            </Typography>
          </div>
        )}

        {/* Backend is checking if there is photo, but if category is tip it's optional  */}
        {/* TODO: add opitional photo for tips and required for meals and activity */}

        <div>
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
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
