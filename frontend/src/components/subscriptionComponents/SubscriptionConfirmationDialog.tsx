import { ConfirmationDialogProps } from "../../types/typesFrontend.ts";
import ConfirmationDialog from "../ConfirmationDialog.tsx";

const SubscriptionConfirmationDialog = (props: ConfirmationDialogProps) => {
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
      {(!subscription || subscription.cancel_at_period_end) && (
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          onConfirm={onStartSubscription}
          title="Olet jatkamassa tilausta"
          content="Painamalla 'Jatka tilausta'-painiketta jatkat jäsenyyttäsi LAAR:ssa. Sinua tullaan veloittamaan automaattisesti aina seuraavan jäsenyyskuukauden alkaessa."
          showCancel={true}
          showConfirm={true}
          confirmButtonText="Jatka tilausta"
          confirmButtonColor="#57bfb1"
          confirmButtonBackgroundColor=""
          cancelButtonText="Palaa"
          cancelButtonColor="#FF4500"
          cancelButtonBackgroundColor=""
        />
      )}
      {subscription && !subscription.cancel_at_period_end && (
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          onConfirm={onCancelSubscription}
          title="Olet keskeyttämässä tilausta"
          content="Painamalla 'Keskeytä tilaus'-painiketta keskeytät jäsenyytesi LAAR:ssa. Sinua ei veloiteta enää tulevista kuukausista. Jäsenyytesi jatkuu maksetun kuukauden loppuun saakka. Voit jatkaa jäsenyyttäsi koska tahansa."
          showCancel={true}
          showConfirm={true}
          confirmButtonText="Keskeytä tilaus"
          confirmButtonColor="#FF4500"
          confirmButtonBackgroundColor=""
          cancelButtonText="Palaa"
          cancelButtonColor="#57bfb1"
          cancelButtonBackgroundColor=""
        />
      )}
    </div>
  );
};

export { SubscriptionConfirmationDialog };
