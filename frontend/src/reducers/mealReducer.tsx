const mealReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_MEAL':
      return {
        ...state,
        [action.payload.content.id]: {
          ...action.payload.content,
          favorite: false,
        },
      };
    default:
      return state;
  }
};
  
  export const createMeal = (content) => {
    return {
      type: 'NEW_MEAL',
      payload: {
        content,
        favorite: false
      }
    }
  }
  
  export default mealReducer