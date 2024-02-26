import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

type VerifyEmailModalProps = {
  open: boolean;
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      disableEscapeKeyDown
    >
      <DialogTitle
        style={{ marginTop: "0px", marginBottom: "0px", marginLeft: "8px" }}
      >
        Vahvista sähköpostisi
      </DialogTitle>
      <Typography
        style={{
          scrollMarginLeft: 10,
          maxWidth: "300px",
          marginLeft: "32px",
          marginRight: "25px",
          marginTop: "0px",
          marginBottom: "15px",
        }}
      >
        Vahvistuslinkki on lähetetty sähköpostiisi.
      </Typography>
      <Typography
        style={{
          scrollMarginLeft: 10,
          maxWidth: "300px",
          marginLeft: "32px",
          marginRight: "25px",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      >
        Mikäli sähköpostiasi ei vahvisteta, tilauksesi peruuntuu automaattisesti
        ja tietosi poistetaan 30 päivän kuluttua.
      </Typography>
      <DialogContent sx={{ maxWidth: 390 }}>
        <Button
          style={{ marginTop: "10px", marginBottom: "0px" }}
          type="submit"
          fullWidth
          onClick={() => setOpen(false)}
          variant="contained"
          color="primary"
        >
          Palaa
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
