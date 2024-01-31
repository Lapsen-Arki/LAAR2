import React from "react";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Alert,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
    Tooltip,
} from "@mui/material";
import {
    ArrowBackIos as ArrowBackIosIcon,
    EditNote as EditNoteIcon,
    PersonRemove as PersonRemoveIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
} from "@mui/icons-material";

import PleaseLoginModal from "../components/pleaseLoginModal";
import { TokenContext } from "../contexts/tokenContext";

export default function CaresProfile() {
    const [openLoginModal, setOpenLoginModal] = React.useState(false);
    const { idToken } = useContext(TokenContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);

    if (!idToken) {
        return (
          <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
        );
      }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Tarkista sähköpostin kelvollisuus RegExpillä
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setIsEmailValid(emailPattern.test(newEmail));

        // Näytä virheilmoitus, jos sähköposti ei ole kelvollinen
        setShowEmailError(!emailPattern.test(newEmail));
    };

    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);

        // Piilota virheilmoitus, kun käyttäjä hyväksyy ehdot
        if (showTermsError) {
            setShowTermsError(false);
        }
    };

    const handleInviteClick = () => {
        if (!acceptTerms) {
            // Näytä virheilmoitus, jos ehdot eivät ole hyväksytty
            setShowTermsError(true);
            return;
        }

        if (!isEmailValid) {
            setShowEmailError(true);
            return;
        }

        // Kutsu hoitajaa toiminnallisuus tässä
        console.log('Kutsu hoitaja sähköpostilla:', email);
    };

    return (
        <div className="profile-container" style={{ textAlign: 'center' }}>
            <div className="profile-modification">
                <form>
                    <div className="input-group shareProfile" style={{ marginBottom: '10px' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Kutsu hoitaja
                        </Typography>

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
                            helperText={showEmailError ? 'Anna kelvollinen sähköpostiosoite' : ''}
                        />
                    </div>

                    <div className="input-group shareProfile">
                        <Typography>
                            Hyväksyessäni otan vastuun toisen henkilön toiminnasta ja <br />
                            <span style={{ fontWeight: 'bold' }}>valtuutan hänet seuraavin oikeuksin:</span>
                        </Typography>

                    <div className="input-group shareProfile" style={{display: 'flex', justifyContent: 'center'}}>
                        <ul style={{ listStyle: 'none', paddingInlineStart: '0' }}>
                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                <EditNoteIcon /> Muokata minun profiileitani.
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonRemoveIcon /> Poistaa minun profiileitani.
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonAddAlt1Icon /> Lisää minulle profiileita.
                            </li>
                        </ul>
                    </div>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={acceptTerms}
                                    onChange={handleAcceptTermsChange}
                                    name="acceptTerms"
                                    color="primary"
                                />
                            }
                            label="Olen tietoinen oikeuksista ja ehdoista sekä hyväksyn ne."
                        />
                        {showTermsError && (
                            <Alert
                                severity="error">
                                <Typography variant="inherit" component="span">
                                    Sinun on hyväksyttävä ehdot, ennen kuin voit kutsua hoitajan.
                                </Typography>
                            </Alert>
                        )}
                    </div>

                    <Box>
                        <div className="input-group shareProfile">
                            <Tooltip title="Takaisin profiiliin">
                                <Button variant="contained" className="custom-button editProfile" onClick={() => navigate('/profile')}>
                                    <ArrowBackIosIcon /> Takaisin
                                </Button>
                            </Tooltip>

                            <Tooltip title="Kutsu hoitaja sähköpostilla">
                                <Button
                                    variant="contained"
                                    className="custom-button"
                                    onClick={handleInviteClick}
                                >
                                    Kutsu hoitaja
                                </Button>
                            </Tooltip>
                        </div>
                    </Box>
                </form>
            </div>
        </div>
    );
}
