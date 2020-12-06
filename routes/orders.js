const express = require('express')
const ordersRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { getUserById, getUser } = require('../db/users')
const { addProductToOrder, getOrderProductsByOrderId } = require('../db/order_products');

const { getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder,
    updateOrder,
    cancelOrder} = require('../db/orders');
const { getProductById } = require('../db/products');

ordersRouter.get('/', async (req, res, next)=>{
try {
  const orders = await getAllOrders()
    console.log('REQUSER<<<: ', req.user);
               res.send(orders)

    // >>>>>>>>>>>>>>>TO BE ADJUSTED<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    // const prefix = 'Bearer ';
    //     const auth = req.header('Authorization');
    //     console.log('Request', req.headers)
    //     if (auth.startsWith(prefix)) {
    //     const token = auth.slice(prefix.length);
    //     if (token){
    //     const { id } = jwt.verify(token, JWT_SECRET);
    //       if (id) {
            
    //         if (req.user.isAdmin===true){
    //             const orders = await getAllOrders()
    //             res.send(orders)
    //         } else {
    //             res.send({message:'Error: you must be an admin to view all orders'})
    //         }
    //       }
    //     }
    // }
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

        if( orderProducts.length === 0){
            totalPrice = Number(totalQuantity) * Number(price)
            const addedProduct = await addProductToOrder({orderId, productId, price: totalPrice, quantity})
            res.send(addedProduct)
            return
        } else{
            for(let i=0; i<orderProducts.length; i++){

                if(orderProducts[i].productId == productId){
                    totalQuantity = Number(quantity) + Number(orderProducts[i].quantity)
                    totalPrice = Number(totalQuantity) * Number(price)
                    const addedProduct = await addProductToOrder({orderId, productId, price: totalPrice, quantity: totalQuantity})
                    res.send(addedProduct)
                    return
                    
                }else if(i===orderProducts.length-1 && orderProducts[i].productId !== productId){

                    totalPrice = Number(quantity) * Number(price)
                    const prod = {orderId, productId, price: totalPrice, quantity}
                    const addedProduct = await addProductToOrder(prod)
                    res.send(addedProduct)
                    return 
                }
            }
    }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

ordersRouter.patch('/:orderId', async (req, res, next) => {
    try {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const user = await getUserById(id);
            console.log("user in patch", user);
            const order = await getOrderById(id);
            console.log("Order in patch", order);
            if(id === userId) {
            const updatedOrder = await updateOrder({id, ...fields})
            console.log("updatedOrder", updatedOrder)
            res.send(updatedOrder)}
          } else {
            res.send({message:'You must be the owner to update an order'})
            }
        }
    }
    } catch (error) {
        console.log(error);
        next(error);
    }
  });

  ordersRouter.delete('/:orderId', async (req, res, next) => {
    try {
        const {orderId} = req.params;
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        if (token){
        const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            const user = await getUserById(id);
            console.log("user in delete", user);
            const order = await getOrderById(orderId);
            console.log("Order in delete", order);
            if(id === userId) {
            const cancelledOrder = await cancelOrder(orderId)
            console.log("cancelledOrder", cancelledOrder)
            res.send(cancelledOrder)}
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
module.exports = ordersRouter