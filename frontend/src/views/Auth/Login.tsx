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

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("data: ");
    console.log(email, password, rememberMe);

    const response = await userLogin(email, password, rememberMe);
    if (response && response.error) {
      setErrorMessage(
        `Kirjautuminen epäonnistui: ${response.error.message}. ${response.error.error}`
      );
    } else {
      setSuccessMessage(
        "Kirjautuminen onnistui. Tervetuloa! | Login successful. Welcome!"
      );
      console.log("Kirjautuminen onnistui ");
    }
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "64px" }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Kirjaudu sisään
      </Typography>
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
          style={{ marginTop: "16px", color: "green" }}
        >
          {successMessage}
        </Typography>
        <Typography
          color="error"
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
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
