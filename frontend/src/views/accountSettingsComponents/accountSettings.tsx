import React, { useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import {
  Container,
  Divider,
  TextField,
  Button,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import {
  RenderFieldsProps,
  AccountSettingsProps,
  PasswordFieldsProps,
  PasswordDrawerProps,
  RenderInputProps,
  RenderLabelProps,
} from "./types";
import SubmitHandler from "./settingsSubmitHandler";
import { AuthenticationError } from "./errors";
import { TokenContext } from "../../contexts/tokenContext";

const AccountSettings: React.FC<AccountSettingsProps> = ({ settingsData }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const { idToken } = useContext(TokenContext);
  // State variables to hold the current values of the form inputs
  const [fields, setFields] = useState(
    Object.fromEntries(
      Object.entries(settingsData)
        .map(([key, field]) => [key, field.value])
        .concat([
          ["newPassword", ""],
          ["confirmPassword", ""],
          ["oldPassword", ""],
        ])
    )
  );
  const [updatedFields, setUpdatedFields] = useState<{ [key: string]: string }>(
    {}
  );
  // State variables for field edit mode
  const [editModes, setEditModes] = useState<RenderFieldsProps["editModes"]>(
    Object.keys(settingsData).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      { password: false } as RenderFieldsProps["editModes"]
    )
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
    setUpdatedFields({
      ...updatedFields,
      [fieldName]: value,
    });
  };
  const toggleEditMode = (fieldName: string) => {
    setEditModes({
      ...editModes,
      [fieldName]: !editModes[fieldName],
    });
    if (fieldName === "password") {
      setDrawerOpen(!drawerOpen);
      setFields({
        ...fields,
        newPassword: "",
        confirmPassword: "",
      });
      setUpdatedFields((prev) => {
        const updated = { ...prev };
        delete updated.newPassword;
        delete updated.confirmPassword;
        return updated;
      });
    }
    if (editModes[fieldName] && fieldName !== "password") {
      setFields({
        ...fields,
        [fieldName]: settingsData[fieldName].value,
      });
      setUpdatedFields((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(updatedFields)) {
        formData.append(key, value);
      }
      if (!idToken) throw new AuthenticationError("idToken puuttuu.");
      const response = await SubmitHandler(formData, idToken);
      console.log(response);
      if (response.status) {
        setSuccessMessage(response.msg);
      }
    } catch (error) {
      if (error instanceof AuthenticationError) setErrorMessage(error.message);
      else {
        setErrorMessage("Tietojen päivitys epäonnistui");
      }
    }
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm">
        {/* {JSON.stringify(fields)} */}
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Tilin asetukset
        </Typography>
        <form onSubmit={handleSubmit}>
          {Object.keys(settingsData).map((field) => (
            <RenderFields
              key={field}
              fields={fields}
              fieldName={field}
              onChange={handleFieldChange}
              toggleEdit={toggleEditMode}
              editModes={editModes}
              sub={settingsData}
            />
          ))}
          <Box
            display="flex-col"
            alignItems="center"
            textAlign="center"
            maxWidth="sm"
          >
            <PasswordFields
              fields={fields}
              onChange={handleFieldChange}
              editModes={editModes}
              toggleEdit={toggleEditMode}
              drawerOpen={drawerOpen}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Tallenna muutokset
          </Button>
          <Typography
            textAlign="center"
            sx={{ color: "red", marginBottom: 2, marginTop: 2 }}
          >
            {errorMessage}
          </Typography>
          <Typography
            textAlign="center"
            sx={{ color: "green", marginBottom: 2, marginTop: 2 }}
          >
            {successMessage}
          </Typography>
        </form>
      </Container>
    </ThemeProvider>
  );
};

function PasswordFields({
  fields,
  onChange,
  editModes,
  toggleEdit,
  drawerOpen,
}: PasswordFieldsProps) {
  return (
    <>
      <PasswordDrawer
        fields={fields}
        onChange={onChange}
        drawerOpen={drawerOpen}
      />
      <Button
        style={{ marginTop: "10px", alignContent: "center" }}
        onClick={() => toggleEdit("password")}
      >
        {editModes.password ? "Cancel" : "Vaihda salasana"}
      </Button>
      <Divider variant="middle" />
      <Typography variant="subtitle1" style={{ marginBottom: "2px" }}>
        Syötä salasana vahvistaaksesi muutokset
      </Typography>
      <TextField
        label="Vanha salasana"
        type="password"
        value={fields.oldPassword}
        onChange={(e) => onChange("oldPassword", e.target.value)}
        required
        // ... appropriate styles
      />
      {/* Add error messages and submit button  */}
    </>
  );
}

function PasswordDrawer({ fields, onChange, drawerOpen }: PasswordDrawerProps) {
  return (
    <Collapse
      in={drawerOpen}
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Box sx={{ p: 2 }}>
        {" "}
        {/* Add padding */}
        <Typography
          variant="h6"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          Vaihda salasana
        </Typography>
        <TextField
          label="Uusi salasana"
          type="password"
          value={fields.newPassword}
          onChange={(e) => onChange("newPassword", e.target.value)}
          // ... appropriate styles
        />
        <TextField
          label="Vahvista uusi salasana"
          type="password"
          value={fields.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          // ... appropriate styles
        />{" "}
        {/* ... rest of your password fields and button */}
      </Box>
    </Collapse>
  );
}

function RenderFields({
  fields,
  fieldName,
  onChange,
  toggleEdit,
  editModes,
  sub,
}: RenderFieldsProps) {
  return (
    <>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: "2px", textAlign: "left" }}
      >
        {sub[fieldName].title}
      </Typography>
      <Box display="flex" alignItems="center" maxWidth="sm">
        <Box flexBasis="90%">
          {editModes[fieldName] ? (
            <RenderInput
              fields={fields}
              fieldName={fieldName}
              onChange={onChange}
              sub={sub}
            />
          ) : (
            <RenderLabel fields={fields} fieldName={fieldName} />
          )}
        </Box>
        <Button style={{ width: "10%" }} onClick={() => toggleEdit(fieldName)}>
          {editModes[fieldName] ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Divider variant="middle" />
    </>
  );
}

function RenderInput({ fields, fieldName, onChange, sub }: RenderInputProps) {
  return (
    <TextField
      name={fieldName}
      variant="outlined"
      margin="normal"
      value={fields[fieldName]}
      type={sub[fieldName].type}
      autoComplete={sub[fieldName].autocomplete}
      autoFocus
      onChange={(e) => onChange(fieldName, e.target.value)}
      style={{ width: "90%" }}
    />
  );
}

function RenderLabel({ fields, fieldName }: RenderLabelProps) {
  return (
    <Typography variant="body1" style={{ marginRight: "10px", width: "90%" }}>
      {fields[fieldName]}
    </Typography>
  );
}

export default AccountSettings;
