import './timeBlocking.css';
import { useState, useEffect } from 'react';
import { tapahtumat } from '../services/helper';
import { store } from '../main';

const TimeBlock = () => {
  const [events, setEvents] = useState([]);

  console.log('Nyt tultiin TimeBlocking-sivulle')
  console.log('Tämä!', store.getState());
  console.log('Tämä!', store.getState().activities);
  console.log('Tämä!', store.getState().meals);

  useEffect(() => {
      setEvents(tapahtumat);
    }, []); 

  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return (
    <div>
      <h2>Timeline</h2>
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