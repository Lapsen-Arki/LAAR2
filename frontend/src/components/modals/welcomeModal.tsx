import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

type PleaseLoginModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FirstLoginModal: React.FC<PleaseLoginModalProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();

  const goToLoginPageHandler = async () => {
    return navigate("/profile");
  };
  const continueHandler = async () => {
    return navigate("/");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      disableEscapeKeyDown
    >
      <DialogTitle>Tervetuloa!</DialogTitle>
      <DialogContent>
        <Typography>
          Lämpimästi tervetuloa ja kiitos kun olet tullut mukaan lapsen arki
          sovellukseemme :). Olemme iloisia siitä, että olet löytänyt mukaan.
          Toivottavasti saat mahdollisimman paljon iloa palvelustamme ja voimme
          olla sinulle avuksi ja tueksi kiireisessä perheesi arjessa.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Näin pääset alkuun:</strong>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Lasten vanhempana:</strong>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          1. Luo lapsillesi omat profiilit profiilisivulla. <br />
          2. Nyt voit kutsua lapsillesi myös hoitajia, joilla on valmiiksi LAAR
          tili. <br />
          3. Sinut voidaan kutsua hoitajaksi myös toisten lapsille. <br />
          4. Hyödynnä kaikki ajankohtaasi sopivat vinkit ja ideat. <br />
          5. Tukenasi on myös LAAR chat robootti, jos tarvitset apua tai neuvoja
          palvelun käyttöön.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Lasten hoitajana:</strong>
        </Typography>
        <Typography sx={{ mt: 2 }}>
          1. Nyt kun sinulla on LAAR tili, niin kuka tahansa voi kutsua sinut
          lapsilleen hoitajaksi. <br />
          2. Anna kirjautuessa käyttämäsi sähköpostiosoitteesi hoidettavien
          lasten vanhemmille, niin he lisäävät sinut hoitajaksi. <br />
          3. Jos sinulla ei ole omia lapsia palvelussa, niin{" "}
          <strong>voit käyttää palvelua maksutta</strong> ja{" "}
          <Link to={"/subscription"}>
            {" "}
            peruuttaa tilauksesi päättymään 14 päivän ilmaiseen kokeiluun.{" "}
          </Link>{" "}
          <br />
          4. Hyödynnä kaikki ajankohtaasi sopivat vinkit <br />
          ja ideat. <br />
          5. Tukenasi on myös LAAR chat robootti, jos tarvitset apua tai neuvoja
          palvelun käyttöön.
        </Typography>
        <hr />
        <Typography>
          Otamme ilolla myös vastaan palautetta ja ideoita palvelun
          parantamiseen. LAAR chat robootilta saat ohjeet palautteen antamiseen.
        </Typography>

        <Button
          style={{ marginTop: "16px", marginBottom: "10px" }}
          onClick={goToLoginPageHandler}
          fullWidth
          variant="contained"
          color="primary"
        >
          Profiilisivulle
        </Button>
        <Button
          onClick={continueHandler}
          fullWidth
          variant="contained"
          color="primary"
        >
          Jatka etisivulle
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FirstLoginModal;
