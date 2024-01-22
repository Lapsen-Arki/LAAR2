const activityReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_ACTIVITY':
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
  
  export const createActivity = (content) => {
    return {
      type: 'NEW_ACTIVITY',
      payload: {
        content,
        favorite: false
      }
    }
  }
  
  export default activityReducer