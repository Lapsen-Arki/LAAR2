import axios from "axios";
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
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  open,
  email,
  setOpen,
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_BASE_URL = "http://localhost:3000/api";
    console.log(verificationCode);

    const data = { email, verificationCode };

    try {
      // Send the verification data to the backend using Axios
      const response = await axios.post(
        `${API_BASE_URL}/emailVerification`,
        data
      );

      // Handle the response here if needed
      console.log("Verification data sent successfully:", response.data);
      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error sending verification data:", error);
    }
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
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
