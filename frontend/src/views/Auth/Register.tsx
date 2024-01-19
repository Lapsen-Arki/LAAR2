import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { registerUser } from "../../api/registerPost";

// TODO: 1. Pankkikortin vahvistuksen lisääminen 2. EXTRA: Google ja Facebook kirjautumis vaihtoehdot

export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, accept: event.target.checked });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await registerUser(formData);
    if (response && response.error) {
      setErrorMessage(response.error);
    } else {
      console.log("Registration successful", response);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Typography
        sx={{
          marginBottom: 3,
          marginTop: 10,
        }}
        component="h1"
        variant="h5"
      >
        Rekisteröityminen
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle1">Sähköpostiosoite:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Sähköposti"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <Typography variant="subtitle1">Nimi:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nimi"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <Typography variant="subtitle1">Salasana:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            background: "white",
          }}
          name="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Salasana"
          autoComplete="password"
          type="password"
          autoFocus
          value={formData.password}
          onChange={handleChange}
        />
        <Typography variant="subtitle1">Salasana uudelleen:</Typography>
        <TextField
          sx={{
            marginTop: 0,
            marginBottom: 2,
            background: "white",
          }}
          name="confirmPassword"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Vahvista salasana"
          autoComplete="password"
          type="password"
          autoFocus
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Typography sx={{ color: "red", marginBottom: 2 }}>
          {errorMessage}
        </Typography>

        {/* TODO: TÄHÄN VÄLIIN LISÄTÄÄN MAKSUPALVELU VAHVISTUS, ELI PANKKIKORTIN VAHVISTUS STRIPEN KAUTTA */}

        <Typography
          sx={{
            marginBottom: 2,
          }}
          variant="body1"
        >
          Rekisteröitymällä aloitan 14 vrk ilmaisen kokeulujakson ja palvelun
          hinta on tämän jälkeen 6,99€/kk. Tilauksen voit peruttaa koska tahansa
          päättymään maksukauden loppuun.
        </Typography>
        {/* Repeat for other fields like password, confirm password, etc. */}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Rekisteröidy
        </Button>
        <FormControlLabel
          sx={{ marginTop: 2 }}
          control={
            <Checkbox
              checked={formData.accept}
              onChange={handleCheckChange}
              name="accept"
            />
          }
          label="Hyväksyn tietosuojaselosteen ja palvelun käyttöehdot"
        />
        <Link href="/login" variant="body2">
          <p>Onko sinulla valmiiksi tili? Kirjaudu tästä!</p>
        </Link>
      </form>
    </Container>
  );
}
