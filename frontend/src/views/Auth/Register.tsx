import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../components/Layout/formThemeMUI";
import { registerUser } from "../../api/registerPost";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { RegisterData } from "../../types/typesFrontend";
import { useNavigate } from "react-router-dom";
import ReturnBtn from "../../components/returnBtn";
import { Link } from "react-router-dom";

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
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm">
        <ReturnBtn />
        {/*<ReturnBtn />*/}
        <Typography variant="h4" style={{ textAlign: "center" }}>
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

          <Typography variant="body1">Vahvista maksukorttisi:</Typography>
          <Box
            sx={{
              background: "white",
              padding: 2,
              margin: "7px",
              width: 218,
              maxWidth: "90%",
              border: isFocused ? 1 : 1,
              borderRadius: "5px",
              borderColor: isFocused ? "#000000" : "rgba(0, 0, 0, 0.23)",
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
          <Typography variant="body1">
            <b>Emme veloita sinua vielä tässä kohtaa.</b> Turvallisen
            maksukortin vahvistuksen käsittelee{" "}
            <Link to="https://stripe.com/en-fi" target="_blank">
              Stripe
            </Link>
            .
          </Typography>

          <Typography variant="body1">
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
            label="Hyväksyn tietosuojaselosteen ja palvelun käyttöehdot"
          />
          <Button type="submit" variant="contained" fullWidth>
            Rekisteröidy
          </Button>
          <Typography sx={{ color: "red", marginBottom: 2, marginTop: 2 }}>
            {errorMessage}
          </Typography>
          <Typography sx={{ color: "green", marginBottom: 2, marginTop: 2 }}>
            {successMessage}
          </Typography>

          <Link to="/login">
            <Typography>
              Onko sinulla valmiiksi tili? Kirjaudu tästä!
            </Typography>
          </Link>
        </form>
        <ReturnBtn />
      </Container>
    </ThemeProvider>
  );
}
