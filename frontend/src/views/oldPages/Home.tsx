import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TimeBlock from "./TimeBlocking2Demo";
import TimeBlockPreview from "./TimeBlockPreview";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";

export default function Home() {
  const [target, setTarget] = useState("");
  const [insertOn, setInsertOn] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
    setInsertOn(false);
  };

  const handleSelectChange =
    (stateSetter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: SelectChangeEvent<string | number>) => {
      handleChange(stateSetter, e.target.value as string);
    };
  return (
    <div className="preview-page">
      <div className="preview-top-panel">
        <div className="preview-image"></div>
        <div className="preview-top-right">
          <div className="preview-description">
            <h1>Lapsen arkirytmi</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
            <Switch
              {...label}
              checked={insertOn}
              onChange={() => setInsertOn(!insertOn)}
            />
          </div>
          <div className="preview-top-right-bottom">
            <div className="preview-grid-title">
              {insertOn ? <h2 className="preview-h2">Luo ateria</h2> : null}
            </div>
            <div className="preview-target">
              <FormControl fullWidth>
                <InputLabel id="preview-target-label">Lapsi</InputLabel>
                <Select
                  labelId="preview-target-label"
                  id="preview-target-select"
                  value={target}
                  label="Lapsi"
                  onChange={handleSelectChange(setTarget)}
                >
                  <MenuItem value={"Ulpukka"}>Ulpukka</MenuItem>
                  <MenuItem value={"Kullervo"}>Kullervo</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      {insertOn ? <TimeBlockPreview /> : <TimeBlock />}
      <div className="preview-register">
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{ backgroundColor: "#39C4A3" }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
