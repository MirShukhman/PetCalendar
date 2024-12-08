import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./reducers/petsReducer";
import petTypesReducer from "./reducers/petTypesReducer";
const store = configureStore({
    reducer: {
      pets: petsReducer,
      petTypes: petTypesReducer
    }
  });

export default store;
