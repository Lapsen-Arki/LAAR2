/* KÄYTTÖ:

<ConfirmationDialog
  open={dialogOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Oletko varma?"
  content="Haluatko varmasti jatkaa?"
  showCancel={true}
  showConfirm={true}
  confirmButtonText="Kyllä"
  confirmButtonColor="#FF4500"
  confirmButtonBackgroundColor=""
  cancelButtonText="Ei"
  cancelButtonColor="#57bfb1"
  cancelButtonBackgroundColor=""
/>
*/

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
  title: string;
  content: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  confirmButtonBackgroundColor?: string;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  cancelButtonBackgroundColor?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  showCancel = false,                       // Oletusarvo
  showConfirm = false,                      // Oletusarvo
  confirmButtonText = "Kyllä",              // Oletusarvo
  confirmButtonColor = "black",             // Oletusarvo
  confirmButtonBackgroundColor = "",        // Oletusarvo
  cancelButtonText = "Ei",                  // Oletusarvo
  cancelButtonColor = "black",              // Oletusarvo
  cancelButtonBackgroundColor = "",    // Oletusarvo
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showCancel && (
          <Button onClick={onClose} color="primary" sx={{ color: cancelButtonColor, background: cancelButtonBackgroundColor }}>
            {cancelButtonText}
          </Button>
        )}
        {showConfirm && (
          <Button onClick={() => { onConfirm(); onClose(); }} color="error" sx={{ color: confirmButtonColor, background: confirmButtonBackgroundColor }}>
            {confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;