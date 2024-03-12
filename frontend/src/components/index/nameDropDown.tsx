import {
  MenuItem,
  Select,
  Box,
  InputLabel,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { NamesAndAgesType } from "../../types/typesFrontend";
import makeChildObject from "../../utils/makeChildObject";
import { getChildProfiles } from "../../api/childProfile/getChildProfiles";
import { getCarerChildProfiles } from "../../api/carersProfile/getCarerChildProfiles";
import { Link } from "react-router-dom";

export default function NameDropDown({
  changerFunc,
}: {
  changerFunc?: (newValue: string) => void | undefined;
}) {
  const { isLoggedIn, idToken, ready } = useContext(TokenContext);
  const [childNames, setChildNames] = useState([""]);
  const [selectedChild, setSelectedChild] = useState(() => {
    return sessionStorage.getItem("selectedChild") || childNames[0];
  });

  // Updating and loading the children names in dropdown:
  useEffect(() => {
    if (ready) {
      sessionStorage.setItem("selectedChild", selectedChild);

      const asyncLoad = async () => {
        if (isLoggedIn && idToken) {
          if (!sessionStorage.getItem("childNamesAndAges")) {
            // Fetching child profiles and making name&age object:
            await getChildProfiles(idToken);
            await getCarerChildProfiles();
            makeChildObject();
          }
          const childNamesAndAgesJSON =
            sessionStorage.getItem("childNamesAndAges");
          if (childNamesAndAgesJSON) {
            const childNamesAndAges: NamesAndAgesType[] = await JSON.parse(
              childNamesAndAgesJSON
            );

            const listOfNames = childNamesAndAges.map(
              (child) => child.childName
            );
            setChildNames(listOfNames);
          }
        } else {
          // Preview names
          setChildNames(["Ulpukka", "Kullervo", "Liisa"]);
        }
      };

      asyncLoad();
    }
  }, [idToken, isLoggedIn, ready, selectedChild]);

  return (
    <>
      {childNames[0]?.length >= 2 && (
        <Box sx={{ display: "flex-1", justifyContent: "flex-start" }}>
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
      )}
      {!childNames[0] && (
        <Alert severity="info">
          <Typography>
            Sinulla ei ole vielä yhtään profiilia tai sinua ei ole kutsuttu
            hoitajaksi.{" "}
            <Link to={"/profile"}>Voit luoda profiileja täältä.</Link>
          </Typography>
        </Alert>
      )}
    </>
  );
}
