import { ConfirmationDialogProps } from "../../types/subscriptionTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const {
    onCancelSubscription,
    onStartSubscription,
    subscriptionCancelled,
    onClose,
    open,
  } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      {subscriptionCancelled && (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Olet jatkamassa tilausta</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Painamalla 'Jatka tilausta'-painiketta jatkat jäsenyyttäsi
              LAAR:issa. Sinua tullaan veloittamaan automaattisesti aina
              seuraavan jäsenyyskuukauden alkaessa.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onStartSubscription}
              variant="contained"
              sx={{ backgroundColor: "#63c8cc" }}
            >
              Jatka tilausta
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {!subscriptionCancelled && (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Olet keskeyttämässä tilausta</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Painamalla 'Keskeytä tilaus'-painiketta keskeytät jäsenyytesi
              LAAR:issa. Sinua ei veloiteta enää tulevista kuukausista.
              Jäsenyytesi jatkuu maksetun kuukauden loppuun saakka. Voit jatkaa
              jäsenyyttäsi koska tahansa.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onCancelSubscription}
              variant="contained"
              sx={{ backgroundColor: "#63c8cc" }}
            >
              Keskeytä tilaus
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export { ConfirmationDialog };
