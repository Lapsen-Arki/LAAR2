import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// Define the props interface with an optional message prop
interface ReturnBtnProps {
  message?: string;
}

// Use the props interface in your component
const ReturnBtn: React.FC<ReturnBtnProps> = ({ message = "🡨 Paluu" }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ mb: 5, background: "none" }}
      variant="text"
      onClick={() => navigate(-1)}
    >
      {message}
    </Button>
  );
};

export default ReturnBtn;
