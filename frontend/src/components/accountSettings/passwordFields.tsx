import React, { useState } from "react";
import {
  Button,
  Divider,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Collapse,
} from "@mui/material";
import { PasswordFieldsProps, PasswordPopOutProps } from "./types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const RenderPasswordFields: React.FC<PasswordFieldsProps> = ({
  fields,
  onChange,
  editModes,
  toggleEdit,
  drawerOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibilityOld = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <PasswordPopOut
        fields={fields}
        onChange={onChange}
        drawerOpen={drawerOpen}
      />
      <Button
        style={{ marginTop: "0", alignContent: "center" }}
        onClick={() => toggleEdit("password")}
      >
        {editModes.password ? "Cancel" : "Vaihda salasana"}
      </Button>
      <Divider variant="middle" />
      <Box sx={{ p: 2 }}>
        {" "}
        {/* Add padding */}
        <Typography variant="subtitle1" style={{ marginBottom: "2px" }}>
          Syötä salasana vahvistaaksesi muutokset
        </Typography>
        <TextField
          style={{ width: "90%" }}
          label="Vanha salasana"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={fields.oldPassword}
          autoComplete="off"
          onChange={(e) => onChange("oldPassword", e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibilityOld}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          // ... appropriate styles
        />
      </Box>
      {/* Add error messages and submit button  */}
    </>
  );
};

function PasswordPopOut({ fields, onChange, drawerOpen }: PasswordPopOutProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibilityNew = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Collapse in={drawerOpen}>
      <Box sx={{ p: 2 }}>
        {" "}
        {/* Add padding */}
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Vaihda salasana
        </Typography>
        <TextField
          label="Uusi salasana"
          type={showPassword ? "text" : "password"}
          margin="dense"
          value={fields.newPassword}
          autoComplete="off"
          onChange={(e) => onChange("newPassword", e.target.value)}
          style={{ width: "90%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibilityNew}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          // ... appropriate styles
        />
        <TextField
          label="Vahvista uusi salasana"
          type={showPassword ? "text" : "password"}
          margin="dense"
          value={fields.confirmPassword}
          style={{ width: "90%" }}
          autoComplete="off"
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibilityNew}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          // ... appropriate styles
        />{" "}
        {/* ... rest of your password fields and button */}
      </Box>
    </Collapse>
  );
}
