const express = require('express')
const ordersRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { getUserById } = require('../db/users')
const { addProductToOrder, getOrderProductsByOrderId } = require('../db/order_products');

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

ordersRouter.post('/:orderId/products', async (req, res, next) => {
    try {

        const {orderId} = req.params
        const {productId, price, quantity} = req.body
        
        const orderProducts = await getOrderProductsByOrderId(orderId)
        let totalQuantity
        let totalPrice
        console.log("ORDERID", orderId)
        console.log("PRODUCTID", productId)
        orderProducts.forEach(product=>{
            if(product.productId == productId){
                console.log("YOUR IF STATEMENT WORKS")
                totalQuantity = Number(quantity) + Number(product.quantity)
                totalPrice = Number(totalQuantity) * Number(price)
                console.log('TOTALQUANTITY', totalQuantity)
                res.send({message: "YAY"})
            }else{
                console.log("YOUR IF STATEMENT DOESN'T WORK")
                res.send({message: "NAY"})    
            }
        })
        
        /*
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
    }*/
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = ordersRouter