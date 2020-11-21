// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
     try {
       client.query(`
       DROP TABLE IF EXISTS activities;
       `)
     } catch (error) {
       
     }
    // drop tables in correct order

    // build tables in correct order

    try {
      client.query(`
      
      CREATE TABLE activities(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );`)
    } catch (error) {
      
    }
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    client.connect();
    // await dropTables();
    // await createTables();
    // await createInitialUsers();
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());