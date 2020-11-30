const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder } = require('../db/order_products');

orderProductsRouter.post('/orders/:orderId/products', async (req, res, next) => {
    try {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const newOrderProduct = await addProductToOrder({productId, orderId, price, quantity})
            console.log(newOrderProduct)
            res.send(newOrderProduct)
          } else {
            res.send({message:'You must be logged in to create an order'})
            }
        }
    }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = orderProductsRouter