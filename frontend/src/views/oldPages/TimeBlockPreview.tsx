import React from "react";
import { useState } from "react";
import "../../styles/timeBlocking.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FoodDropDownProps {
  id: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent<string | number | unknown>) => void;
}

const FoodDropDown: React.FC<FoodDropDownProps> = ({
  id,
  value,
  options,
  onChange,
}) => {
  const CustomSelect = styled(Select)({
    width: "200px",
  });

  return (
    <FormControl>
      <CustomSelect
        id={id}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default function TimeBlockPreview() {
  const [porridge, setPorridge] = useState<string>("");
  const [drink, setDrink] = useState<string>("");
  const [fruit, setFruit] = useState<string>("");
  const [bread, setBread] = useState<string>("");
  const [culturedDairy, setCulturedDairy] = useState<string>("");
  const [vegetable, setVegetable] = useState<string>("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "left",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="preview-grid">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Item>
              <p>puuro</p>
              <FoodDropDown
                id="porridge"
                value={porridge}
                options={["kaurapuuro", "mannapuuro"]}
                onChange={(e) => setPorridge(e.target.value as string)}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item className="preview-select">
              <p>juoma</p>
              <FoodDropDown
                id="drink"
                value={drink}
                options={["maito", "kauramaito"]}
                onChange={(e) => setDrink(e.target.value as string)}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item className="preview-select">
              <p>hedelmä/marja</p>
              <FoodDropDown
                id="fruit"
                value={fruit}
                options={["mustikka", "banaani"]}
                onChange={(e) => setFruit(e.target.value as string)}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item className="preview-select">
              <p>leipä</p>
              <FoodDropDown
                id="bread"
                value={bread}
                options={["ruisleipä", "kauraleipä"]}
                onChange={(e) => setBread(e.target.value as string)}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item className="preview-select">
              <p>hapanmaitotuotteet</p>
              <FoodDropDown
                id="cultured-dairy"
                value={culturedDairy}
                options={["rahka", "piimä"]}
                onChange={(e) => setCulturedDairy(e.target.value as string)}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item className="preview-select">
              <p>vihannes</p>
              <FoodDropDown
                id="vegetable"
                value={vegetable}
                options={["porkkana", "kurkku"]}
                onChange={(e) => setVegetable(e.target.value as string)}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
