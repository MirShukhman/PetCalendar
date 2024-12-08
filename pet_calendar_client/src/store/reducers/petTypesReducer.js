const initialState = [];

const petTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PET_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default petTypesReducer;