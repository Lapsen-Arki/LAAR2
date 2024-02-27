import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
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
  PasswordPopOutProps,
  RenderInputProps,
  RenderLabelProps,
  EditModes,
} from "./types";
import SubmitHandler from "./settingsSubmitHandler";
import { AuthenticationError } from "./errors";
import { TokenContext } from "../../contexts/tokenContext";
import "./styles.css";

// AccountSettings component
// Blame Esa for everything that is wrong with this component
// Adjust the amount of fields that are built in the dataHandler component
// If you wish to make a new field, add it to the dataHandler component, in the same format if possible.
// It is also possible to directly add your own fields directly in to form manually, however use the dataHandler unless you want a different style or functionality.
// Type adjustments should be made accordingly to the AccountSettingsFormData interface in types.ts
// When adding a new field, add the handling for updating it in the SubmitHandler -> updateSettings function, or in the backend(backend api route and post request function is already available, however backend does not have any functionality in updating yet).
// RenderFields, RenderInput, RenderLabel, PasswordFields and PasswordPopOut are helper components for rendering the form fields.
// Keeping with the theme, if you add a new field manually then you should probably make a new helper component for it as well.
// If this still ends up being too complicated I will refactor it later, for now I will document as best as I can

const AccountSettings: React.FC<AccountSettingsProps> = ({ settingsData }) => {
  // getAuth from AuthContext provider.
  const { auth } = useContext(AuthContext);
  // Get tokencontext for signout
  const { signOutMethod } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  // State variables built from settingsData
  // settingsData is in format key: {title: string, value: string, type: string, autocomplete: string}
  // forms are built with these settings, for each key in settingsData
  const [formValues, setFormValues] = useState(
    Object.fromEntries(
      Object.entries(settingsData)
        // The map uses the settingsData object to build the formValues object, which is used by the other components to build up the form.
        .map(([key, field]) => [key, field.value])
        /* At the end, the password fields are concatenated to the formValues object, as they are not in the settingsData object. 
        This allows making custom components for these functions while not having to make a separate state object for them. 
        So, if you wish to add a new field manually, add a it with the same method here first, as [key, value]. */
        .concat([
          ["newPassword", ""],
          ["confirmPassword", ""],
          ["oldPassword", ""],
        ])
    )
  );
  // The updatedFormFields object is used to store the updated values of the form fields, which are then sent to the backend.
  // These values will be cleared if editmode is cancelled, so that the unchanged values will not be submitted.
  const [updatedFormFields, setUpdatedFormFields] = useState<{
    [key: string]: string;
  }>({});
  // Set default edit modes for the form fields. Default is always initially false.
  // The loop is for fields defined in settingsData, and the password field is added manually.
  // If adding fields manually, and wish to have edit mode for them, add them to the defaultEditModes object.
  const defaultEditModes: EditModes = {};
  for (const key in settingsData) {
    defaultEditModes[key] = false;
  }
  defaultEditModes["password"] = false;

  // Setting the default edit modes to the editModes state.
  const [editModes, setEditModes] =
    useState<RenderFieldsProps["editModes"]>(defaultEditModes);

  // Popout state for the change password field. This causes the password fields to pop out instead of always being visible to the user to save space on the page.
  const [popOutPassword, setPopoutPassword] = useState(false);

  // Here we update the formValues and updatedFormFields objects when the form fields are changed.
  // This is done by using the field name as the key, and the value as the value.
  // The formValues show the current values of the form fields, and the updatedFormFields is used to store the values for submission.
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
    setUpdatedFormFields({
      ...updatedFormFields,
      [fieldName]: value,
    });
  };
  const toggleEditMode = (fieldName: string) => {
    setEditModes({
      ...editModes,
      [fieldName]: !editModes[fieldName],
    });
    if (fieldName === "password") {
      setPopoutPassword(!popOutPassword);
      setFormValues({
        ...formValues,
        newPassword: "",
        confirmPassword: "",
      });
      setUpdatedFormFields((prev) => {
        const updated = { ...prev };
        delete updated.newPassword;
        delete updated.confirmPassword;
        return updated;
      });
    }
    if (editModes[fieldName] && fieldName !== "password") {
      setFormValues({
        ...formValues,
        [fieldName]: settingsData[fieldName].value,
      });
      setUpdatedFormFields((prev) => {
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
      if (auth === null || auth.currentUser === null)
        throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
      const response = await SubmitHandler(updatedFormFields, auth);
      if (response.status) {
        setSuccessMessage(response.msg);
        signOutMethod();
      } else {
        setErrorMessage(response.msg);
      }
    } catch (error) {
      if (error instanceof AuthenticationError) {
        setErrorMessage(error.message);
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
              fields={formValues}
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
              fields={formValues}
              onChange={handleFieldChange}
              editModes={editModes}
              toggleEdit={toggleEditMode}
              drawerOpen={popOutPassword}
            />
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "90%" }}
            >
              Tallenna muutokset
            </Button>
          </div>
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
      <PasswordPopOut
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
        style={{ width: "90%" }}
        label="Vanha salasana"
        type="password"
        margin="normal"
        value={fields.oldPassword}
        onChange={(e) => onChange("oldPassword", e.target.value)}
        required
        // ... appropriate styles
      />
      {/* Add error messages and submit button  */}
    </>
  );
}

function PasswordPopOut({ fields, onChange, drawerOpen }: PasswordPopOutProps) {
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
          margin="dense"
          value={fields.newPassword}
          onChange={(e) => onChange("newPassword", e.target.value)}
          style={{ width: "90%" }}
          // ... appropriate styles
        />
        <TextField
          label="Vahvista uusi salasana"
          type="password"
          margin="dense"
          value={fields.confirmPassword}
          style={{ width: "90%" }}
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
    />
  );
}

function RenderLabel({ fields, fieldName }: RenderLabelProps) {
  return (
    <Typography
      variant="body1"
      style={{ marginLeft: "8px", marginRight: "10px", width: "90%" }}
    >
      {fields[fieldName]}
    </Typography>
  );
}

export default AccountSettings;
