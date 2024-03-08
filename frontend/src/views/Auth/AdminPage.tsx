import React, { useState } from "react";
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
import {
  TitleInstructions,
  TypeInstructions,
} from "../../components/adminInstructions";

// TODO: 1. More frequent login status checks
const AdminPage = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [typeSelect, setTypeSelect] = React.useState("");
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openTitleInstructions, setOpenTitleInstructions] = useState(false);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataToBackend>({
    title: "",
    name: "",
    textContent: "",
    ageLimit: undefined,
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
      setSuccessMessage("");
      setErrorMessage(response.error);
    } else {
      setErrorMessage("");
      setSuccessMessage(
        "Tietokantaan tallentaminen onnistui! Lisää uusi tieto tai voit poistua sivulta."
      );
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
      <Typography variant="body1">
        <strong style={{ color: "red" }}>
          HUOM! Täytä lomakkeet hyvin huolellisesti ja tarkista oikeinkirjoitus.
        </strong>
      </Typography>
      <Typography variant="body1">
        Jos teet virheitä, niin ne tulee korjata manuaalisesti tietokannan
        kautta.
      </Typography>

      <Typography variant="h5">Lisää tieto:</Typography>

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
                ageLimit: undefined,
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
          <div>
            <Typography>
              Tyyppi on <strong>tekninen tunniste</strong>, joka määrittää missä
              time blockissa/blockeissa sisältö näytetään.{" "}
              <strong>tyyppejä voi olla tällä hetkellä vain 3</strong>, sillä
              tyyppejä voidaan esittää vinkeissä ja aterioissa ainoastaan 3 eri
              tavalla. <strong>TYYPPI EI NÄY KÄYTTÄJÄLLE. </strong>
            </Typography>
            <br />
            <Typography>
              <strong>Tyyppi = missä blockissa ja miten data näytetään.</strong>
            </Typography>
            <br />
            <Button
              variant="outlined"
              onClick={() => setOpenInstructions(!openInstructions)}
            >
              <strong>Avaa ohjeet tyyppien käyttöön:</strong>
            </Button>
            <TypeInstructions openTypeInstructions={openInstructions} />
          </div>
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
        <Typography sx={{ mt: 2 }}>
          Otsikko minkä alla näkyy aktiviteetti tai ateria ehdotukset. <br />
          <strong>
            HUOM. Kirjoita otsikot täsmälleen smalla tavalla, jos haluat ruuat,
            aktiviteetit tai vinkit saman otsikon alle.
          </strong>
        </Typography>
        <Button
          variant="outlined"
          sx={{ mb: 1 }}
          onClick={() => setOpenTitleInstructions(!openTitleInstructions)}
        >
          <strong>Avaa ohjeet otsikon käyttöön:</strong>
        </Button>
        <TitleInstructions openTitleInstructions={openTitleInstructions} />
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="title"
          fullWidth
          value={formData.title}
          label="otsikko"
          margin="dense"
          onChange={handleChange}
          required
        />
        <Typography sx={{ mt: 2 }}>
          Ruuan tai aktiviteetin nimi.{" "}
          <strong>HUOM. Älä lisää identtisiä nimiä.</strong>
        </Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="name"
          value={formData.name}
          fullWidth
          label="Nimi"
          margin="dense"
          onChange={handleChange}
          required
        />
        <Typography sx={{ mt: 2 }}>Ikäraja kuukausina:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="ageLimit"
          value={formData.ageLimit}
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
          value={formData.textContent}
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
            value={formData.photoLink}
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
