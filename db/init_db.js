const {
  client
} = require('./index');

const { 
  createProduct 
} = require('./products');

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
      price DECIMAL(10,2) NOT NULL,
      "imageUrl" TEXT NULL,
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category TEXT NOT NULL
    );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageUrl" TEXT NULL,
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
        price DECIMAL(10,2) NOT NULL ,
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
      price:"7.99",
      imageURL:"placeholder.com",
      inStock: false,
      category: 'Natural'
      },
      {
        name: "Tammy's Favorite Soap",
        description: "A lovely scented soap!",
        price:"12.99",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Natural'
      },
      {
        name: "Pizza Soap",
        description: "Contains authentic New York pizza grease.",
        price: "19.99",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Fun'
      },
      {
        name: "Poop Soap",
        description: "You can have our poopy.",
        price: "15.99",
        imageURL: "placeholder.com",
        inStock: false,
        category: 'Fun'
      },
      {
        name: "Gold Soap",
        description: "Yes it's real gold.",
        price: "149.99",
        imageURL: "placeholder.com",
        inStock: true,
        category: 'Decorative'

      },
      {
        name: "Ocean Breeze",
        description: "Made with salt water and embedded with real sea shells.",
        price: "49.99",
        imageUrl: "placeholder.com",
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
