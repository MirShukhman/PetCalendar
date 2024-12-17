import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./reducers/petsReducer";
import petTypesReducer from "./reducers/petTypesReducer";

/*
  This is the redux store, this is the main reducer, it defines that different parts of the state, eg:
    - pets
    - petTypes
  each of those refer to a reducer of the specific type.
  
  more info in ./reducers/petsReducer
*/
const store = configureStore({
    reducer: {
      pets: petsReducer,
      petTypes: petTypesReducer
    }
  });

export default store;
