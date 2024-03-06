import React, { useContext, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { postDeleteAccount } from "../../api/accountManagement/deleteAccount";
import AuthContext from "../../contexts/authContext";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
/* import { RenderConfirmationDialogProps } from "./types"; */
interface RenderConfirmationDialogProps {
  idToken: string | null;
  password: string;
  signOutMethod: () => void;
}
export const RenderConfirmDeletion: React.FC<RenderConfirmationDialogProps> = ({
  idToken,
  password,
  signOutMethod,
}) => {
  const { auth } = useContext(AuthContext);
  const [isAccepted, setIsAccepted] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<{
    [key: string]: boolean;
  }>({
    acceptTerms: false,
    enterPassword: false,
    firstConfirmation: false,
    secondConfirmation: false,
    final: false,
  });
  const [confirmButtonOptions, setConfirmButtonOptions] = useState({
    text: "Kyllä",
    isDisabled: false,
  });
  const [removedContentText, setRemovedContentText] = useState("");
  let logoutCountdown = 3;
  let countdownTime: number;

  const verifyPassword = async () => {
    if (auth === null || auth.currentUser === null) return;
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const handleConfirmationDialog = (dialog: string, confirm?: boolean) => {
    setConfirmDialogOpen({
      [dialog]: !confirmDialogOpen[dialog],
    });
    if (dialog === "firstConfirmation" && confirm) {
      setTimeout(() => {
        setConfirmDialogOpen({ ["secondConfirmation"]: true });
        countdownTime = 5;
        updateCountdown();
      }, 1000);
    }
    if (dialog === "secondConfirmation" && confirm) {
      deleteAccount();
    }
  };

  const handleConfirmDelete = async () => {
    if (auth === null || auth.currentUser === null || idToken === null) return;

    if (!isAccepted) {
      handleConfirmationDialog("acceptTerms");
      return;
    }

    if (!password) {
      handleConfirmationDialog("enterPassword");
      return;
    }
    countdownTime = 3;
    handleConfirmationDialog("firstConfirmation");
    updateCountdown();
  };

  const updateCountdown = () => {
    setConfirmButtonOptions({
      text: `${countdownTime}s`,
      isDisabled: true,
    });
    if (countdownTime === 0) {
      // Countdown finished, disable button
      setConfirmButtonOptions({ text: "Kyllä", isDisabled: false });
    } else {
      countdownTime--;
      setTimeout(updateCountdown, 1000); // Call again in 1 second
    }
  };

  const updateRemovedContentText = () => {
    setRemovedContentText(
      "Tilisi on poistettu, ja sinut kirjataan ulos " +
        logoutCountdown +
        " sekunnin kuluttua."
    );
    if (logoutCountdown === 0) {
      signOutMethod();
    } else {
      logoutCountdown--;
      setTimeout(updateRemovedContentText, 1000);
    }
  };

  const deleteAccount = async () => {
    try {
      if (idToken) {
        const passResult = await verifyPassword();
        if (!passResult) throw new Error("Väärä salasana");
        const result = await postDeleteAccount(idToken);
        if (!result.status) throw new Error("Tiliä ei voitu poistaa");
        handleConfirmationDialog("final");
        updateRemovedContentText();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#FF4500",
            width: "90%",
          }}
          onClick={handleConfirmDelete}
        >
          Poista tili
        </Button>
        <FormControlLabel
          sx={{ marginTop: 3, width: "95%" }}
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { marginBottom: "8px" } }} // Adjusts the checkbox icon alignment if needed
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              name="accept"
            />
          }
          label={
            <Typography>
              Ymmärrän, että käyttäjätilin poistaessani kaikki tiedot poistuu
              peruuttamattomasti eikä niiden palautus ole enää mahdollista.
            </Typography>
          }
        />
      </div>
      <ConfirmationDialog
        open={confirmDialogOpen.acceptTerms}
        onClose={() => handleConfirmationDialog("acceptTerms")}
        onConfirm={() => handleConfirmationDialog("acceptTerms")}
        title="Hyväksy ehdot"
        content="Sinun tulee hyväksyä ehdot poistaaksesi tilisi."
        showCancel={true}
        cancelButtonText="Ok"
        cancelButtonBackgroundColor="#57bfb1"
      />
      <ConfirmationDialog
        open={confirmDialogOpen.enterPassword}
        onClose={() => handleConfirmationDialog("enterPassword")}
        onConfirm={() => handleConfirmationDialog("enterPassword")}
        title="Salasana puuttuu"
        content="Syötä salasana poistaaksesi tilisi."
        showCancel={true}
        cancelButtonText="Ok"
        cancelButtonBackgroundColor="#57bfb1"
      />
      <ConfirmationDialog
        open={confirmDialogOpen.firstConfirmation}
        onClose={() => handleConfirmationDialog("firstConfirmation", false)}
        onConfirm={() => handleConfirmationDialog("firstConfirmation", true)}
        title="Vahvista toiminto"
        content="Oletko varma, että haluat poistaa tilisi? Tämä toiminto EI ole peruutettavissa."
        showCancel={true}
        showConfirm={true}
        isDisabled={confirmButtonOptions.isDisabled}
        confirmButtonText={confirmButtonOptions.text}
        confirmButtonColor=""
        confirmButtonBackgroundColor="#FF4500"
        cancelButtonText="Ei"
        cancelButtonColor=""
        cancelButtonBackgroundColor="#57bfb1"
      />
      <ConfirmationDialog
        open={confirmDialogOpen.secondConfirmation}
        onClose={() => handleConfirmationDialog("secondConfirmation", false)}
        onConfirm={() => handleConfirmationDialog("secondConfirmation", true)}
        title="Vahvista toiminto"
        content="Oletko AIVAN varma, että haluat poistaa tilisi? Tämä toiminto EI ole peruutettavissa."
        showCancel={true}
        showConfirm={true}
        isDisabled={confirmButtonOptions.isDisabled}
        confirmButtonText={confirmButtonOptions.text}
        confirmButtonColor=""
        confirmButtonBackgroundColor="#FF4500"
        cancelButtonText="Ei"
        cancelButtonColor=""
        cancelButtonBackgroundColor="#57bfb1"
      />
      <ConfirmationDialog
        open={confirmDialogOpen.final}
        onClose={() => handleConfirmationDialog("final")}
        onConfirm={() => handleConfirmationDialog("final")}
        title="Tili poistettu"
        content={removedContentText}
        showCancel={false}
        showConfirm={false}
      />
    </>
  );
};
