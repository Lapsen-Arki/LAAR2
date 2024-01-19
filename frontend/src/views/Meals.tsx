import { useState, useEffect } from 'react';
import './Meals.css';
import { aamupala, perhe } from '../services/helper';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const Meals = () => {
  const [child, setChild] = useState('');
  const [bread, setBread] = useState(''); 
  const [drink, setDrink] = useState(''); 
  const [fruit, setFruit] = useState(''); 
  const [openBread, setOpenBread] = useState(false);
  const [openDrink, setOpenDrink] = useState(false);
  const [openFruit, setOpenFruit] = useState(false);
  const [openChild, setOpenChild] = useState(false);

  const handleChangeChild = (event) => {
    setChild(event.target.value);
  };

  const handleChangeBread = (event) => {
    setBread(event.target.value);
  };

  const handleChangeDrink = (event) => {
    setDrink(event.target.value);
  };

  const handleChangeFruit = (event) => {
    setFruit(event.target.value);
  };

  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleOpenChild = () => {
    setOpenChild(true);
  };
  
  const handleCloseBread = () => {
    setOpenBread(false);
  };

  const handleOpenBread = () => {
    setOpenBread(true);
  };

  const handleCloseDrink = () => {
    setOpenDrink(false);
  };

  const handleOpenDrink = () => {
    setOpenDrink(true);
  };

  const handleCloseFruit = () => {
    setOpenFruit(false);
  };

  const handleOpenFruit = () => {
    setOpenFruit(true);
  };

  useEffect(() => {
    setChild(perhe.lapset)
    setBread(aamupala.leipa);
    setDrink(aamupala.juoma);
    setFruit(aamupala.hedelmat_marjat);
  }, []); 

  return (
    <div class="meals-container">
      <div>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="child-open-select-label">Lapsi</InputLabel>
        <Select
        labelId="child-open-select-label"
        id="child-open-select"
        open={openChild}
        onClose={handleCloseChild}
        onOpen={handleOpenChild}
        value={child}
        label="Child"
        onChange={handleChangeChild}
      >
        <MenuItem value=""> </MenuItem>
        {Object.keys(child).map((lapsiKey) => (
          <MenuItem key={lapsiKey} value={lapsiKey}>
            {lapsiKey}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      </div>

      <h3>Luo ateria</h3>

      <div className="input-group meals">
        <h4>Leipä:</h4>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="bread-controlled-open-select-label">Leipä</InputLabel>
          <Select
          labelId="bread-controlled-open-select-label"
          id="bread-controlled-open-select"
          open={openBread}
          onClose={handleCloseBread}
          onOpen={handleOpenBread}
          value={bread}
          label="Bread"
          onChange={handleChangeBread}
        >
          <MenuItem value=""> </MenuItem>
          {Object.keys(bread).map((leipaKey) => (
            <MenuItem key={leipaKey} value={leipaKey}>
              {leipaKey}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      </div>

      <div className="input-group meals">
        <h4>Juoma:</h4>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="drinks-controlled-open-select-label">Juoma</InputLabel>
          <Select
          labelId="drinks-controlled-open-select-label"
          id="drinks-controlled-open-select"
          open={openDrink}
          onClose={handleCloseDrink}
          onOpen={handleOpenDrink}
          value={drink}
          label="Drink"
          onChange={handleChangeDrink}
        >
          <MenuItem value=""> </MenuItem>
          {Object.keys(drink).map((juomaKey) => (
            <MenuItem key={juomaKey} value={juomaKey}>
              {juomaKey}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      </div>

      <div className="input-group meals">
        <h4>Hedelmä / marjat:</h4>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="fruits-controlled-open-select-label">Hevi</InputLabel>
          <Select
          labelId="fruits-controlled-open-select-label"
          id="fruits-controlled-open-select"
          open={openFruit}
          onClose={handleCloseFruit}
          onOpen={handleOpenFruit}
          value={fruit}
          label="Fruit"
          onChange={handleChangeFruit}
        >
          <MenuItem value=""> </MenuItem>
          {Object.keys(fruit).map((heviKey) => (
            <MenuItem key={heviKey} value={heviKey}>
              {heviKey}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      </div>

    </div>
  );
};

export default Meals;
