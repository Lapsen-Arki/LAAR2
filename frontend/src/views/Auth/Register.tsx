import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import { registerUser } from "../../api/registerPost";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { RegisterData } from "../../types/typesFrontend";
import { useNavigate } from "react-router-dom";
import ReturnBtn from "../../components/returnBtn";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { HelpOutline } from "@mui/icons-material";

// TODO: 1. Pankkikortin vahvistuksen lisääminen 2. EXTRA: Google ja Facebook kirjautumis vaihtoehdot
const CARD_ELEMENT_STYLES = {
  style: {
    base: {
      color: "black",
      iconColor: "black",
      fontSize: "12px",
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
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [formData, setFormData] = React.useState<RegisterData>({
    email: "",
    name: "",
    phoneNumber: "",
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm" style={{ textAlign: "center" }}>
        <div style={{ marginTop: 25, textAlign: "left" }}>
          <ReturnBtn />
        </div>
        <Typography variant="h4">Rekisteröidy</Typography>
        <Typography>Ja aloita 14 päivän ilmainen kokeilu, jonka jälkeen jäsenyys on 1€ / kk</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            variant="outlined"
            margin="dense"
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
            margin="dense"
            required
            fullWidth
            label="Nimi"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            variant="outlined"
            margin="dense"
            fullWidth
            label="Puhelinnumero"
            autoComplete="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Tooltip title="Klikkaa avataksesi salasanavaatimukset">
            <IconButton
              onClick={handleToggle}
              aria-label="Lisätietoja salasanavaatimuksista"
            >
              <HelpOutline sx={{ color: "#63c8cc" }} />{" "}
              <span style={{ fontSize: 14 }}>Avaa salasanavaatimukset</span>
            </IconButton>
          </Tooltip>

          <Collapse in={isOpen}>
            <Typography sx={{ fontSize: 14, mb: 1 }} variant="body1">
              Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää ainakin
              yhden ison kirjaimen, yhden pienen kirjaimen, yhden numeron sekä
              vähintään yhden seuraavista erikoismerkeistä: @, $, !, %, *, ?, &.
            </Typography>
          </Collapse>

          <TextField
            name="password"
            variant="outlined"
            margin="none"
            required
            fullWidth
            label="Salasana"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="confirmPassword"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Vahvista salasana"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography style={{ textAlign: "left" }} variant="body1">
            Vahvista maksukorttisi:
          </Typography>
          <Box
            sx={{
              background: "white",
              padding: 2,
              border: "solid",
              borderWidth: isFocused ? 2 : 1,
              borderRadius: "4px",
              borderColor: isFocused ? "black" : "black",
              "&:hover": {
                borderColor: "#000000",
              },
              "@media (min-width:400px)": {
                width: "91%",
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
            <Link
              style={{ color: "black" }}
              to="https://stripe.com/en-fi"
              target="_blank"
            >
              Stripe
            </Link>
            .
          </Typography>

          <Typography
            style={{ marginTop: 15, wordBreak: "break-word", hyphens: "auto" }}
            variant="body1"
          >
            Rekisteröitymällä aloitan 14 vrk ilmaisen kokeilujakson ja palvelun
            hinta on tämän jälkeen 1€/kk. Tilauksen voit peruttaa koska
            tahansa.
          </Typography>
          {/* Repeat for other fields like password, confirm password, etc. */}

          <Button
            sx={{ marginTop: 2 }}
            type="submit"
            variant="contained"
            fullWidth
          >
            Rekisteröidy
          </Button>
          <Link to="/login">
            <Typography
              sx={{
                color: "black",
                fontSize: 13,
                marginTop: 0.75,
              }}
            >
              Oliko sinulla jo valmiiksi tili? Kirjaudu tästä!
            </Typography>
          </Link>

          <FormControlLabel
            sx={{ marginTop: 3 }}
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { marginBottom: "8px" } }} // Adjusts the checkbox icon alignment if needed
                checked={formData.accept}
                onChange={handleCheckChange}
                name="accept"
              />
            }
            label={
              <Typography>
                Hyväksyn palvelun{" "}
                <Link
                  to="https://www.kauppa.lapsen-arki.fi/kayttoehdot-ja-itetosuoja/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tietosuojaselosteen ja palvelun käyttöehdot
                </Link>
              </Typography>
            }
          />

          <Typography sx={{ color: "red", marginBottom: 2, marginTop: 2 }}>
            {errorMessage}
          </Typography>
          <Typography sx={{ color: "green", marginBottom: 2, marginTop: 2 }}>
            {successMessage}
          </Typography>
        </form>
        <div style={{ marginTop: 25, textAlign: "left" }}>
          <ReturnBtn />
        </div>
      </Container>
    </ThemeProvider>
  );
}
