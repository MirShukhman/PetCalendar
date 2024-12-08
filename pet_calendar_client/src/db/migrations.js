import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Protocol when changing tabel schema:
/*
    1. Increment DB_Version
    2. Add condition for the new version (you can change the condition, but then you will have a missed version, if a table is dropped its ok, but if not then its a problem)
    3. After changing the table - the migration should work, remember to update ALL of the components that are writing to the table
       Those components can be found in the redux store - mainly in /actions/ folder
*/


const DB_Version = 4; // increment me
const db = SQLite.openDatabase({name: 'petsCalendarDB.db', location:'default' });

async function runMigrations() {
  const storedVersion = parseInt(await AsyncStorage.getItem('DB_VERSION'), 10) || 0;
  console.log('Stored version: ', storedVersion);
  db.transaction(tx => {
    if (storedVersion < 1) {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS pets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT,
          name TEXT,
          age INTEGER
        );
      `);
    }

    // here a temp table is created, the old data is copied, the old table is dropped and the temp table is renamed.
    // note that this only works if you SAVE all of the previous versions, because the copy CANNOT happen between version 1 and 3 in this case, only between
    // version 2 and 3 (and 2 is not present here)
    if (storedVersion < 3) {
      tx.executeSql(`
        CREATE TABLE pets_temp (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT,
          name TEXT,
          age INTEGER,
          color TEXT,
          demeanor TEXT
        );
      `);

      tx.executeSql(`
        INSERT INTO pets_temp (id, type, name, age, color)
        SELECT id, type, name, age, color, '' AS demeanor
        FROM pets;
      `);

      tx.executeSql(`DROP TABLE pets;`);

      tx.executeSql(`ALTER TABLE pets_temp RENAME TO pets;`);
    }


    if(storedVersion < 4){
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS pet_types (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT UNIQUE
            );
          `);
        
          const initialPetTypes = ['Dog', 'Cat', 'Bird', 'Fish'];
          initialPetTypes.forEach(type => {
            tx.executeSql(`INSERT OR IGNORE INTO pet_types (name) VALUES (?);`, [type]);
          });
    }
  }, 
  error => console.log('Migration error:', error),
  async () => {
    await AsyncStorage.setItem('DB_VERSION', DB_Version.toString());
    console.log('Migrations completed');
  });
}

export { db, runMigrations };