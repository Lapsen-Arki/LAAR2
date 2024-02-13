import { MenuItem, Select, Box, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { NamesAndAgesType } from "../../types/typesFrontend";

export default function NameDropDown({
  changerFunc,
}: {
  changerFunc?: (newValue: string) => void | undefined;
}) {
  const { isLoggedIn } = useContext(TokenContext);
  const [childNames, setChildNames] = useState([""]);
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild") || childNames[0];
  });

  // Updating and loading the children names in dropdown:
  useEffect(() => {
    sessionStorage.setItem("selectedChild", selectedChild);
    if (isLoggedIn) {
      const childNamesAndAgesStr = sessionStorage.getItem("childNamesAndAges");
      if (childNamesAndAgesStr) {
        const childNamesAndAges: NamesAndAgesType[] =
          JSON.parse(childNamesAndAgesStr);

        const listOfNames = childNamesAndAges.map((child) => child.childName);

        setChildNames(listOfNames);
      }
    } else {
      // Preview names
      setChildNames(["Ulpukka", "Kullervo", "Liisa"]);
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
          value={childNames.includes(selectedChild) ? selectedChild : ""}
          onChange={(e) => {
            if (changerFunc) {
              // Send new value to parent:
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
