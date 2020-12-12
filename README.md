# DOPE SOAP

An e-commerce site for users to find a variety of fun soap products.

## Getting Started

    npm i
    createdb *productName*

Run `npm run server:dev` to start the web server.
In a second terminal navigate back to the local repo and run `npm run client:dev` to start the react server.
Run `db:build` which rebuilds the database, all the tables, and ensures that there is meaningful data present.

##Deployed URL
[example.com - hosted on heroku](https://warm-savannah-72362.herokuapp.com/allOrders)

## Environment Variables

    DB_URL=<your-database-connection-string>
    JWT_SECRET=some-very-secret-key
    SOME_ENV_VAR=something-else-cool

## Tech Stack
### Backend: Node.js, Express.js, PostgreSQL
It all starts in the root `index.js` file.  This is the express server.  The routing middleware is handled in this file as well.

### Frontend: React.js, Stripe, Material-UI
The root React code starts in the `src/index.js` file.

## Project Structure

```bash
├── db
│   ├── index.js
│   └── init_db.js    
│   └── order_products.js
│   └── orders.js
│   └── products.js
│   └── users.js
├── public
│   └── index.html
├── routes
│   └── index.js
│   └── order_products.js
│   └── orders.js
│   └── products.js
│   └── users.js
│   └── utils.js
└── src
│    ├── api
│    │   └── index.js
│    ├── auth
│    │   └── index.js
│    ├── components
│    │   ├── images
│    │   │   ├── bubble02.png
│    │   │   ├── Dope Soap.png
│    │   │   ├── dopeSoap.jpg
│    │   ├── AdminTools.css
│    │   ├── AdminTools.js
│    │   ├── AllOrders.css
│    │   ├── AllOrders.js
│    │   ├── AllProducts.css
│    │   ├── AllProducts.js
│    │   ├── AllUsers.css
│    │   ├── AllUsers.js
│    │   ├── App.css
│    │   ├── App.js
│    │   ├── Cart.css
│    │   ├── Cart.js
│    │   ├── CreateProduct.css
│    │   ├── CreateProduct.js
│    │   ├── Footer.css
│    │   ├── Footer.js
│    │   ├── helpers.js
│    │   ├── index.js
│    │   ├── Login.css
│    │   ├── Login.js
│    │   ├── Nav.css
│    │   ├── Nav.js
│    │   ├── Order.css
│    │   ├── Order.js
│    │   ├── Product.css
│    │   ├── Product.js
│    │   ├── Register.css
│    │   ├── Register.js
│    │   ├── SingleOrder.css
│    │   ├── SingleOrder.js
│    │   ├── SingleProduct.css
│    │   ├── singleProduct.js
│    │   ├── SingleUser.css
│    │   ├── SingleUser.js
│    │   ├── Stripe.css
│    │   ├── Stripe.js
│    │   ├── UserAccount.css
│    │   ├── UserAccount.js
│    │   └── index.js
│    └── index.js
├── index.js
├── package.json
```

Top level `index.js` is our Express Server. This is responsible for setting up our API, starting our server, and connecting to our database.

Inside `/db` we have `index.js` which is responsible for creating all of our database connection functions.

Inside `/routes` we have `index.js` which is responsible for building the `apiRouter`, which is attached in the express server. This will build all routes that our React application will use to send/receive data via JSON.

Lastly `/public` and `/src` are the two puzzle pieces for our React front-end. `/public` contains any static files necessary for our front-end, and `/src` is our React source code.

## Contributors
Tammy Allen, Eric Ochoa, Eileen Ratcliff, and Riley Smith.  You can see all of their gitHub profiles here:
[Tammy](https://github.com/tjgallen), 
[Eric](https://github.com/techniguy), 
[Eileen](https://github.com/Eileenhr), 
[Riley](https://github.com/rileyshizzle), 






