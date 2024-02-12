import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../components/Layout/formThemeMUI";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const sub: {
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
};

interface RenderFieldsProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
  toggleEdit: (fieldName: string) => void;
  editModes: { [key: string]: boolean };
}
interface RenderInputProps {
  fields: { [key: string]: string };
  fieldName: string;
  onChange: (fieldName: string, value: string) => void;
}
interface RenderLabelProps {
  fields: { [key: string]: string };
  fieldName: string;
}

const AccountSettings = () => {
  // State variables to hold the current values of the form inputs
  const [fields, setFields] = useState(
    Object.fromEntries(
      Object.entries(sub).map(([key, field]) => [key, field.value])
    )
  );
  // State variables for field edit mode
  const [editModes, setEditModes] = useState<RenderFieldsProps["editModes"]>({
    name: false,
    email: false,
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };
  const toggleEditMode = (fieldName: string) => {
    setEditModes({
      ...editModes,
      [fieldName]: !editModes[fieldName],
    });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="sm">
        <Typography variant="h4" style={{ textAlign: "center" }}></Typography>
        <form onSubmit={(e) => console.log(e.target)}>
          {Object.keys(sub).map((field) => (
            <RenderFields
              fields={fields}
              fieldName={field}
              onChange={handleFieldChange}
              toggleEdit={toggleEditMode}
              editModes={editModes}
            />
          ))}
        </form>
      </Container>
    </ThemeProvider>
  );
};

function RenderFields({
  fields,
  fieldName,
  onChange,
  toggleEdit,
  editModes,
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
            />
          ) : (
            <RenderLabel fields={fields} fieldName={fieldName} />
          )}
        </Box>
        <Button style={{ width: "10%" }} onClick={() => toggleEdit(fieldName)}>
          {editModes[fieldName] ? "Stop" : "Edit"}
        </Button>
      </Box>
    </>
  );
}

function RenderInput({ fields, fieldName, onChange }: RenderInputProps) {
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
