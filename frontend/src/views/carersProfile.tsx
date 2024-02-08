import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Alert,
  AlertTitle,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from '@mui/material';

import {
  ArrowBackIos as ArrowBackIosIcon,
  EditNote as EditNoteIcon,
  PersonRemove as PersonRemoveIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
} from '@mui/icons-material';

import PleaseLoginModal from '../components/modals/pleaseLoginModal';
import { TokenContext } from '../contexts/tokenContext';
import { inviteAccountToProfile, getCarerProfile, updateSessionStorage } from '../api/carersProfile/inviteAccountToProfile';

export default function CarersProfile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [inviteResult, setInviteResult] = useState<null | string>(null);
  const [emailForAlert, setEmailForAlert] = useState('');
  const [isAlertClosed, setIsAlertClosed] = useState(false);

  if (!idToken) {
    return <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailForAlert(newEmail);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailPattern.test(newEmail));
    setShowEmailError(!emailPattern.test(newEmail));
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    if (showTermsError) {
      setShowTermsError(false);
    }
  };

  const handleInviteClick = async () => {
    if (!acceptTerms || !isEmailValid) {
      setShowTermsError(!acceptTerms);
      setShowEmailError(!isEmailValid);
      return;
    }

    if (!isEmailValid) {
      setShowEmailError(true);
      return;
    }

    try {
      const result = await inviteAccountToProfile({ accountEmail: email }, idToken);
  
      if (result.status === 200) {
        setInviteResult('200');
        // Päivitä Session Storage kutsun onnistumisen jälkeen
        const newCarerProfile = await getCarerProfile(idToken, true);
        updateSessionStorage(newCarerProfile);
      } else if (result.status === 409) {
        setInviteResult('409');
      } else if (result.status === 404) {
        setInviteResult('404');
      } else {
        setInviteResult('500');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Jokin meni pieleen, yritä uudelleen.';
      console.error('Kutsu hoitajaksi virhe:', errorMessage);
      setInviteResult('500');
    }

    setEmailForAlert(email);
    setEmail('');
    setAcceptTerms(false);
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
              style={{ background: 'white' }}
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

            <div className="input-group shareProfile" style={{ display: 'flex', justifyContent: 'center' }}>
              <ul style={{ listStyle: 'none', paddingInlineStart: '0' }}>
                <li style={{ display: 'flex', alignItems: 'center', margin: '8px 0px' }}>
                  <EditNoteIcon style={{ color: '#1976d2', marginRight: '8px' }} /> Muokata minun profiileitani.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', margin: '8px 0px' }}>
                  <PersonRemoveIcon style={{ color: '#d32f2f', marginRight: '8px' }} /> Poistaa minun profiileitani.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', margin: '8px 0px' }}>
                  <PersonAddAlt1Icon style={{ color: '#39C4A3', marginRight: '8px' }} /> Lisää minulle profiileita.
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
              <Alert severity="error">
                <Typography variant="inherit" component="span">
                  Sinun on hyväksyttävä ehdot, ennen kuin voit kutsua hoitajan.
                </Typography>
              </Alert>
            )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!isAlertClosed && inviteResult && inviteResult.includes('200') && (
              <Alert severity="success" onClose={() => setIsAlertClosed(true)}>
                <AlertTitle>{`${emailForAlert} kutsuttu hoitajaksi onnistuneesti!`}</AlertTitle>
                  Voit halutessasi kutsua toisen henkilön.
              </Alert>
            )}

            {!isAlertClosed && inviteResult && inviteResult.includes('500') && (
              <Alert severity="error" onClose={() => setIsAlertClosed(true)}>
                <AlertTitle>No höh, jokin meni pieleen.</AlertTitle>
                  Kutsu hoitajaksi epäonnistui.
              </Alert>
            )}

            {!isAlertClosed && inviteResult && inviteResult.includes('409') && (
              <Alert severity="info" onClose={() => setIsAlertClosed(true)}>
                <AlertTitle>Hups!</AlertTitle>
                  Käyttäjä on jo kutsuttu.
              </Alert>
            )}

            {!isAlertClosed && inviteResult && inviteResult.includes('404') && (
              <Alert severity="warning" onClose={() => setIsAlertClosed(true)}>
                <AlertTitle>No höh, jokin meni pieleen.</AlertTitle>
                  Kutsuttava käyttäjä ei ole olemassa, tarkista sähköpostiosoite.
              </Alert>
            )}
          </div>
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