import { SubscriptionData } from "../../types/typesFrontend";
import {
  Alert,
  Divider,
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material/";

const IsSubscribed = ({
  subscription,
}: {
  subscription: SubscriptionData;
}): React.ReactNode => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div>
      {subscription.cancel_at_period_end ? (
        <Alert
          variant="outlined"
          severity="info"
          sx={{
            borderColor: "#63c8cc",
            "& .MuiAlert-icon": {
              color: "#63c8cc",
            },
          }}
        >
          Tämänhetkinen tilauksesi loppuu{" "}
          {formatDate(subscription.current_period_end)}
        </Alert>
      ) : (
        <Alert
          variant="outlined"
          severity="info"
          sx={{
            borderColor: "#63c8cc",
            "& .MuiAlert-icon": {
              color: "#63c8cc",
            },
          }}
        >
          Sinulla on voimassaoleva tilaus!
        </Alert>
      )}
      <br></br>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Tilaus alkanut</TableCell>
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
              <TableCell align="right">1€/kk</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const NotSubscribed = (): React.ReactNode => {
  return (
    <div>
      <Alert
        variant="outlined"
        sx={{
          borderColor: "#63c8cc",
          "& .MuiAlert-icon": {
            color: "#63c8cc",
          },
        }}
        severity="info"
      >
        Sinulla ei ole voimassaolevaa tilausta.
      </Alert>
      <br></br>
      <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
        Hanki täysjäsenyys hintaan
      </Typography>
      <Typography variant="h3" component="div">
       1€/kk
      </Typography>
      <br></br>
      <Divider variant="middle" />
      <div className="subscription-description">
        <br></br>
        <Typography variant="body2" color="text.secondary">
          Aloittamalla tilauksen saat LAAR:in kaikki ominaisuudet käyttöösi.
        </Typography>
      </div>
    </div>
  );
};

export { IsSubscribed, NotSubscribed };
