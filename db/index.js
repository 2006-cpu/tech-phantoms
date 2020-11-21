// // Connect to DB (🔸ORIGINAL db/index.js)
// const { Client } = require('pg');
// const DB_NAME = 'localhost:5432/tech-phantoms'
// const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
// const client = new Client(DB_URL);

// // database methods

// // export
// module.exports = {
//   client,
//   // db methods
// }


// Connect to DB (🔸UPDATED db/index.js - change in DB_NAME & DB_URL via help from Red)

const { Client } = require('pg');
const DB_NAME = 'tech-phantoms'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// export
module.exports = {
  client
  // db methods
}
