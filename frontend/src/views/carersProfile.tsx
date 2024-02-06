import { useContext, useState } from 'react';
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
import { inviteAccountToProfile } from '../api/carersProfile/inviteAccountToProfile'; // Import backend API function

export default function CarersProfile() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { idToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [inviteResult, setInviteResult] = useState('');
  const [invitedSuccess, setInvitedSuccess] = useState(false);
  const [emailForAlert, setEmailForAlert] = useState('');

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

    // tarkistus
    console.log('Email muuttui:', newEmail);
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    if (showTermsError) {
      setShowTermsError(false);

      // tarkistus
      console.log('Hyväksy ehdot muuttui:', acceptTerms);
    }
  };

  const handleInviteClick = async () => {
    if (!acceptTerms) {
      setShowTermsError(true);
      return;
    }

    if (!isEmailValid) {
      setShowEmailError(true);
      return;
    }

    try {
        const response = await inviteAccountToProfile({ accountEmail: email }, idToken);
    
        if (response.error) {
          setInviteResult(`Error Tarkista sähköpostiosoite`);
          setAcceptTerms(false); // alusta checkbox
        } else {
          setInvitedSuccess(true); // Aseta invitedSuccess todeksi
          setInviteResult(`Success Voit halutessa kutsua toisen käyttäjän.`);
          setEmail(''); // alusta sähköposti onnistumisen jälkeen
          setAcceptTerms(false); // alusta checkbox
        }
        // tarkistus
        console.log('Kutsu hoitajaksi vastaus:', response);
        
      } catch (error) {
        console.error('Kutsu hoitajaksi virhe:', error);
      }
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

            {inviteResult && (
              <Alert severity={invitedSuccess ? 'success' : 'error'}>
                <AlertTitle>{invitedSuccess ? `${emailForAlert} kutsuttu hoitajaksi onnistuneesti!` : 'No höh, jokin meni pieleen.'}</AlertTitle>
                <Typography variant="inherit" component="span">
                  {inviteResult.replace('Success', '').replace('Error', '')}
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