const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { getOrdersByUser } = require('../db/orders');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder, updateOrderProduct, destroyOrderProduct, getOrderProductById } = require('../db/order_products');

const { getUserById, getUser } = require('../db/users')

orderProductsRouter.patch('/:orderProductId', async (req, res, next) => {
  try {
    const {orderProductId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          const user = await getUserById(id);
          const userOrder = await getCartByUser({id});
          const orderProduct = await getOrderProductById(orderProductId);
          if (orderProduct.orderId===userOrder.id) {
          
          const updatedOrderProduct = await updateOrderProduct({id, price, quantity})
          console.log("updatedOrderProduct in patch", updatedOrderProduct)
          res.send(updatedOrderProduct)}
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

orderProductsRouter.delete('/:orderProductId', async (req, res, next) => {
  try {
    const {orderProductId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {

          const user = await getUserById(id);
          const userOrder = await getCartByUser({id});
          const orderProduct = await getOrderProductById(orderProductId);
          if (orderProduct.orderId===userOrder.id) {
          const deletedOrderProduct = await destroyOrderProduct(id)
          res.send(deletedOrderProduct)}
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