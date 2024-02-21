import React, { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import { userLogin } from "../../utils/userLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import ResetPasswordModal from "../../components/modals/resetPasswordModal";
import VerifyEmailModal from "../../components/modals/verifyEmailModal";
const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [openResetModel, setOpenResetModal] = useState(false);
  const [openVerifyEmail, setOpenVerifyEmail] = useState(false);
  const { setIdToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await userLogin(email, password, rememberMe);

    if (response === "emailNotVerified") {
      setOpenVerifyEmail(true);
    }

    if (response === "success") {
      // TALLENTAA JWT TOKENIN GLOBAALIIN TOKEN CONTEXTIIN
      const newToken =
        localStorage.getItem("idToken") || sessionStorage.getItem("idToken");
      if (newToken) {
        setIdToken(newToken);
      } else {
        setErrorMessage(
          "Istunto tietojen tallentaminen epäonnistui. Yritä kirjautua uudelleen."
        );
      }

      setSuccessMessage(
        "Kirjautuminen onnistui. Siirryt etusivulle 3 s kuluttua."
      );
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      if (response === "emailNotVerified") {
        setErrorMessage(
          "Vahvista sähköpostiositeessi ja kirjaudu sisään uudelleen"
        );
      } else {
        setErrorMessage(`Kirjautuminen epäonnistui`);
      }
    }
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ display: 'flex', textAlign: 'center', marginTop: { md: 0 } }}
      >
        <Typography variant="h4">Kirjaudu sisään</Typography>
        <VerifyEmailModal
          open={openVerifyEmail}
          email={email}
          setOpen={setOpenVerifyEmail}
        />
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Sähköposti"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Salasana"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Grid 
          container
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          style={{ paddingLeft: 7, paddingRight: 7 }}
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label={
                  <Typography variant="body2" style={{ color: 'black', margin: 0 }}>
                    Muista minut
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => {
                  setOpenResetModal(true);
                }}
                variant="body2"
              >
                Unohtuiko salasana?
              </Link>
              <ResetPasswordModal
                open={openResetModel}
                email={email}
                setEmail={setEmail}
                setOpen={setOpenResetModal}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth>
            Kirjaudu
          </Button>
          {successMessage != null && (
          <Alert severity="success" >
            <Typography
              variant="subtitle1"
            >
              {successMessage}
            </Typography>
          </Alert>
          )}
          {errorMessage != null && (
          <Alert severity="error" >
            <Typography
              variant="subtitle2"
            >
              {errorMessage}
            </Typography>
          </Alert>
          )}
          <Grid 
            container
            direction="row" 
            justifyContent="flex-start" 
            alignItems="baseline"
            style={{ paddingLeft: 7, paddingRight: 7 }}
            >
            <Grid item>
              <Link href="/register" variant="body2">
                Eikö vielä tiliä? Rekisteröidy tästä!
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
