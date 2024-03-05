import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "../../styles/formThemeMUI";
import { RenderPaymentMethodFields } from "./paymentMethodFields";
import { RenderPasswordFields } from "./passwordFields";
import { RenderSettingsDataFields } from "./settingsDataFields";
import {
  Container,
  Divider,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { RenderFieldsProps, AccountSettingsProps, EditModes } from "./types";
import SubmitHandler from "./settingsSubmitHandler";
import { AuthenticationError } from "./errors";
import { TokenContext } from "../../contexts/tokenContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { deleteAccount } from "../../api/accountManagement/deleteAccount";
import ConfirmationDialog from "../../components/ConfirmationDialog";

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

const AccountSettings: React.FC<AccountSettingsProps> = ({
  settingsData,
  dbData,
  idToken,
}) => {
  // getAuth from AuthContext provider.
  const { auth } = useContext(AuthContext);
  // Get tokencontext for signout
  const { signOutMethod } = useContext(TokenContext);
  const stripe = useStripe();
  const elements = useElements();
  const [isFocused, setIsFocused] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isAccepted, setIsAccepted] = React.useState(false);
  const [cardAsDefault, setCardAsDefault] = useState(false);
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
  defaultEditModes["paymentMethod"] = false;

  // Setting the default edit modes to the editModes state.
  const [editModes, setEditModes] =
    useState<RenderFieldsProps["editModes"]>(defaultEditModes);

  // Popout state for the change password field. This causes the password fields to pop out instead of always being visible to the user to save space on the page.
  const [popOutPassword, setPopoutPassword] = useState(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  // Here we update the formValues and updatedFormFields objects when the form fields are changed.
  // This is done by using the field name as the key, and the value as the value.
  // The formValues show the current values of the form fields, and the updatedFormFields is used to store the values for submission.
  const handleFieldChange = (fieldName: string, value: string) => {
    // sets the fieldname key to the new value on change
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
    // Also updates it to the updatedFormFields object, which is used to store the updated values for submission.
    setUpdatedFormFields({
      ...updatedFormFields,
      [fieldName]: value,
    });
  };
  // Toggle edit mode, for removing updatedFieldData and for changing the display state of the input fields
  const toggleEditMode = (fieldName: string) => {
    // Toggles the edit mode of key fieldname by setting it to equal the opposite of the current value.
    setEditModes({
      ...editModes,
      [fieldName]: !editModes[fieldName],
    });
    // If the toggled field is payment method, skip the rest of this function and return.
    // This is because paymentMethod uses a separate data component and does not need to be handled here.
    if (fieldName === "paymentMethod") {
      return;
    }
    // If the toggled field is password, it will pop out the password fields instead of just changing the edit mode.
    // This is because the password fields are two separate fields, and require both to be toggled at the same time.
    if (fieldName === "password") {
      setPopoutPassword(!popOutPassword);
      setFormValues({
        ...formValues,
        newPassword: "",
        confirmPassword: "",
      });
      // On toggle, delete the password fields from the updatedFormFields object, so that the unchanged values will not be submitted.
      setUpdatedFormFields((prev) => {
        const updated = { ...prev };
        delete updated.newPassword;
        delete updated.confirmPassword;
        return updated;
      });
    }
    // Logic for all the rest of the fields that are built through settingsData object.
    if (editModes[fieldName] && fieldName !== "password") {
      // This sets the formValues object to the original values from the settingsData object.
      setFormValues({
        ...formValues,
        [fieldName]: settingsData[fieldName].value,
      });
      // This deletes the field from the updatedFormFields object, so that the unchanged values will not be submitted.
      setUpdatedFormFields((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };
  // Quick hotfix against browser autofill of fields that are not visible
  const deleteNonEditedFields = () => {
    for (const fieldName in updatedFormFields) {
      if (fieldName === "oldPassword") continue;
      if (!editModes[fieldName]) {
        delete updatedFormFields[fieldName];
      }
    }
  };

  // dialog set
  const [acceptTermsDialogOpen, setAcceptTermsDialogOpen] = useState(false);
  const [enterPasswordDialogOpen, setEnterPasswordDialogOpen] = useState(false);
  const [firstConfirmationDialogOpen, setFirstConfirmationDialogOpen] =
    useState(false);
  const [secondConfirmationDialogOpen, setSecondConfirmationDialogOpen] =
    useState(false);

  const handleClose = () => {
    setAcceptTermsDialogOpen(false);
    setEnterPasswordDialogOpen(false);
    setFirstConfirmationDialogOpen(false);
    setSecondConfirmationDialogOpen(false);
    return;
  };

  const handleConfirm = () => {
    handleClose();
  };
  /// dialog end

  const deleteUser = async () => {
    if (auth === null || auth.currentUser === null || idToken === null) return;

    if (!isAccepted) {
      setAcceptTermsDialogOpen(true);
      return;
    }

    if (!updatedFormFields.oldPassword) {
      setEnterPasswordDialogOpen(true);
      return;
    }

    setFirstConfirmationDialogOpen(true);
  };

  const handleFirstConfirmation = () => {
    setTimeout(() => {
      setSecondConfirmationDialogOpen(true);
    }, 1000);
  };

  const handleSecondConfirmation = async () => {
    try {
      if (idToken) {
        const result = await deleteAccount(idToken);
        if (!result.status) throw new Error("Väärä salasana");
        await sleep(3000);
        setSecondConfirmationDialogOpen(false);
        signOutMethod();
      }
    } catch (error) {
      console.error(error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verifyCard = async (stripe: any, elements: any) => {
    const card = elements.getElement(CardElement);
    if (card === null) throw new Error("Kortti ei ole määritetty.");
    const result = await stripe.createToken(card);
    if (result.error) {
      console.error(result.error.message);
      throw new AuthenticationError("Virheellinen maksukortti.");
    }
    return result.token;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!stripe || !elements) {
      console.error("Stripe or elements not defined");
      return;
    }
    const isChangingPaymentMethod = editModes.paymentMethod;

    try {
      // Stripe card verification, if the user is changing the payment method.
      let token: string;
      if (isChangingPaymentMethod) {
        token = await verifyCard(stripe, elements);
      } else {
        token = "unchanged";
      }

      if (auth === null || auth.currentUser === null)
        throw new AuthenticationError("Käyttäjä ei ole kirjautunut sisään");
      deleteNonEditedFields();
      const response = await SubmitHandler(
        updatedFormFields,
        auth,
        idToken,
        token,
        cardAsDefault
      );
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
        <Typography
          variant="h4"
          style={{ marginTop: "8px", textAlign: "center" }}
        >
          Tilin asetukset
        </Typography>
        <form onSubmit={handleSubmit}>
          {Object.keys(settingsData).map((field) => (
            <RenderSettingsDataFields
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
            <RenderPaymentMethodFields
              dbData={dbData}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              editModes={editModes}
              toggleEdit={toggleEditMode}
              idToken={idToken}
              cardAsDefault={cardAsDefault}
              setCardAsDefault={setCardAsDefault}
            />
            <Divider variant="middle" />
            <RenderPasswordFields
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#FF4500",
              width: "90%",
            }}
            onClick={deleteUser}
          >
            Poista tili
          </Button>
          <FormControlLabel
            sx={{ marginTop: 3, width: "95%" }}
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { marginBottom: "8px" } }} // Adjusts the checkbox icon alignment if needed
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
                name="accept"
              />
            }
            label={
              <Typography>
                Ymmärrän, että käyttäjätilin poistaessani kaikki tiedot poistuu
                peruuttamattomasti eikä niiden palautus ole enää mahdollista.
              </Typography>
            }
          />
        </div>

        <ConfirmationDialog
          open={acceptTermsDialogOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Hyväksy ehdot"
          content="Sinun tulee hyväksyä ehdot poistaaksesi tilisi."
          showCancel={true}
          cancelButtonText="Ok"
          cancelButtonBackgroundColor="#57bfb1"
        />
        <ConfirmationDialog
          open={enterPasswordDialogOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Salasana puuttuu"
          content="Syötä salasana poistaaksesi tilisi."
          showCancel={true}
          cancelButtonText="Ok"
          cancelButtonBackgroundColor="#57bfb1"
        />
        <ConfirmationDialog
          open={firstConfirmationDialogOpen}
          onClose={handleClose}
          onConfirm={handleFirstConfirmation}
          title="Vahvista toiminto"
          content="Oletko varma, että haluat poistaa tilisi? Tämä toiminto EI ole peruutettavissa."
          showCancel={true}
          showConfirm={true}
          confirmButtonText="Kyllä"
          confirmButtonColor=""
          confirmButtonBackgroundColor="#FF4500"
          cancelButtonText="Ei"
          cancelButtonColor=""
          cancelButtonBackgroundColor="#57bfb1"
        />
        <ConfirmationDialog
          open={secondConfirmationDialogOpen}
          onClose={handleClose}
          onConfirm={handleSecondConfirmation}
          title="Vahvista toiminto"
          content="Oletko AIVAN varma, että haluat poistaa tilisi? Tämä toiminto EI ole peruutettavissa."
          showCancel={true}
          showConfirm={true}
          confirmButtonText="Kyllä"
          confirmButtonColor=""
          confirmButtonBackgroundColor="#FF4500"
          cancelButtonText="Ei"
          cancelButtonColor=""
          cancelButtonBackgroundColor="#57bfb1"
        />
      </Container>
    </ThemeProvider>
  );
};

export default AccountSettings;
