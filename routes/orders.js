const express = require('express')
const ordersRouter = express.Router()

const { getUserById } = require('../db/users')

const { getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder} = require('../db/orders')

const { client } = require('../db')

ordersRouter.get('/', async (req, res, next)=>{
try {
    const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const user = await getUserById(id)
            console.log(user)
            if (user.isAdmin===true){
                const orders = await getAllOrders()
                return orders
            } else {
                return {message:'Error: you must be an admin to view all orders'}
            }
          }
        }
    }
} catch (error) {
    console.error(error)
}
})

ordersRouter.get('/cart', async (req, res, next)=>{
    try {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const user = await getUserById(id)
            console.log(user)
            if (user){
                const orders = await getCartByUser()
                return orders
            } else {
                return {message:'You must be logged in to view your cart'}
            }
          }
        }
    }
    } catch (error) {
        console.error(error)
    }
})

module.exports = ordersRouter