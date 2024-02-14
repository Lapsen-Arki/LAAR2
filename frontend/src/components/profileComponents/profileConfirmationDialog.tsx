import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Oletko varma että haluat poistaa profiilin?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tämä toiminto poistaa profiilin pysyvästi.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Ei
        </Button>
        <Button onClick={() => { onConfirm(); onClose(); }} color="error">
          Kyllä
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
