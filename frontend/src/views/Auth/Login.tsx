import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { userLogin } from "../../api/userLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import VerifyEmailModal from "../../components/verifyEmailModal";

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const { setIdToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await userLogin(email, password, rememberMe);

    if (response === "emailNotVerified") {
      setVerifyEmail(true);
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
        "Kirjautuminen onnistui. Tervetuloa! Siirryt etusivulle 3 s kuluttua. | Login successful. Welcome!"
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
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: "64px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: 20,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Kirjaudu sisään
      </Typography>
      <VerifyEmailModal
        open={verifyEmail}
        email={email}
        setOpen={setVerifyEmail}
      />
      <form onSubmit={handleLogin}>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextField
          style={{ background: "white" }}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMeChange}
              color="primary"
            />
          }
          label="Muista minut"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Kirjaudu sisään
        </Button>
        <Typography
          color="success"
          variant="body2"
          align="center"
          style={{ marginTop: "16px", color: "green", marginBottom: "10px" }}
        >
          {successMessage}
        </Typography>
        <Typography
          color="error"
          variant="body2"
          align="center"
          style={{ marginTop: "16px", marginBottom: "10px" }}
        >
          {errorMessage}
        </Typography>
        <Link href="/register" variant="body2">
          Eikö sinulla ole tiliä? Luo tili tästä!
        </Link>
      </form>
    </Container>
  );
};

export default Login;
