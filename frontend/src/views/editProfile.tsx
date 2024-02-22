import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AnimalAvatarWidget from "../components/AnimalAvatarWidget.tsx";
import ReturnBtn from "../components/returnBtn.tsx";
import {
  Avatar,
  Switch,
  Button,
  Alert,
  Tooltip,
  Container,
  Typography,
  TextField,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../components/Layout/formThemeMUI";

import PleaseLoginModal from "../components/modals/pleaseLoginModal.tsx";
import { TokenContext } from "../contexts/tokenContext";
import { createChildProfile } from "../api/childProfile/createChildProfile.ts";
import { editChildProfile } from "../api/childProfile/editChildProfile.ts";
import { getChildProfileById } from "../api/childProfile/getChildProfileById.ts";

interface ChildProfile {
  id: string;
  childName: string;
  birthdate: string; // Päivämäärä on nyt merkkijono "YYYY-MM-DD"
  avatar: string;
  accessRights: boolean;
  creatorId: string;
  allergies: string;
}

const EditProfile = () => {
  const { id } = useParams();
  const [showAnimalAvatar, setShowAnimalAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null); // Muutettu käyttämään Date-objektia
  const [childAllergies, setChildAllergies] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [accessRights, setAccessRights] = useState(false);
  const navigate = useNavigate();
  const { idToken } = useContext(TokenContext);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  // Tyhjä merkkijono, jos id ei ole määritetty URL:ssä
  //console.log(id)
  const profileId = id || "";

  // Etsii ja palauttaa lapsiprofiilin Session Storagesta annetun ID:n perusteella.
  // Jos profiilia ei löydy, palauttaa null.
  const findProfileInSessionStorage = (
    profileId: string
  ): ChildProfile | null => {
    const storedProfilesJson = sessionStorage.getItem("childProfiles");
    if (!storedProfilesJson) return null;

    const storedProfiles: ChildProfile[] = JSON.parse(storedProfilesJson);
    return storedProfiles.find((p) => p.id === profileId) || null;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (profileId) {
          //console.log('Haetaan profiilin tiedot ID:llä:', profileId);

          // Ensin yritetään löytää profiili Session Storagesta
          const profileDataFromStorage = findProfileInSessionStorage(profileId);

          if (profileDataFromStorage) {
            //console.log('Käytetään Session Storagessa olevaa profiilia:', profileDataFromStorage);
            setChildName(profileDataFromStorage.childName);
            setBirthdate(
              profileDataFromStorage.birthdate
                ? dayjs(profileDataFromStorage.birthdate, "YYYY-MM-DD")
                : null
            );
            setSelectedAvatar(profileDataFromStorage.avatar);
            setChildAllergies(profileDataFromStorage.allergies);
            setAccessRights(profileDataFromStorage.accessRights);
          } else {
            // Jos ei löydy Session Storagesta, haetaan palvelimelta
            const profileData: ChildProfile | { error: Error } =
              await getChildProfileById(profileId, idToken);
            if ("childName" in profileData) {
              //console.log('Haettu profiilin tiedot:', profileData);
              setChildName(profileData.childName);
              setBirthdate(
                profileData.birthdate
                  ? dayjs(profileData.birthdate, "YYYY-MM-DD")
                  : null
              );
              setChildAllergies(profileData.allergies);
              setSelectedAvatar(profileData.avatar);
              setAccessRights(profileData.accessRights);
            } else {
              console.error("Virheellinen profiilidata", profileData.error);
            }
          }
        }
      } catch (error) {
        console.error("Tietojen haku epäonnistui", error);
      }
    };

    fetchProfileData();
  }, [profileId, idToken]);

  // Tarkista, onko käyttäjä kirjautunut
  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  const handleShowAnimalAvatar = () => {
    setShowAnimalAvatar(true);
  };

  const handleAvatarSelect = (avatar: string | null) => {
    setSelectedAvatar(avatar);
    setShowAnimalAvatar(false);
  };

  const handleSave = async () => {
    // Tarkista, onko nimi tai syntymäaika tyhjä ja aseta virheviesti tarvittaessa
    if (!childName) setNameError("Tämä kenttä on pakollinen");
    else setNameError("");

    if (!birthdate) setBirthdateError("Tämä kenttä on pakollinen");
    else setBirthdateError("");

    if (childName && birthdate) {
      const userData = {
        id: profileId,
        childName,
        birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
        avatar: selectedAvatar || "/broken-image.jpg",
        accessRights,
        creatorId: idToken,
        allergies: childAllergies,
      };

      try {
        if (profileId) {
          // Tarkista, onko ID määritelty
          await editChildProfile(userData, idToken);
        } else {
          // Jos ID:tä ei ole määritelty, luo uusi profiili
          await createChildProfile(userData, idToken);
        }
        //console.log('Profiili tallennettu onnistuneesti:', userData);
        navigate("/profile");
      } catch (error) {
        console.error("Profiilin tallennus epäonnistui", error);
      }
    } else {
      console.error("Puuttuvia tietoja tallennuksessa");
    }
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ display: "flex", textAlign: "center", marginTop: { md: 0 } }}
      >
        <form>
          <div style={{ marginTop: 25, textAlign: "left" }}>
            <ReturnBtn />
          </div>
          {/* Lapsen nimi -kenttä */}
          <Typography variant="h5">Tallenna lapsen tiedot</Typography>
          <TextField
            sx={{ width: 260 }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Lapsen nimi tai lempinimi"
            autoFocus
            inputProps={{ maxLength: 19 }}
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
          {nameError && <Alert severity="error">{nameError}</Alert>}

          {/* Syntymäaika -kenttä */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={birthdate}
              onChange={(newDate) =>
                setBirthdate(newDate ? dayjs(newDate) : null)
              }
            />
          </LocalizationProvider>
          {birthdateError && <Alert severity="error">{birthdateError}</Alert>}

          {/* Allergiat */}
          <TextField
            sx={{ width: 260 }}
            id="childAllergies"
            label="Allergiat"
            margin="dense"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            value={childAllergies}
            onChange={(e) => setChildAllergies(e.target.value)}
          />

          {/* Avatarin valinta */}
          {showAnimalAvatar ? (
            <AnimalAvatarWidget onSelect={handleAvatarSelect} />
          ) : selectedAvatar ? (
            <Avatar
              src={selectedAvatar}
              onClick={handleShowAnimalAvatar}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#A68477",
                margin: "auto",
                marginTop: "20px",
              }}
            />
          ) : (
            <Avatar
              src="/broken-image.jpg"
              onClick={handleShowAnimalAvatar}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#A68477",
                margin: "auto",
                marginTop: "20px",
              }}
            />
          )}
          {showAnimalAvatar ? null : (
            <Tooltip title="Valitse kuva">
              <Button
                variant="text"
                style={{ marginTop: 5, marginBottom: 20 }}
                onClick={handleShowAnimalAvatar}
              >
                Valitse avatar
              </Button>
            </Tooltip>
          )}

          {/* Pääsyoikeudet -kytkin */}
          <Typography variant="subtitle1" style={{ marginBottom: 0 }}>
            Näytä kortti lapsen hoitajille
          </Typography>
          <span>
            <Typography
              variant="subtitle2"
              sx={{ display: { xs: "inline-flex" } }}
            >
              Piilota
            </Typography>
          </span>
          <Switch
            checked={accessRights}
            onChange={() => setAccessRights(!accessRights)}
          />
          <span>
            <Typography
              variant="subtitle2"
              sx={{ display: { xs: "inline-flex" } }}
            >
              Näytä
            </Typography>
          </span>

          {/* Tallennus- ja paluupainikkeet */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Tallenna profiili">
              <Button
                sx={{ display: { xs: "flex" }, marginBottom: 3 }}
                variant="contained"
                onClick={handleSave}
              >
                Tallenna
              </Button>
            </Tooltip>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
