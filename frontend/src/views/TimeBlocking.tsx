import './timeBlocking.css';
import { useState, useEffect } from 'react';
import { tapahtumat, perhe } from '../services/helper';
import { store } from '../main';
import {
  formattedTime,
  weekdayDayMonthAsString
} from '../components/dateTimeUtils';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const TimeBlock = () => {
  const [events, setEvents] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [openChild, setOpenChild] = useState(false);

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
      setNotes(muistiinpanot);
    }, []); 

  return (
    <div>
      <h2>{weekdayDayMonthAsString}</h2>
      <div>
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
      {events.map((event, index) => {
        const eventEndTime = Object.keys(event)[0];
        if (eventEndTime > formattedTime) {
          return (
            <div key={index} className="input-group timeBlocking">
              {Object.keys(event).map((key) => (
                <div key={key}>
                  {Object.entries(event[key]).map(([subKey, subValue]) => (
                    <div key={subKey}>{subValue}</div>
                  ))}
                </div>
              ))}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};


export default TimeBlock;

/*
import { createMeal } from '../reducers/mealReducer'
import { useSelector, useDispatch } from 'react-redux'

const MealBlock = () => {
  const dispatch = useDispatch()
  const meals = useSelector(state => state)

  const addMeal = (event) => {
    event.preventDefault()
    const content = event.target.meal.value
    event.target.meal.value = ''
    dispatch(createMeal(content))
  }

  return (
    <div>
      <form onSubmit={addMeal}>
        <input name="meal" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {meals.map(meal =>
          <li
            key={meal.id} 
            onClick={() => toggleImportance(meal.id)}
          >
            {meal.content} <strong>{meal.favorite ? 'favorite' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MealBlock*/