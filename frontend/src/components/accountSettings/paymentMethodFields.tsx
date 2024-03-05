import React, { useState } from "react";
import {
  Collapse,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CardElement } from "@stripe/react-stripe-js";
import {
  RenderPaymentMethodFieldsTypes,
  PaymentMethodFieldsTypes,
} from "./types";
import { postCardUpdate } from "../../api/accountManagement/postCardUpdate";
const CARD_ELEMENT_STYLES = {
  style: {
    base: {
      color: "black",
      iconColor: "black",
      fontSize: "13px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "black",
      },
      "::placeholder": {
        color: "#black",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};

export const RenderPaymentMethodFields: React.FC<
  RenderPaymentMethodFieldsTypes
> = ({
  dbData,
  isFocused,
  setIsFocused,
  editModes,
  toggleEdit,
  idToken,
  cardAsDefault,
  setCardAsDefault,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleEdit = (fieldName: string) => {
    toggleEdit(fieldName);
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <PaymentMethodPopOut
        dbData={dbData}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        drawerOpen={drawerOpen}
        idToken={idToken}
        cardAsDefault={cardAsDefault}
        setCardAsDefault={setCardAsDefault}
      />
      <Button
        style={{ marginTop: "0", alignContent: "center" }}
        onClick={() => handleEdit("paymentMethod")}
      >
        {editModes.paymentMethod ? "Cancel" : "Vaihda maksukortti"}
      </Button>
    </>
  );
};

function PaymentMethodPopOut({
  dbData,
  isFocused,
  setIsFocused,
  drawerOpen,
  idToken,
  cardAsDefault,
  setCardAsDefault,
}: PaymentMethodFieldsTypes) {
  const updateCard = async (action: string, cardId: string) => {
    if (idToken === null) {
      return;
    }
    const response = await postCardUpdate(action, idToken, cardId);
    if (!response.status) {
      console.error(response.message);
    } else {
      window.location.reload();
    }
  };
  return (
    <Collapse in={drawerOpen}>
      <Typography
        style={{ marginTop: "10px", textAlign: "center" }}
        variant="body1"
      >
        Vaihda maksukortti
      </Typography>
      {dbData.map((card) => (
        <Box
          display="flex"
          alignItems="center"
          maxWidth="sm"
          justifyContent="space-between"
          key={card.id}
          sx={{
            margin: "auto",
            borderColor: isFocused ? "black" : "black",
            "&:hover": {
              borderColor: "#000000",
            },

            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Box
            flexBasis="50%"
            display="flex"
            sx={{ textAlign: "left", flexDirection: "column" }}
          >
            <Typography variant="body1">
              **** **** **** **** {card.last4}
            </Typography>
            <Typography variant="body1">
              {card.brand} {card.expMonth}/{card.expYear.toString().slice(-2)}
            </Typography>
            {card.isDefault && (
              <Typography variant="body1">Oletuskortti</Typography>
            )}
            <Typography variant="body1"></Typography>
          </Box>
          <Button
            disabled={card.isDefault}
            style={{ width: "25%", fontSize: "12px" }}
            onClick={() => updateCard("update", card.id)}
          >
            Aseta Oletukseksi
          </Button>
          <Button
            disabled={card.isDefault}
            style={{ width: "15%", fontSize: "12px" }}
            onClick={() => updateCard("delete", card.id)}
          >
            Poista Kortti
          </Button>
        </Box>
      ))}
      <Box
        sx={{
          background: "white",
          padding: 2,
          border: "solid",
          borderWidth: isFocused ? 2 : 1,
          borderRadius: "4px",
          margin: "auto",
          borderColor: isFocused ? "black" : "black",
          "&:hover": {
            borderColor: "#000000",
          },
          width: "73%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <CardElement
          options={CARD_ELEMENT_STYLES}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Box>
      <FormControlLabel
        sx={{ marginTop: 3, width: "95%" }}
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { marginBottom: "8px" } }} // Adjusts the checkbox icon alignment if needed
            checked={cardAsDefault}
            onChange={() => setCardAsDefault(!cardAsDefault)}
            name="accept"
          />
        }
        label={<Typography>Aseta tämä kortti oletus maksukortiksi.</Typography>}
      />
    </Collapse>
  );
}
