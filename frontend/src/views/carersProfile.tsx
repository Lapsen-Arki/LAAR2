import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Alert,
  AlertTitle,
  Typography,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Container,
  Grid,
} from "@mui/material";

import {
  EditNote as EditNoteIcon,
  PersonRemove as PersonRemoveIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
} from "@mui/icons-material";

import PleaseLoginModal from "../components/modals/pleaseLoginModal";
import { TokenContext } from "../contexts/tokenContext";
import {
  inviteAccountToProfile,
  getCarerProfile,
  updateSessionStorage,
} from "../api/carersProfile/inviteAccountToProfile";

import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../components/Layout/formThemeMUI";
import ReturnBtn from "../components/returnBtn.tsx";

export default function CarersProfile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [inviteResult, setInviteResult] = useState<null | string>(null);
  const [emailForAlert, setEmailForAlert] = useState("");
  const [isAlertClosed, setIsAlertClosed] = useState(false);

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailPattern.test(newEmail));
    setShowEmailError(!emailPattern.test(newEmail));
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    if (showTermsError) {
      setShowTermsError(false);
    }
  };

  const handleInviteClick = async () => {
    if (!acceptTerms || !isEmailValid) {
      setShowTermsError(!acceptTerms);
      setShowEmailError(!isEmailValid);
      return;
    }

    if (!isEmailValid) {
      setShowEmailError(true);
      return;
    }

    try {
      const result = await inviteAccountToProfile(
        { accountEmail: email },
        idToken
      );

      if (result.status === 200) {
        setEmailForAlert(email);
        setInviteResult("200");
        // Päivitä Session Storage kutsun onnistumisen jälkeen
        const newCarerProfile = await getCarerProfile(idToken, true);
        updateSessionStorage(newCarerProfile);
      } else if (result.status === 409) {
        setInviteResult("409");
      } else if (result.status === 404) {
        setInviteResult("404");
      } else {
        setInviteResult("500");
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Jokin meni pieleen, yritä uudelleen.";
      console.error("Kutsu hoitajaksi virhe:", errorMessage);
      setInviteResult("500");
    }

    setEmail("");
    setAcceptTerms(false);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ display: "flex", textAlign: "center", marginTop: { md: 0 } }}
      >
        <ReturnBtn />
        <form>
          <Typography variant="h5">Kutsu hoitaja</Typography>
          <TextField
            style={{ background: "white" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Sähköposti"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={showEmailError}
            helperText={
              showEmailError ? "Anna kelvollinen sähköpostiosoite" : ""
            }
          />

          <Typography variant="body1">
            Hyväksyessäni otan vastuun toisen henkilön toiminnasta ja <br />
            <span style={{ fontWeight: "bold" }}>
              valtuutan hänet seuraavin oikeuksin:
            </span>
          </Typography>

          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <Grid item sx={{ display: { xs: "block" } }}></Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Typography
                variant="body1"
                style={{ margin: 3, display: "flex", alignItems: "center" }}
              >
                <EditNoteIcon style={{ marginRight: 10, color: "#1976d2" }} />{" "}
                Muokata profiileitani
              </Typography>
              <Typography
                variant="body1"
                style={{ margin: 3, display: "flex", alignItems: "center" }}
              >
                <PersonRemoveIcon
                  style={{ marginRight: 10, color: "#d32f2f" }}
                />{" "}
                Poistaa profiileitani
              </Typography>
              <Typography
                variant="body1"
                style={{ margin: 3, display: "flex", alignItems: "center" }}
              >
                <PersonAddAlt1Icon
                  style={{ marginRight: 10, color: "#39C4A3" }}
                />{" "}
                Lisätä profiileita tililleni
              </Typography>
            </Grid>
            <Grid item sx={{ display: { xs: "block" } }}></Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ paddingLeft: 10, paddingRight: 7 }}
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={handleAcceptTermsChange}
                    name="acceptTerms"
                    style={{ display: "flex", alignItems: "center" }}
                  />
                }
                label={
                  <Typography variant="body2" style={{ color: "black" }}>
                    Olen tietoinen oikeuksista ja ehdoista sekä hyväksyn ne.
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          {showTermsError && (
            <Alert severity="error">
              <Typography variant="inherit" component="span">
                Sinun on hyväksyttävä ehdot, ennen kuin voit kutsua hoitajan.
              </Typography>
            </Alert>
          )}

          {!isAlertClosed && inviteResult && inviteResult.includes("200") && (
            <Alert severity="success" onClose={() => setIsAlertClosed(true)}>
              <AlertTitle>{`${emailForAlert} kutsuttu hoitajaksi onnistuneesti!`}</AlertTitle>
              Voit halutessasi kutsua toisen henkilön.
            </Alert>
          )}

          {!isAlertClosed && inviteResult && inviteResult.includes("500") && (
            <Alert severity="error" onClose={() => setIsAlertClosed(true)}>
              <AlertTitle>No höh, jokin meni pieleen.</AlertTitle>
              Kutsu hoitajaksi epäonnistui.
            </Alert>
          )}

          {!isAlertClosed && inviteResult && inviteResult.includes("409") && (
            <Alert severity="info" onClose={() => setIsAlertClosed(true)}>
              <AlertTitle>Hups!</AlertTitle>
              Käyttäjä on jo kutsuttu.
            </Alert>
          )}

          {!isAlertClosed && inviteResult && inviteResult.includes("404") && (
            <Alert severity="warning" onClose={() => setIsAlertClosed(true)}>
              <AlertTitle>No höh, jokin meni pieleen.</AlertTitle>
              Kutsuttava käyttäjä ei ole olemassa, tarkista sähköpostiosoite.
            </Alert>
          )}

          <Tooltip title="Kutsu hoitaja sähköpostilla">
            <Button
              variant="contained"
              className="custom-button"
              onClick={handleInviteClick}
            >
              Kutsu hoitaja
            </Button>
          </Tooltip>
        </form>
      </Container>
    </ThemeProvider>
  );
}
