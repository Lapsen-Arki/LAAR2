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
import { FormDataToBackend } from "../../types/recommTypes";
import { adminAddData } from "../../api/adminAddData";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import PleaseLoginModal from "../../components/modals/pleaseLoginModal";
import { FinalDataToBackend } from "../../types/recommTypes";

// TODO: 1. More frequent login status checks

const AdminPage = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [typeSelect, setTypeSelect] = React.useState("");
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataToBackend>({
    title: "",
    name: "",
    textContent: "",
    ageLimit: 0,
    photoLink: "",
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

    const submitData: FinalDataToBackend = {
      category,
      typeSelect,
      ...formData,
    };

    const response = await adminAddData(idToken, submitData);
    if (response && response.error) {
      setErrorMessage(response.error);
      setInterval(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      setSuccessMessage(
        "Tietokantaan tallentaminen onnistui! Lisää uusi tieto tai voit poistua sivulta."
      );
      setInterval(() => {
        setSuccessMessage("");
      }, 5000);
    }
  };

  let typeMenuItems;
  if (category) {
    typeMenuItems =
      category === "meal"
        ? [
            { value: "small", label: "pieni" },
            { value: "big", label: "iso" },
            { value: "both", label: "molemmat" },
          ]
        : [
            { value: "nap", label: "päiväunet" },
            { value: "bedtime", label: "iltatoimet" },
            { value: "sleep", label: "nukkuminen" },
          ];
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <Typography variant="h3">Admin Page</Typography>
      <Typography variant="h5">Lisää tieto:</Typography>
      <Typography variant="body1">
        HUOM! Täytä lomakkeet hyvin huolellisesti ja tarkista oikeinkirjoitus.
      </Typography>
      <Typography variant="body1">
        Jos teet virheitä, niin ne tulee korjata tietokannan kautta.
      </Typography>

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
              setFormData({
                title: "",
                name: "",
                textContent: "",
                ageLimit: 0,
                photoLink: "",
              });
              setCategory(e.target.value);
            }}
            required
          >
            <MenuItem value="meal">ateria</MenuItem>
            <MenuItem value="activity">aktiviteetti</MenuItem>
            <MenuItem value="tip">vinkki</MenuItem>
          </Select>
        </FormControl>
        {category !== "activity" && (
          <Typography>
            Tyyppi määrittää missä tai missä time blockissa sisältö näytetään.
            Tämä ei näy käyttäjälle:
          </Typography>
        )}

        {/*type / identifier: */}
        {category !== "activity" && (
          <FormControl fullWidth margin="dense">
            <InputLabel id="type-select">Tyyppi</InputLabel>
            <Select
              sx={{
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
          margin="dense"
          onChange={handleChange}
          required
        />
        <Typography>
          Ruuan tai aktiviteetin nimi. HUOM. Älä lisää identtisiä nimiä samalla
          otsikolla, kategorialla ja tyypillä.
        </Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="name"
          fullWidth
          label="Nimi"
          margin="dense"
          onChange={handleChange}
          required
        />
        <Typography>Ikäraja kuukausina:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="ageLimit"
          fullWidth
          label="Ikäraja/kk"
          margin="dense"
          type="number"
          onChange={handleChange}
          required
        />

        <Typography>Vinkin tai tulossivun tekstisisältö:</Typography>
        <TextareaAutosize
          name="textContent"
          minRows={8} // Minimum number of rows
          maxRows={8} // Maximum number of rows
          style={{ width: 495 }}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />

        <div>
          <Typography variant="h5">Kuva</Typography>
          <Typography>Valitse kuvan URL linkki:</Typography>
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
          <Typography>
            Tallenna kuvat ensin tietokantaan manuaalisesti ja käytä oikeaa
            kuvan linkkiä tässä tai käytä vaihtoehtoisesti toisen
            palveluntarjoajan kuvaa.
          </Typography>

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
