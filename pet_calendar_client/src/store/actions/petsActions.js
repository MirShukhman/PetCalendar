import { db } from "../../db/migrations";
import { restorePetData } from "../../api/endPoints";
import { setPets } from "../reducers/petsReducer";

/*
  The actions are the instructions that would tell the reducers what to do.

  as an example, fetchPets() is an action that would:
    1. get the pets list from the database and hold it in a local array
    2. call the reducer using dispatch(); and send the action { type: 'SET_PETS', payload: petsArray }
    this would make the reducer update the state to the new array

    other actions would work in a similiar general manner
*/

export function fetchPets() {
    return (dispatch) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM pets;', 
          [], 
          (tx, results) => {
            let petsArray = [];
            for (let i = 0; i < results.rows.length; i++) {
              petsArray.push(results.rows.item(i));
            }
            console.log('Fetched pets:', petsArray);
            dispatch({ type: 'SET_PETS', payload: petsArray });
          },
          (error) => {
            console.error('Error fetching pets:', error);
          }
        );
      });
    };
  }

export function fetchPetsIfNotLoaded(){
  return (dispatch, getState) => {
    const { pets } = getState();
    if(!pets || pets.length == 0){
      dispatch(fetchPets());
    }
  }
}

export function addPet(newPet){
    return (dispatch) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO pets (type, name, age, color, demeanor) VALUES (?, ?, ?, ?, ?);',
                [newPet.type, newPet.name, newPet.age, newPet.color, newPet.demeanor],
                () => {
                    console.log(`Pet ${newPet.name} added successfully.`);
                    dispatch(fetchPets());
                },
                (error) => {
                    console.error('Error adding pet:', error);
                }
            );
        });
    };
}

export function deletePet(petID) {
    return (dispatch) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM pets WHERE id = ?;', 
          [petID], 
          () => {
            console.log(`Pet with ID ${petID} deleted successfully.`);
            dispatch(fetchPets()); 
          },
          (error) => {
            console.error('Error deleting pet:', error);
          }
        );
      });
    };
}

export function fetchPetsFromServer() {
  return async (dispatch) => {
    const result = await restorePetData();
    if(result.pet_data){
      dispatch(setPets(result.pet_data));
    }
    else{
      console.error('Failed to fetch pet data ', error);
    }
  };
};