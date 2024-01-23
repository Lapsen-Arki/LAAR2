import { useState } from "react";
import "./Profile.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Avatar from "@mui/material/Avatar";
import AnimalAvatarWidget from "../components/AnimalAvatarWidget.tsx";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { saveUserData } from "../api/editProfilePost.ts";

const EditProfile = () => {
  const [showAnimalAvatar, setShowAnimalAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [nameError, setNameError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [accessRights, setAccessRights] = useState(false);

  const handleShowAnimalAvatar = () => {
    setShowAnimalAvatar(true);
  };

  const handleAvatarSelect = (avatar: string | null) => {
    setSelectedAvatar(avatar);
    setShowAnimalAvatar(false);
  };

  const handleSave = async () => {
    // Tarkista, onko nimi tyhjä
    if (!childName) {
      setNameError("Tämä kenttä on pakollinen");
    } else {
      setNameError("");
    }

    // Tarkista, onko syntymäaika tyhjä
    if (!birthdate) {
      setBirthdateError("Tämä kenttä on pakollinen");
    } else {
      setBirthdateError("");
    }

    // Määritä avatar-kenttä
    const avatar: string | null = selectedAvatar || "/broken-image.jpg";

    // Tallenna tiedot vain, jos nimi ja syntymäaika ovat täytetty
    if (childName && birthdate) {
      try {
        const userData = {
          childName,
          birthdate,
          avatar,
          accessRights,
        };

        // Lähetä tiedot tietokantaan
        await saveUserData(userData);
      } catch (error) {
        console.error("Tietojen tallennus epäonnistui", error);
        // Voit näyttää virheilmoituksen käyttäjälle, jos tallennus epäonnistuu
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-modification">
        <form>
          <div className="input-group">
            <h3>Lapsen nimi tai lempinimi</h3>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
            {nameError && <Alert severity="error">{nameError}</Alert>}
          </div>

          <div className="input-group">
            <h3>Lapsen syntymäaika</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
              />
            </LocalizationProvider>
            {birthdateError && <Alert severity="error">{birthdateError}</Alert>}
          </div>

          <div
            className="input-group"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Valitse lapselle avatar</h3>

            {showAnimalAvatar ? (
              <AnimalAvatarWidget onSelect={handleAvatarSelect} />
            ) : selectedAvatar ? (
              <Avatar src={selectedAvatar} />
            ) : (
              <Avatar src="/broken-image.jpg" />
            )}

            {showAnimalAvatar ? null : (
              <Button
                variant="contained"
                className="custom-button"
                onClick={handleShowAnimalAvatar}
              >
                Valitse kuva
              </Button>
            )}
          </div>

          <div className="input-group">
            <h5>Tarvitsetko pääsyoikeudet myös muille ihmisille?</h5>
            <div className="switch-group">
              <span>Ei</span>
              <Switch
                checked={accessRights}
                onChange={() => setAccessRights(!accessRights)}
              />
              <span>Kyllä</span>
            </div>
          </div>

          <div className="input-group">
            <Button
              variant="contained"
              className="custom-button"
              onClick={handleSave}
            >
              Tallenna
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
