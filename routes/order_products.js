const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { getOrdersByUser } = require('../db/orders');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder, updateOrderProduct, destroyOrderProduct, getOrderProductById } = require('../db/order_products');

const { getUserById, getUser } = require('../db/users')

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

orderProductsRouter.patch('/order_products/:orderProductId', async (req, res, next) => {
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
          console.log("user in orderProducts patch", user);
          const userOrder = await getCartByUser({id});
          console.log("userOrder in OP patch", userOrder);
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

orderProductsRouter.delete('/order_products/:orderProductId', async (req, res, next) => {
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
          console.log("user in orderProducts delete", user);
          const userOrder = await getCartByUser({id});
          console.log("userOrder in OP delete", userOrder);
          const orderProduct = await getOrderProductById(orderProductId);
          if (orderProduct.orderId===userOrder.id) {
          const deletedOrderProduct = await destroyOrderProduct(id)
          console.log(deletedOrderProduct)
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