import { TokenContext } from "../contexts/tokenContext";
import { stripeSubscription } from "../api/stripeSubscriptions";
import { SubscriptionData } from "../types/typesFrontend";
import React, { useState, useContext, useEffect } from "react";
import PleaseLoginModal from "../components/modals/pleaseLoginModal";
import { ConfirmationDialog } from "../components/subscriptionComponents/confirmationDialog";
import {
  IsSubscribed,
  NotSubscribed,
} from "../components/subscriptionComponents/subscriptionInfo";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material/";
import LoadingComponent from "../components/LoadingComponent";

const SubscriptionManagement: React.FC = () => {
  const { idToken } = useContext(TokenContext);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [subscription, setSubscription] = useState<SubscriptionData | null>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmationDialogOpen = () => {
    setOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setOpen(false);
  };

  const handleStartSubscription = async () => {
    try {
      const response = await stripeSubscription(idToken, "start-subscription");
      setSubscription(response);
      handleConfirmationDialogClose();
      setErrorMessage(null);
      setSuccessMessage("Tilausta jatkettu onnistuneesti!");
    } catch (error) {
      setSubscription(null);
      handleConfirmationDialogClose();
      setSuccessMessage(null);
      setErrorMessage(
        "Tilauksen jatkamisessa tapahtui virhe. Yritä hetken päästä uudelleen."
      );
      console.error("Error starting subscription:", error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await stripeSubscription(idToken, "cancel-subscription");
      setSubscription(response);
      handleConfirmationDialogClose();
      setErrorMessage(null);
      setSuccessMessage("Tilaus keskeytetty onnistuneesti!");
    } catch (error) {
      handleConfirmationDialogClose();
      setSuccessMessage(null);
      setErrorMessage(
        "Tilauksen keskeyttämisessä tapahtui virhe. Yritä hetken päästä uudelleen."
      );
      console.error("Error canceling subscription:", error);
    }
  };

  useEffect(() => {
    if (idToken) {
      const fetchSubscription = async () => {
        try {
          if (idToken) {
            const response = await stripeSubscription(
              idToken,
              "get-subscription"
            );
            setSubscription(response);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(true);
          setSuccessMessage(null);
          setErrorMessage("Tilausta noudettaessa tapahtui virhe.");
          console.error("Error fetching subscription.");
        }
      };
      fetchSubscription();
    }
  }, [idToken]);

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  return (
    <Container
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="div">
        Tilaustiedot
      </Typography>
      <br></br>
      <ConfirmationDialog
        onCancelSubscription={handleCancelSubscription}
        onStartSubscription={handleStartSubscription}
        subscription={subscription}
        open={open}
        onClose={handleConfirmationDialogClose}
      />
      {!isLoading && (
        <Card variant="outlined">
          <CardContent>
            {!isLoading && subscription && (
              <IsSubscribed subscription={subscription} />
            )}
            {!isLoading && !subscription && <NotSubscribed />}
          </CardContent>
        </Card>
      )}
      <br></br>
      {!isLoading && (subscription?.cancel_at_period_end || !subscription) && (
        <Button onClick={handleConfirmationDialogOpen} variant="contained">
          Jatka tilausta
        </Button>
      )}{" "}
      {isLoading && <LoadingComponent />}
      {!isLoading && subscription && !subscription?.cancel_at_period_end && (
        <Button onClick={handleConfirmationDialogOpen} variant="contained">
          Keskeytä tilaus
        </Button>
      )}
      <br></br>
      <br></br>
      {successMessage != null && (
        <Alert severity="success">
          <Typography variant="subtitle1">{successMessage}</Typography>
        </Alert>
      )}
      {errorMessage != null && (
        <Alert severity="error">
          <Typography variant="subtitle2">{errorMessage}</Typography>
        </Alert>
      )}
    </Container>
  );
};

export default SubscriptionManagement;
