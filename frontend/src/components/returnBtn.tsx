import React from "react";
import { useNavigate } from "react-router-dom";
//import Button from "@mui/material/Button";
import { Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Define the props interface with an optional message prop
interface ReturnBtnProps {
  message?: string;
}

// Use the props interface in your component
const ReturnBtn: React.FC<ReturnBtnProps> = ({ message = "Paluu" }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        mb: 1,
        width: "100px",
        background: "transparent",
        color: "#000000",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#000000",
        },
      }}
      variant="text"
      onClick={() => navigate(-1)}
    >
      <ArrowBackIosIcon fontSize="small" />
      <Typography variant="body2">{message}</Typography>
    </Button>
  );
};

export default ReturnBtn;
