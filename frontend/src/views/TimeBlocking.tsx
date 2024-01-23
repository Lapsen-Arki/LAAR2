import './timeBlocking.css';
import { useState, useEffect } from 'react';
import { tapahtumat, perhe } from '../services/helper';
import { store } from '../main';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Paper,
  styled
} from '@mui/material';

const TimeBlock = () => {
  const [events, setEvents] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [openChild, setOpenChild] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		textAlign: 'left',
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
	}));

  const handleChangeChild = (event) => {
    setSelectedChild(event.target.value);
  };

  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleOpenChild = () => {
    setOpenChild(true);
  };

  console.log('Nyt tultiin TimeBlocking-sivulle')
  console.log('Tämä! Children', children);
  console.log('Tämä!', store.getState());
  console.log('Tämä!', store.getState().activities);
  console.log('Tämä!', store.getState().meals);

  useEffect(() => {
      setEvents(tapahtumat);
      setChildren(perhe.lapset);
    }, []); 

  return (
    <div class="timeBlocking">
      <div class="select">
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="select-child">Lapsi!</InputLabel>
        <Select
          labelId="select-child"
          id="child-open-select"
          open={openChild}
          onClose={handleCloseChild}
          onOpen={handleOpenChild}
          value={selectedChild}
          label="Child"
          onChange={handleChangeChild}
        >
          <MenuItem value=""> Valitse </MenuItem>
          {Object.keys(children).map((childKey) => (
          <MenuItem key={childKey} value={childKey}>
            {childKey}
          </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {events.map((event, index) => (
            Object.keys(event).map((key) => (
            <Grid item xs={12} md={4} key={key}>
              {Object.entries(event[key]).map(([subKey, subValue]) => (
                <Item key={subKey}>{subValue}</Item>
              ))}
            </Grid>
            ))
          ))}
        </Grid>
      </Box>     
    </div>
  );
};

export default TimeBlock;