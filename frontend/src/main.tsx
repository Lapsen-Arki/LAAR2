import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import App from "./App.tsx";
import { ateriat, aktiviteetit } from './services/helper'

import activityReducer from './reducers/activityReducer'
import mealReducer from './reducers/mealReducer'

const rootReducer = combineReducers({
  activities: activityReducer,
  meals: mealReducer,
});

const store = createStore(
  rootReducer,
  {
    activities: aktiviteetit,
    meals: ateriat,
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

export { store };
