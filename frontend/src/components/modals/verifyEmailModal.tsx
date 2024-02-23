import axios from "axios";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";

type VerifyEmailModalProps = {
  open: boolean;
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  open,
  email,
  setOpen,
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { email, verificationCode };

    try {
      // Send the verification data to the backend using Axios
      const response = await axios.post(
        `${API_BASE_URL}/emailVerification`,
        data
      );

      // Handle the response here if needed
      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error sending verification data:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      disableEscapeKeyDown
    >
      <DialogTitle
        style={{ marginTop: "0px", marginBottom: "0px", marginLeft: "8px" }}
      >
        Vahvista sähköpostisi
      </DialogTitle>
      <Typography
        style={{
          scrollMarginLeft: 10,
          maxWidth: "300px",
          marginLeft: "32px",
          marginRight: "25px",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      >
        Mikäli sähköpostiasi ei vahvisteta, tilauksesi mitätöidään
        automaattisesti.
      </Typography>
      <DialogContent sx={{ maxWidth: 390 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ marginTop: "0px", marginBottom: "0px" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Vahvistuskoodi"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px", marginBottom: "0px" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
