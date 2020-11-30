const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder, destroyOrderProduct } = require('../db/order_products');



orderProductsRouter.patch('/order_products/:orderProductId', async (req, res, next) => {
  try {
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          const updatedOrderProduct = await updateOrderProduct({id, price, quantity})
          console.log(updatedOrderProduct)
          res.send(updatedOrderProduct)
        } else {
          res.send({message:'You must be logged in to update an order'})
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