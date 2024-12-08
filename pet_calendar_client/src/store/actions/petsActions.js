import { db } from "../../db/migrations";

export function fetchPets() {
    return (dispatch) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM pets;', 
          [], 
          (tx, results) => {
            let petsArray = [];
            for (let i = 0; i < results.rows.length; i++) {
              petsArray.push(results.rows.item(i)); // Corrected to results.rows.item(i)
            }
            console.log('Fetched pets:', petsArray); // Log the fetched pets for debugging
            dispatch({ type: 'SET_PETS', payload: petsArray });
          },
          (error) => {
            console.error('Error fetching pets:', error); // Log any query errors
          }
        );
      });
    };
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