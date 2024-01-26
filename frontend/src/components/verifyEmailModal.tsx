import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

type VerifyEmailModalProps = {
  open: boolean;
};

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({ open }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // SEND VERIFICATION CODE TO BACKEND
  };

  return (
    <Dialog open={open} onClose={() => {}} disableEscapeKeyDown>
      <DialogTitle>Vahvista sähköpostisi</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ background: "white" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Vahvistuskoodi"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
