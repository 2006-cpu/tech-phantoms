require("dotenv").config();
// This is the Web Server
const express = require('express');
const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

//CORS for cross-origin requests
const cors = require('cors')
server.use(cors())

// handle application/json requests
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./routes'));



/*


const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HtIhYCIi2I46Z153j8nh2ilkrNzv55CM2ixN4H3C6mvtexMbqnJ8Dun4wUiHngsBUCBokj0kgN2U03gB8SoIsyW00QEx6qiP3");

server.use(express.static("."));
server.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});



*/


// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const { client } = require('./db');

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});