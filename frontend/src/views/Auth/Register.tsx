import React from "react";
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
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import { registerUser } from "../../api/registerPost";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { RegisterData } from "../../types/typesFrontend";
import { useNavigate } from "react-router-dom";

// TODO: 1. Pankkikortin vahvistuksen lisääminen 2. EXTRA: Google ja Facebook kirjautumis vaihtoehdot
const CARD_ELEMENT_STYLES = {
  style: {
    base: {
      color: "#000000",
      iconColor: "#000000",
      fontSize: "18px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#000000",
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
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm">
        {/*<ReturnBtn />*/}
        <Typography
          variant="h4"
          color="text.primary"
          style={{ textAlign: "center" }}
        >
          Uusi asiakas
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
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

          <Typography variant="body1" color="text.primary">
            Vahvista maksukorttisi:
          </Typography>
          <Box
            sx={{
              background: "#fff4eb",
              padding: 2,
              margin: "7px",
              width: 218,
              maxWidth: "90%",
              borderRadius: "3px",
              border: isFocused ? 1 : 1,
              borderColor: isFocused ? "#000000" : "#fff4eb",
              "&:hover": {
                borderColor: "#000000",
              },
              "@media (min-width:400px)": {
                width: "82%",
              },
              "@media (min-width:576px)": {
                width: 335,
              },
            }}
          >
            <CardElement
              options={CARD_ELEMENT_STYLES}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Box>
          <Typography variant="body2" color="text.primary">
            <span>Emme veloita sinua vielä tässä kohtaa.</span> Turvallisen
            maksukortin vahvistuksen käsittelee{" "}
            <Link href="https://stripe.com/en-fi" target="_blank">
              Stripe
            </Link>
            .
          </Typography>

          <Typography variant="body2" color="text.primary">
            Rekisteröitymällä aloitan 14 vrk ilmaisen kokeulujakson ja palvelun
            hinta on tämän jälkeen 6,99€/kk. Tilauksen voit peruttaa koska
            tahansa päättymään maksukauden loppuun.
          </Typography>
          {/* Repeat for other fields like password, confirm password, etc. */}
          <FormControlLabel
            sx={{ marginTop: 2 }}
            control={
              <Checkbox
                checked={formData.accept}
                onChange={handleCheckChange}
                name="accept"
              />
            }
            label={
              <Typography variant="body2" color="text.primary" style={{margin: 0}}>
                Hyväksyn tietosuojaselosteen ja palvelun käyttöehdot
              </Typography>
            }
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Rekisteröidy
          </Button>
          <Typography variant="subtitle1" sx={{ color: "red" }}>
            {errorMessage}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "green" }}>
            {successMessage}
          </Typography>

          <Link href="/login" variant="body2">
            Onko sinulla valmiiksi tili? Kirjaudu tästä!
          </Link>
        </form>
      </Container>
    </ThemeProvider>
  );
}
