import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../components/Layout/formThemeMUI";
import {
  Container,
  Divider,
  TextField,
  Button,
  Typography,
  Box,
  Collapse,
} from "@mui/material";

/* const sub: {
  [key: string]: {
    title: string;
    type: string;
    autocomplete: string;
    value: string;
  };
} = {
  name: {
    title: "Name",
    type: "text",
    autocomplete: "name",
    value: "John Doe",
  },
  email: {
    title: "Email",
    type: "email",
    autocomplete: "email",
    value: "john.doe@example.com",
  },
}; */

type SubType = {
  [key: string]: {
    title: string;
    type: string;
    autocomplete: string;
    value: string;
  };
};
interface AccountSettingsProps {
  sub: SubType;
}
interface RenderFieldsProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
  toggleEdit: (fieldName: string) => void;
  editModes: { [key: string]: boolean };
  sub: { [key: string]: { title: string; type: string; autocomplete: string } };
}
interface RenderInputProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
  sub: { [key: string]: { title: string; type: string; autocomplete: string } };
}
interface RenderLabelProps {
  fields: { [key: string]: string };
  fieldName: string;
}
interface PasswordFieldsProps {
  fields: { [key: string]: string };
  onChange: (fieldName: string, value: string) => void;
  editModes: { [key: string]: boolean };
  toggleEdit: (fieldName: string) => void;
  drawerOpen: boolean;
}
interface PasswordDrawerProps {
  fields: { [key: string]: string };
  onChange: (fieldName: string, value: string) => void;
  drawerOpen: boolean;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ sub }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  // State variables to hold the current values of the form inputs
  const [fields, setFields] = useState(
    Object.fromEntries(
      Object.entries(sub)
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
    Object.keys(sub).reduce(
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
        [fieldName]: sub[fieldName].value,
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
    const formData = new FormData();
    for (const [key, value] of Object.entries(updatedFields)) {
      formData.append(key, value);
    }
    console.log(formData);
    setErrorMessage("haha");
    setSuccessMessage("Ahah!");
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm">
        {/* {JSON.stringify(fields)} */}
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Tilin asetukset
        </Typography>
        <form onSubmit={handleSubmit}>
          {Object.keys(sub).map((field) => (
            <RenderFields
              fields={fields}
              fieldName={field}
              onChange={handleFieldChange}
              toggleEdit={toggleEditMode}
              editModes={editModes}
              sub={sub}
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
          <Typography sx={{ color: "red", marginBottom: 2, marginTop: 2 }}>
            {errorMessage}
          </Typography>
          <Typography sx={{ color: "green", marginBottom: 2, marginTop: 2 }}>
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
