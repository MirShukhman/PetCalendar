import { db } from "../../db/migrations";

export const fetchPetTypes = () => {
  return (dispatch) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pet_types;',
        [],
        (tx, results) => {
          const petTypes = [];
          for (let i = 0; i < results.rows.length; i++) {
            petTypes.push(results.rows.item(i));
          }
          dispatch({ type: 'SET_PET_TYPES', payload: petTypes });
        },
        (error) => {
          console.error('Error fetching pet types:', error);
        }
      );
    });
  };
};