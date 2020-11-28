const express = require('express')
const ordersRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { getUserById } = require('../db/users')

const { getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder} = require('../db/orders')

ordersRouter.get('/', async (req, res, next)=>{
try {
    const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        console.log('Request', req.headers)
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            
            if (req.user.isAdmin===true){
                const orders = await getAllOrders()
                res.send(orders)
            } else {
                res.send({message:'Error: you must be an admin to view all orders'})
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
                const orders = await getCartByUser({id})
                res.send( orders )
            } else {
                res.send({message:'You must be logged in to view your cart'})
            }
          }
        }
    }
    } catch (error) {
        console.error(error)
    }
})

ordersRouter.post('/', async (req,res,next)=>{
    try {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const newOrder = await createOrder({userId: id})
            console.log(newOrder)
            res.send(newOrder)
          } else {
            res.send({message:'You must be logged in to create an order'})
            }
        }
    }
    } catch (error) {
        
    }
})
module.exports = ordersRouter