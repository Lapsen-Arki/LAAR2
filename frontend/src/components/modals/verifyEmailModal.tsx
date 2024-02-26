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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Resend email verification here
  };

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
          marginBottom: "0px",
        }}
      >
        Mikäli sähköpostiasi ei vahvisteta, tilauksesi peruuntuu
        automaattisesti.
      </Typography>
      <DialogContent sx={{ maxWidth: 390 }}>
        <form onSubmit={handleSubmit}>
          <Button
            style={{ marginTop: "10px", marginBottom: "0px" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {/* Lähetä vahvistus uudelleen */}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
