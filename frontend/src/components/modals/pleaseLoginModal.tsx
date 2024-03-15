import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type PleaseLoginModalProps = {
  open: boolean;
};

const PleaseLoginModal: React.FC<PleaseLoginModalProps> = ({
  open,
}: {
  open: boolean;
}) => {
  const navigate = useNavigate();

  const goToLoginPageHandler = async () => {
    return navigate("/login");
  };

  const returnHandler = async () => {
    navigate(-1);
  };
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>Kirjaudu sisään</DialogTitle>
      <DialogContent>
        <Typography>
          Sinun tulee kirjatua sisään jatkaaksesi tälle sivulle.
        </Typography>

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
