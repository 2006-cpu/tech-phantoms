const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder, destroyOrderProduct } = require('../db/order_products');

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

orderProductsRouter.delete('/order_products/:orderProductId', async (req, res, next) => {
  try {
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          const deletedOrderProduct = await destroyOrderProduct(id)
          console.log(deletedOrderProduct)
          res.send(deletedOrderProduct)
        } else {
          res.send({message:'You must be the owner of this order to delete it'})
          }
      }
  }
  } catch (error) {
      console.log(error);
      next(error);
  }
});

module.exports = orderProductsRouter