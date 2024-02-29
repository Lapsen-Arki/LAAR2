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
  Collapse,
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
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openTitleInstructions, setOpenTitleInstructions] = useState(false);
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
            <Collapse
              in={openInstructions}
              sx={{ border: "solid", borderWidth: 2, p: 2.5, mb: 5, mt: 2 }}
            >
              <Typography>
                <strong>Vinkkeihin on 3 tyyppiä.</strong> Päiväunet, iltatoimet
                ja nukkuminen. <br /> <br />
                <strong>1. päiväunet: </strong>
                Jos valitset päiväunet tyypin, niin vinkki ja se sisällöt kuten
                otsikko, kuva ja tekstisisältö näkyy päiväunet timeblockin
                sisällä. <br /> <strong>2. iltatoimet: </strong> Jos valitset
                iltatoimet tyypin, niin vinkki ja se sisällöt kuten otsikko,
                kuva ja tekstisisältö näkyy iltatoimet timeblockin sisällä.{" "}
                <br />
                <strong>3. nukkuminen: </strong> Jos valitset nukkuminen tyypin,
                niin vinkki ja se sisällöt kuten otsikko, kuva ja tekstisisältö
                näkyy nukkuminen timeblockin sisällä.
                <br />
                <br />
                <strong>Aterioihin on 3 tyyppiä.</strong> Pieni, iso ja
                molemmat. <br /> <br />
                <strong>1. Pieni: </strong>
                Jos valitset pienen aterian tyypin, niin ateriaehdotukset ja
                niiden sisällöt kuten otsikko, kuva ja tekstisisältö näkyvät
                pienien aterioiden timeblockkien sisällä olevilla sivuilla,
                kuten aamupala, välipala ja iltapala. <br />{" "}
                <strong>2. iso: </strong> Jos valitset ison aterian tyypin, niin
                ateriaehdotukset ja niiden sisällöt kuten otsikot, kuvat ja
                tekstisisällöt näkyvät iltatoimet timeblockin sisällä olevilla
                sivuilla, kuten lounas ja päivällinen. <br />
                <strong>3. molemmat: </strong> Jos valitset molempien aterioiden
                tyypin, niin ateria ehdotukset ja niiden sisällöt kuten otsikko,
                kuva ja tekstisisältö näkyy kaikkien ateria timeblockkien
                sisällä olevilla sivuilla.
              </Typography>
            </Collapse>
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
        <Collapse
          sx={{ border: "solid", borderWidth: 2, p: 2.5, mb: 5 }}
          in={openTitleInstructions}
        >
          <Typography>
            Jos lisäät täsmälleen samat seuraavat tiedot:
            <br /> 1. Kategoria <br /> 2. Tyyppi <br /> 3. Otsikko. <br />
            niin ruuat, aktiviteetit ja vinkit näkyvät aina saman otsikon
            alapuoella. <br /> <br />
            Jos taas jokin näistä kolmesta poikkeaa, niin luot kokonaan uuden
            dokumentin tietokantaan, eli lisätyt ateriat, aktiviteetit tai
            vinkit näkyvät toisen otsikon alla.
            <br /> <br />
            <strong>Esimerkki 1.</strong>
            <br />
            Lisäät seuraavat tiedot: <br />
            <strong>T1</strong> <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Molemmat <br />
            3. Otsikko: Marjat <br />
            <strong>JA</strong>
            <br />
            <strong>T2</strong>
            <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Pieni <br />
            3. Otsikko: Marjat <br />
            <strong>TULOS:</strong> <br />
            <strong>Pienien aterioiden timeblock sivuilla:</strong> näkyy marjat
            otsikko 2 kertaa, koska koska T1 ja T2 tyypit poikkeavat toisistaan.{" "}
            <br />
            <strong>1.</strong> ensimmäisen lisätyn tiedon <strong>T1</strong>{" "}
            tyyppi on molemmat ja tämä näyttää marjat kaikilla ateria sivuilla
            ja <br />
            <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong> tyyppi
            on Pieni, niin Marjat näkyvät kaikkien pienien aterioiden sivuilla.
            <br />
            <strong>Isojen aterioiden timeblock sivuilla: </strong>näkyy marjat
            otsikko 1 kerran, koska, <br />
            <strong>1.</strong> Ensimmäisen tiedon <strong>T1</strong> tyyppi on
            Molemmat, niin tieto näkyy kaikilla ateria sivuilla, myös isojen
            ateroiden sivuille, kuten lounas ja päivällinen.
            <br />
            <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong> tyypi
            on Pieni, mikä näkyy ainoastaan pienien aterioiden sivuilla, mutta
            ei isojen aterioiden sivuilla.
            <br />
            <br />
            <strong>Esimerkki 2.</strong>
            <br />
            Lisäät seuraavat tiedot: <br />
            <strong>T1</strong> <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Molemmat <br />
            3. Otsikko: Marjat <br />
            <strong>JA</strong>
            <br />
            <strong>T2</strong>
            <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Molemmat <br />
            3. Otsikko: Marjat <br />
            <strong>TULOS:</strong> <br />
            <Typography>
              Ruuat näkyvät kaikilla ateriasivuilla aina saman otsikon
              alapuoella.
            </Typography>
            <br />
            <br />
            <strong>Esimerkki 3.</strong>
            <br />
            Lisäät seuraavat tiedot: <br />
            <strong>T1</strong> <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Molemmat <br />
            3. Otsikko: Marjat <br />
            <strong>JA</strong>
            <br />
            <strong>T2</strong>
            <br />
            1. Kategoria: Ateria <br />
            2. Tyyppi: Molemmat <br />
            3. Otsikko: MARJAT <br />
            <strong>TULOS:</strong> <br />
            <strong>Kaikkien aterioiden timeblock sivuilla:</strong> näkyy
            otsikot MARJAT ja Marjat otsikko 2 kertaa, koska T1 ja T2 otsikot
            poikkeavat toisistaan. <br />
            <strong>1.</strong> ensimmäisen lisätyn tiedon <strong>T1</strong>{" "}
            otsikko on Marjat ja tämä näyttää Marjat otsikon ja sen alla olevat
            tiedot kaikilla ateriasivuilla ja <br />
            <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong>{" "}
            otsikko on MARJAT, niin MARJAT ja sen alla olevat tiedot näkyvät
            kaikkien aterioiden sivuilla.
          </Typography>
        </Collapse>
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
