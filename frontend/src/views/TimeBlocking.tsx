import './timeBlocking.css';
import { useState, useEffect } from 'react';
import { tapahtumat } from '../services/helper';

const TimeBlock = () => {
const [events, setEvents] = useState([]);

useEffect(() => {
    setEvents(tapahtumat);
  }, []); 

  return (
    <div>
      <h2>Timeline</h2>
      {events.map((event, index) => (
        <div key={index} className="input-group timeBlocking">
          {Object.keys(event).map((key) => (
            <div key={key}>
              {Object.entries(event[key]).map(([subKey, subValue]) => (
                <div key={subKey}>
                  {subValue}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimeBlock;