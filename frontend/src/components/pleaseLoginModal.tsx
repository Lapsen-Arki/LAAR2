import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";

type VerifyEmailModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const goToLoginPageHandler = async () => {};
const returnHandler = async () => {};

const PleaseLoginModal: React.FC<VerifyEmailModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onClose={() => {}} disableEscapeKeyDown>
      <DialogTitle>Palauta salasana</DialogTitle>
      <DialogContent>
        <Typography>Sinun tulee kirjatua sisään</Typography>

        <Button
          style={{ marginTop: "16px", marginBottom: "10px" }}
          onClick={goToLoginPageHandler}
          fullWidth
          variant="contained"
          color="primary"
        >
          Kirjautumis sivulle
        </Button>
        <Button
          onClick={returnHandler}
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

export default PleaseLoginModal;
