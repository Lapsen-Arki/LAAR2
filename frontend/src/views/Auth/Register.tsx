import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import React from "react";
import { registerUser } from "../../api/registerPost";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { RegisterData } from "../../types/types";
import { useNavigate } from "react-router-dom";

// TODO: 1. Pankkikortin vahvistuksen lisääminen 2. EXTRA: Google ja Facebook kirjautumis vaihtoehdot
const CARD_ELEMENT_STYLES = {
  style: {
    base: {
      color: "black",
      iconColor: "black",
      fontSize: "18px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "black",
      },
      "::placeholder": {
        color: "#black",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};

export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [formData, setFormData] = React.useState<RegisterData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, accept: event.target.checked });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or elements not defined");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card) {
      const result = await stripe.createToken(card);
      if (result.error) {
        console.error(result.error.message);
        return;
      } else {
        // MAKE SURE USING HTTPS CONNECTION IN PRODUCTION
        const response = await registerUser(formData, result.token);
        if (response && response.error) {
          setErrorMessage(response.error);
        } else {
          setSuccessMessage(
            "Rekisteröinti onnistui! Siirryt kirjautumis sivulle 5 s kuluttua."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      }
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
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Typography>Vahvista maksukorttisi:</Typography>
        <Box
          sx={{
            background: "white",
            padding: 2,
            border: isFocused ? 2 : 1,
            borderRadius: "4px",
            borderColor: isFocused ? "#1a73e8" : "rgba(0, 0, 0, 0.23)", // Google blue when focused
          }}
        >
          <CardElement
            options={CARD_ELEMENT_STYLES}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: 2,
            a: {
              color: "#298E77",
            },
          }}
        >
          <b>Emme veloita sinua vielä tässä kohtaa.</b> Turvallisen maksukortin
          vahvistuksen käsittelee <a href="https://stripe.com/en-fi">Stripe</a>.
        </Typography>

        <Typography
          sx={{
            marginBottom: 2,
            marginTop: 2,
          }}
          variant="body1"
        >
          Rekisteröitymällä aloitan 14 vrk ilmaisen kokeulujakson ja palvelun
          hinta on tämän jälkeen 6,99€/kk. Tilauksen voit peruttaa koska tahansa
          päättymään maksukauden loppuun.
        </Typography>
        {/* Repeat for other fields like password, confirm password, etc. */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#39C4A3", color: "#000000" }}
        >
          Rekisteröidy
        </Button>
        <Typography sx={{ color: "red", marginBottom: 2, marginTop: 2 }}>
          {errorMessage}
        </Typography>
        <Typography sx={{ color: "green", marginBottom: 2, marginTop: 2 }}>
          {successMessage}
        </Typography>
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
        <Link href="/login" variant="body2" sx={{ color: "#298E77" }}>
          <p>Onko sinulla valmiiksi tili? Kirjaudu tästä!</p>
        </Link>
      </form>
    </Container>
  );
}
