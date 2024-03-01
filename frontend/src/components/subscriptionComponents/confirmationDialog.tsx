import { ConfirmationDialogProps } from "../../types/typesFrontend";
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
    subscription,
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
          {(!subscription || subscription.cancel_at_period_end) &&
            "Olet jatkamassa tilausta"}
          {subscription &&
            !subscription.cancel_at_period_end &&
            "Olet keskeyttämässä tilausta"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {(!subscription || subscription.cancel_at_period_end) &&
              "Painamalla 'Jatka tilausta'-painiketta jatkat jäsenyyttäsi LAAR:ssa. Sinua tullaan veloittamaan automaattisesti aina seuraavan jäsenyyskuukauden alkaessa."}
            {subscription &&
              !subscription.cancel_at_period_end &&
              "Painamalla 'Keskeytä tilaus'-painiketta keskeytät jäsenyytesi LAAR:ssa. Sinua ei veloiteta enää tulevista kuukausista. Jäsenyytesi jatkuu maksetun kuukauden loppuun saakka. Voit jatkaa jäsenyyttäsi koska tahansa."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {(!subscription || subscription.cancel_at_period_end) && (
            <Button
              onClick={onStartSubscription}
              variant="contained"
              sx={{ backgroundColor: "#63c8cc" }}
            >
              Jatka tilausta
            </Button>
          )}
          {subscription && !subscription.cancel_at_period_end && (
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
