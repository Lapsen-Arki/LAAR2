import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
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
import ReturnBtn from "../../components/returnBtn";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Container component="main" maxWidth="sm" sx={{ textAlign: "center" }}>
        <div style={{ marginTop: 25, textAlign: "left" }}>
          <ReturnBtn />
        </div>
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
                  <Typography variant="body2" style={{ color: "black" }}>
                    Muista minut
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Link
                to="#"
                onClick={() => {
                  setOpenResetModal(true);
                }}
              >
                <Typography sx={{ color: "black" }}>
                  Unohtuiko salasana?
                </Typography>
              </Link>
              <ResetPasswordModal
                open={openResetModel}
                email={email}
                setEmail={setEmail}
                setOpen={setOpenResetModal}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ marginBottom: 0 }}
            type="submit"
            variant="contained"
            fullWidth
          >
            Kirjaudu
          </Button>
          {successMessage != null && (
            <Alert severity="success">
              <Typography variant="subtitle1">{successMessage}</Typography>
            </Alert>
          )}
          {errorMessage != null && (
            <Alert severity="error">
              <Typography variant="subtitle2">{errorMessage}</Typography>
            </Alert>
          )}
          <Link to="/register">
            <Typography
              sx={{
                textAlign: "left",
                color: "black",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              Eikö vielä tiliä? Rekisteröidy tästä!
            </Typography>
          </Link>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
