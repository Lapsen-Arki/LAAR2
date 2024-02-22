import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

type VerifyEmailModalProps = {
  open: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetPasswordModal: React.FC<VerifyEmailModalProps> = ({
  open,
  email,
  setEmail,
  setOpen,
}) => {
  const handleReset = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      disableEscapeKeyDown
    >
      <DialogTitle style={{ marginTop: "0px", marginBottom: "8px" }}>
        Palauta salasana
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 390 }}>
        <Typography>Lähetä salasanan palautusviesti sähköposiisi:</Typography>

        <TextField
          sx={{ marginTop: "0px", marginBottom: "8px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        ></TextField>

        <Button
          style={{ marginTop: "0px", marginBottom: "0px" }}
          onClick={handleReset}
          fullWidth
          variant="contained"
          color="primary"
        >
          Lähetä
        </Button>
        <Button
          style={{ marginTop: "8px", marginBottom: "0px" }}
          onClick={() => setOpen(false)}
          fullWidth
          variant="contained"
          color="primary"
        >
          Peruuta
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
