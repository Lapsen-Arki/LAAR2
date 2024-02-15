import React, { useState, useContext, useEffect } from "react";
import stripeSubscription from "../api/stripeSubscriptions";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  CardContent,
  Card,
  Box,
  Dialog,
  DialogTitle,
} from "@mui/material/";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../components/Layout/formThemeMUI";
import "../styles/Subscription.css";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import PleaseLoginModal from "../components/modals/pleaseLoginModal";

export interface SimpleDialogProps {
  subscriptionCancelled: boolean;
  onCancelSubscription: () => Promise<void>;
  onStartSubscription: () => Promise<void>;
  open: boolean;
  onClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
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
    <Dialog onClose={handleClose} open={open}>
      {subscriptionCancelled ? (
        <DialogTitle>Olet jatkamassa tilausta</DialogTitle>
      ) : (
        <DialogTitle>Olet lopettamassa tilausta</DialogTitle>
      )}

      {subscriptionCancelled ? (
        <div>
          <p>
            Painamalla 'Jatka tilausta'-painiketta jatkat jäsenyyttäsi
            LAAR:issa. Sinua tullaan veloittamaan automaattisesti aina seuraavan
            jäsenyyskuukauden alkaessa.
          </p>

          <Button
            onClick={onStartSubscription}
            variant="contained"
            sx={{ backgroundColor: "#63c8cc" }}
          >
            Jatka tilausta
          </Button>
        </div>
      ) : (
        <div>
          <p>
            Painamalla 'Keskeytä tilaus'-painiketta keskeytät jäsenyytesi
            LAAR:issa. Sinua ei veloiteta enää tulevista kuukausista.
            Jäsenyytesi jatkuu maksetun kuukauden loppuun saakka. Voit jatkaa
            jäsenyyttäsi koska tahansa.
          </p>
          <Button
            onClick={onCancelSubscription}
            variant="contained"
            sx={{ backgroundColor: "#63c8cc" }}
          >
            Keskeytä tilaus
          </Button>
        </div>
      )}
    </Dialog>
  );
};

// Sivu on vielä kesken, error-handlingia pitää järkevöidä ja yhdenmukaistaa
interface SubscriptionData {
  created: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

const SubscriptionManagement: React.FC = () => {
  const { idToken } = useContext(TokenContext);
  const { userId } = useContext(UserContext);
  const [subscription, setSubscription] = useState<SubscriptionData | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartSubscription = async () => {
    try {
      const response = await stripeSubscription(idToken, userId, "start-subscription");
      setSubscription(response);
      handleClose();
    } catch (error) {
      console.error("Error starting subscription:", error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await stripeSubscription(idToken, userId, "cancel-subscription");
      setSubscription(response);
      handleClose();
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (idToken) {
      const fetchSubscription = async () => {
        try {
          if (userId) {
            const response = await stripeSubscription(
              idToken,
              userId,
              "get-subscription"
            );
            setSubscription(response);
            if (response?.cancel_at_period_end) {
              setSubscriptionCancelled(true);
            } else {
              setSubscriptionCancelled(false);
            }
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Virhe tilausta haettaessa.");
        }
      };
      fetchSubscription();
    }
  }, [idToken, userId]);

  if (!idToken) {
    return (
      <PleaseLoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    );
  }

  return (
    <div className="subscription-page">
      <Typography variant="h3" component="div">
        Tilaustiedot
      </Typography>
      <br></br>
      <SimpleDialog
        onCancelSubscription={handleCancelSubscription}
        onStartSubscription={handleStartSubscription}
        subscriptionCancelled={subscriptionCancelled}
        open={open}
        onClose={handleClose}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
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
      </Box>
      <br></br>
      {!isLoading && subscription?.cancel_at_period_end && (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ backgroundColor: "#63c8cc" }}
        >
          Jatka tilausta
        </Button>
      )}{" "}
      {isLoading && <Typography>Ladataan sivua...</Typography>}
      {!isLoading && !subscription?.cancel_at_period_end && (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ backgroundColor: "#63c8cc" }}
        >
          Keskeytä tilaus
        </Button>
      )}
    </div>
  );

  function IsSubscribed({
    subscription,
  }: {
    subscription: SubscriptionData;
  }): React.ReactNode {
    return (
      <div>
        {subscription.cancel_at_period_end ? (
          <p>
            Tämänhetkinen tilauksesi loppuu{" "}
            {formatDate(subscription.current_period_end)}
          </p>
        ) : (
          <p>Sinulla on voimassaoleva tilaus!</p>
        )}
        <br></br>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: { xs: "100%", md: 600 } }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell>Jäsenyys alkanut</TableCell>
                <TableCell align="right">
                  {formatDate(subscription.created)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Seuraava maksu</TableCell>
                <TableCell align="right">
                  {formatDate(subscription.current_period_end)}
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td": { borderBottom: "none" } }}>
                <TableCell>Jäsenyyden hinta</TableCell>
                <TableCell align="right">6,99/kk</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default SubscriptionManagement;
function NotSubscribed(): React.ReactNode {
  return (
    <div>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        Sinulla ei ole voimassaolevaa tilausta.
      </Typography>
      <br></br>
      <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
        Hanki täysjäsenyys hintaan
      </Typography>
      <Typography variant="h3" component="div">
        6,99/kk
      </Typography>
      <br></br>
      <Divider variant="middle" />
      <div className="subscription-description">
        <Typography variant="body2" color="text.secondary">
          Aloittamalla tilauksen saat LAAR:in kaikki ominaisuudet käyttöösi.
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemIcon>
            <AddCircleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Ominaisuus1" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AddCircleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Ominaisuus2" />
        </ListItem>
      </List>
    </div>
  );
}
