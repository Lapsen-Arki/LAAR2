import "./timeBlocking.css";
import { useState, useEffect } from "react";
import { tapahtumat } from "../services/helper";

/*
Don't know what any of this does, but made temporary typings
to solve build errors. Please fix later.
Don't ask me about the type, Chatgpt made it up.
- Esa
*/

type Event = {
  [key: string]:
    | {
        [innerKey: string]: string;
        klo: string;
      }
    | undefined;
};
const TimeBlock = () => {
  const [events, setEvents] = useState<Event[]>([]);

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
              {/* Changed to match typings
              - Esa */}
              {event[key] &&
                Object.entries(event[key]!).map(([subKey, subValue]) => (
                  <div key={subKey}>{subValue}</div>
                ))}
              {/* {Object.entries(event[key]).map(([subKey, subValue]) => (
                <div key={subKey}>
                  {subValue}
                </div>
              ))} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimeBlock;
