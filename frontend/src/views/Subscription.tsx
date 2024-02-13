import React, { useState, useContext, useEffect } from "react";
import startSubscription from "../api/startSubscription";
import cancelSubscription from "../api/cancelSubscription";
import getSubscription from "../api/getSubscription";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Subscription.css";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import PleaseLoginModal from "../components/modals/pleaseLoginModal";

// Sivu on vielä kesken, error-handlingia pitää järkevöidä ja yhdenmukaistaa
interface SubscriptionData {
  created: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

const SubscriptionManagement: React.FC = () => {
  const { idToken } = useContext(TokenContext);
  const { userId } = useContext(UserContext);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  const fetchSubscription = async () => {
    try {
      if (userId) {
        const response = await getSubscription(idToken, userId);
        setSubscription(response);
      }
    } catch (error) {
      console.error("Virhe tilausta haettaessa.");
    }
  };

  const handleStartSubscription = async () => {
    try {
      await startSubscription(idToken, userId);
      fetchSubscription();
    } catch (error) {
      console.error("Error starting subscription:", error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(idToken, userId);
      fetchSubscription();
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
      fetchSubscription();
    }
  }, [userId]);

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            {subscription ? (
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
                      <TableRow
                        sx={{ "&:last-child td": { borderBottom: "none" } }}
                      >
                        <TableCell>Jäsenyyden hinta</TableCell>
                        <TableCell align="right">6,99/kk</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Sinulla ei ole voimassaolevaa tilausta.
                </Typography>
                <br></br>
                <Typography
                  sx={{ fontSize: 14, marginBottom: 1 }}
                  color="text.secondary"
                >
                  Hanki täysjäsenyys hintaan
                </Typography>
                <Typography variant="h3" component="div">
                  6,99/kk
                </Typography>
                <br></br>
                <Divider variant="middle" />
                <div className="subscription-description">
                  <Typography variant="body2" color="text.secondary">
                    Aloittamalla tilauksen saat LAAR:in kaikki ominaisuudet
                    käyttöösi.
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
            )}
          </CardContent>
        </Card>
      </Box>
      <br></br>
      {subscription?.cancel_at_period_end ? (
        <Button
          onClick={handleStartSubscription}
          variant="contained"
          sx={{ backgroundColor: "#63c8cc" }}
        >
          Jatka tilausta
        </Button>
      ) : (
        <Button
          onClick={handleCancelSubscription}
          variant="contained"
          sx={{ backgroundColor: "#63c8cc" }}
        >
          Keskeytä tilaus
        </Button>
      )}
    </div>
  );
};

export default SubscriptionManagement;
