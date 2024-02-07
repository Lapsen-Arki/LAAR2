import { MenuItem, Select, Box, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";

export default function NameDropDown({
  changerFunc,
}: {
  changerFunc?: (newValue: string) => void | undefined;
}) {
  const { isLoggedIn } = useContext(TokenContext);
  const [childNames, setchildNames] = useState([""]);
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild") || childNames[0];
  });

  // Updating the children names in dropdown based on login status:
  useEffect(() => {
    sessionStorage.setItem("selectedChild", selectedChild);
    if (isLoggedIn) {
      // Fetch the children's names and ages here
      // Later fetching also each child's allergies if adding the feature

      const listOfNames = ["fetching", "the", "childProfileNames", "here"];

      setchildNames(listOfNames);
    } else {
      // Setting preview names
      setchildNames(["Ulpukka", "Kullervo"]);
    }
  }, [isLoggedIn, selectedChild]);

  return (
    <>
      <Box
        sx={{ display: "flex-1", justifyContent: "flex-start", mt: 5, mb: 5 }}
      >
        <InputLabel id="preview-target-label">Valitse Lapsi</InputLabel>
        <Select
          labelId="preview-target-label"
          id="preview-target-select"
          label="Valitse Lapsi"
          value={selectedChild}
          onChange={(e) => {
            if (changerFunc) {
              changerFunc(e.target.value);
            }
            setSelectedChild(e.target.value);
          }}
          sx={{ width: 150, alignContent: "right" }}
        >
          {/* Mapping child names to dropdown: */}
          {childNames.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
}
