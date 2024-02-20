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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          {subscriptionCancelled
            ? "Olet jatkamassa tilausta"
            : "Olet keskeyttämässä tilausta"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {subscriptionCancelled
              ? "Painamalla 'Jatka tilausta'-painiketta jatkat jäsenyyttäsi LAAR:ssa. Sinua tullaan veloittamaan automaattisesti aina seuraavan jäsenyyskuukauden alkaessa."
              : "Painamalla 'Keskeytä tilaus'-painiketta keskeytät jäsenyytesi LAAR:ssa. Sinua ei veloiteta enää tulevista kuukausista. Jäsenyytesi jatkuu maksetun kuukauden loppuun saakka. Voit jatkaa jäsenyyttäsi koska tahansa."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {subscriptionCancelled ? (
            <Button
              onClick={onStartSubscription}
              variant="contained"
              sx={{ backgroundColor: "#63c8cc" }}
            >
              Jatka tilausta
            </Button>
          ) : (
            <Button
              onClick={onCancelSubscription}
              variant="contained"
              sx={{ backgroundColor: "#63c8cc" }}
            >
              Keskeytä tilaus
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { ConfirmationDialog };
