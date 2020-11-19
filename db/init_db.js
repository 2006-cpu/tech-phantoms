// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const initialSoaps = [
      {
      name: "Riley's Favorite Soap",
      description: "A very lovely soap. Riley recommends it for all soaping purposes.",
      price:"$7.99",
      imageURL:"placeholder.com",
      inStock: false,
      category: 'Natural'
      },
      {
        name: "Tammy's Favorite Soap",
        description: "A lovely scented soap!",
        price:"$12.99",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Natural'
      },
      {
        name: "Pizza Soap",
        description: "Contains authentic New York pizza grease.",
        price: "$19.99",
        imageURL:"placeholder.com",
        inStock: true,
        category: 'Fun'
      },
      {
        name: "Poop Soap",
        description: "You can have our poopy.",
        price: "$15.99",
        imageURL: "placeholder.com",
        inStock: false,
        category: 'Fun'
      },
      {
        name: "Gold Soap",
        description: "Yes it's real gold.",
        price: "$149.99",
        imageURL: "placeholder.com",
        inStock: true,
        category: 'Decorative'

      },
      {
        name: "Ocean Breeze",
        description: "Made with salt water and embedded with real sea shells.",
        price: "$49.99",
        imageUrl: "placeholder.com",
        inStock: true,
        category: 'Decorative'

      }
    ]
  } catch (error) {
    throw error;
  }
}

id SERIAL PRIMARY KEY,
              name NOT NULL,
              description NOT NULL,
              price NOT NULL,
              imageURL default,
              inStock NOT NULL default false,
              category NOT NULL

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());