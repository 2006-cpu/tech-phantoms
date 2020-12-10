const { client } = require('./index');
const { createOrder, getOrdersByProduct } = require('./orders');

const { createUser } = require('./users');

const { createProduct } = require('./products');

const { addProductToOrder } = require('./order_products');

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
      "imageURL" TEXT DEFAULT 'https://i.imgur.com/6CsuY8X.png' NOT NULL,
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category TEXT NOT NULL
    );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" TEXT DEFAULT 'https://i.imgur.com/6CsuY8X.png' NOT NULL,
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
      inStock: false,
      category: 'Natural',
      imageURL: 'https://i.imgur.com/itPR9Lpb.jpg'
      },
      {
        name: "Eileen's Favorite Soap",
        description: "A berryliscious aroma!",
        price:"1499",
        inStock: true,
        category: 'Decorative',
        imageURL: 'https://i.imgur.com/96LPzPu.jpg'
      },
      {
        name: "Eric's Favorite Soap",
        description: "Delicious to see, but not to eat!",
        price:"599",
        inStock: true,
        category: 'Fun',
        imageURL: 'https://i.imgur.com/WXdBRA2.jpg'
      },
      {
        name: "Tammy's Favorite Soap",
        description: "Who doesn't love popcorn?!?",
        price:"1299",
        inStock: true,
        category: 'Fun',
        imageURL: 'https://i.imgur.com/3hFPp99.jpg'
      },
      {
        name: "Citrus Soap",
        description: "Handmade with natural ingredients",
        price:"2499",
        inStock: true,
        category: 'Natural',
        imageURL: 'https://image.freepik.com/free-photo/handmade-soap_144627-15104.jpg'
      },
      {
        name: "Cinnamon Soap",
        description: "It smells yummy!",
        price:"1399",
        inStock: true,
        category: 'Natural',
        imageURL: 'https://img.freepik.com/free-photo/handmade-soap_144627-15099.jpg?size=626&ext=jpg&uid=P22432927&ga=GA1.2.514530135.1598543628'
      },{
        name: "Lavender Soap",
        description: "Breathe deeply and relax!",
        price:"1199",
        inStock: true,
        category: 'Decorative',
        imageURL: 'https://img.freepik.com/free-photo/female-hands-with-lavender-soap_160139-776.jpg?size=626&ext=jpg&uid=P22432927&ga=GA1.2.514530135.1598543628'
      },{
        name: "Peppermint Soap",
        description: "Recommended by Peppermint Patty!",
        price:"1299",
        inStock: true,
        category: 'Decorative',
        imageURL: 'https://i.imgur.com/T1n0aRl.jpg'
      },
      {
        name: "Pizza Soap",
        description: "Contains authentic New York pizza grease.",
        price: "1999",
        inStock: true,
        category: 'Fun',
        imageURL: 'https://i.imgur.com/cpuj9Q8.jpg'
      },
      {
        name: "Girly-Girl Pink Soap",
        description: "Makes you feel all bubbly inside!",
        price: "1499",
        inStock: false,
        category: 'Decorative',
        imageURL: 'https://i.imgur.com/em7aojo.jpg'
      },
      {
        name: "Gold Soap",
        description: "Yes, it has real gold in it.",
        price: "14999",
        inStock: true,
        category: 'Fun',
        imageURL: 'https://img.freepik.com/free-photo/high-angle-home-made-soap_23-2148290930.jpg?size=626&ext=jpg&uid=P22432927&ga=GA1.2.514530135.1598543628'

      },
      {
        name: "Ocean Breeze",
        description: "Made with salt water and embedded with real sea shells.",
        price: "4999",
        inStock: true,
        category: 'Natural',
        imageURL: 'https://img.freepik.com/free-photo/sponge-seashell-soap-brush-towel-moisturizing-cream-wooden-surface_23-2147926826.jpg?size=338&ext=jpg&uid=P22432927&ga=GA1.2.514530135.1598543628'
      },
    ]
    console.log('Creating Products')
    await Promise.all(initialSoaps.map(createProduct))
    console.log('Finished creating Products')
    
    const initialUsers = [
      {
        imageURL: 'https://i.imgur.com/xspvkpr.png',
        firstName: 'The',
        lastName: 'Boss',
        email: 'theboss@example.com',
        username: 'theboss',
        password: 'theboss',
        isAdmin: true
      },
      {
        imageURL: 'https://i.imgur.com/SJJh5xq.png',
        firstName: 'Lucky',
        lastName: 'Ducky',
        email: 'luckyducky@example.com',
        username: 'luckyducky',
        password: 'luckyducky',
        isAdmin: false
      },
      {
        imageURL: 'https://i.imgur.com/ybGB0aC.png',
        firstName: 'Green',
        lastName: 'Giant',
        email: 'greengiant@example.com',
        username: 'greengiant',
        password: 'greengiant',
        isAdmin: false
      },
      {
        imageURL: 'https://i.imgur.com/vxcPhEF.png',
        firstName: 'Sally',
        lastName: 'Fields',
        email: 'sallyfields@example.com',
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

const initialOrderProducts = [
  {
    productId: 1,
    orderId: 1,
    price: "799",
    quantity: 1
  },
  {
    productId: 2,
    orderId: 1,
    price: "1299",
    quantity: 1
  },
  {
    productId: 2,
    orderId: 2,
    price: "1299",
    quantity: 2
  },
  {
    productId: 3,
    orderId: 3,
    price: "1999",
    quantity: 3
  },
  {
    productId: 4,
    orderId: 4,
    price: "1599",
    quantity: 1
  },
  {
    productId: 5,
    orderId: 5,
    price: "14999",
    quantity: 2
  },
  {
    productId: 6,
    orderId: 6,
    price: "4999",
    quantity: 4
  }
]

console.log('Creating orderProducts')
await Promise.all(initialOrderProducts.map(addProductToOrder))
console.log('Finished creating ordersProducts')

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
