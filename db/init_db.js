const { client } = require('./index');
const { createOrder } = require('./orders');

const { createUser } = require('./users');

const { createProduct } = require('./products');

async function buildTables() {
  try {
    client.connect();
    
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log('Finished dropping tables!');

    console.log('Starting to build tables...');
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      "imageURL" TEXT DEFAULT 'https://i.imgur.com/6CsuY8X.png',
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category TEXT NOT NULL
    );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" TEXT DEFAULT 'https://i.imgur.com/6CsuY8X.png',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" DATE 
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price INTEGER NOT NULL ,
        quantity INTEGER NOT NULL DEFAULT 0
      );
    `);
    console.log('Finished creating tables!');
  } catch (error) {
    console.error('Error while dropping tables!');
    throw error;
  }
}

async function populateInitialData() {
  try {
    const initialSoaps = [
      {
      name: "Riley's Favorite Soap",
      description: "A very lovely soap. Riley recommends it for all soaping purposes.",
      price:"799",
      imageURL:"placeholder.com",
      inStock: false,
      category: 'Natural'
      },
      {
        name: "Tammy's Favorite Soap",
        description: "A lovely scented soap!",
        price:"1299",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Natural'
      },
      {
        name: "Pizza Soap",
        description: "Contains authentic New York pizza grease.",
        price: "1999",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Fun'
      },
      {
        name: "Poop Soap",
        description: "You can have our poopy.",
        price: "1599",
        imageURL: "placeholder.com",
        inStock: false,
        category: 'Fun'
      },
      {
        name: "Gold Soap",
        description: "Yes it's real gold.",
        price: "14999",
        imageURL: "placeholder.com",
        inStock: true,
        category: 'Decorative'

      },
      {
        name: "Ocean Breeze",
        description: "Made with salt water and embedded with real sea shells.",
        price: "4999",
        imageURL: "placeholder.com",
        inStock: true,
        category: 'Decorative'
      },
    ]
    console.log('Creating Products')
    await Promise.all(initialSoaps.map(createProduct))
    console.log('Finished creating Products')
    
    const initialUsers = [
      {
        firstName: 'The',
        lastName: 'Boss',
        email: 'theboss@example.com',
        imageURL: '',
        username: 'theboss',
        password: 'theboss',
        isAdmin: true
      },
      {
        firstName: 'Lucky',
        lastName: 'Ducky',
        email: 'luckyducky@example.com',
        imageURL: '',
        username: 'luckyducky',
        password: 'luckyducky',
        isAdmin: false
      },
      {
        firstName: 'Green',
        lastName: 'Giant',
        email: 'greengiant@example.com',
        imageURL: '',
        username: 'greengiant',
        password: 'greengiant',
        isAdmin: false
      },
      {
        firstName: 'Sally',
        lastName: 'Fields',
        email: 'sallyfields@example.com',
        imageURL: '',
        username: 'sally',
        password: 'sally',
        isAdmin: true
      }
    ]
    console.log('Creating Users')
    await Promise.all(initialUsers.map(createUser))
    console.log('Finished creating Users')

const initialOrders = [
  {
    status: 'created',
    userId: 1
  },
  {
    status: 'created',
    userId: 2
  },
  {
    status: 'cancelled',
    userId: 3
},
{
  status: 'cancelled',
  userId: 1
},
{
  status: 'completed',
  userId: 4
},
{
  status: 'completed',
  userId: 2
}
]

console.log('Creating Orders')
await Promise.all(initialOrders.map(createOrder))
console.log('Finished creating Orders')

}catch(error){
  console.error(error)
}finally{
  console.log('Finished seeding tables')
}
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
