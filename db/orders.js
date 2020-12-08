const { client } = require('./index')
const { getUserByUserName } = require('./users')
const {getOrderProductsByOrderId} = require('./order_products')
const { getProductById } = require('./products')

const getOrderById = async (id)=>{
    try {
        const {rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE id=$1
        `,[id])
        const orderProducts = await getOrderProductsByOrderId({orderId: cartOrder.id})

        order.products = orderProducts
        return order
    } catch (error) {
        console.error(error)
    }
}

const getAllOrders = async ()=>{
    try {
        const {rows: orders} = await client.query(`
            SELECT * FROM orders
        `)
        const completeOrders = await Promise.all(orders.map(async order=>{
            const orderProducts = await getOrderProductsByOrderId(order.id)
            const products = await Promise.all(orderProducts.map(async (orderProduct) =>{
    
                const product = await getProductById(orderProduct.productId)
                return product
            }))
            order.orderProducts = orderProducts
            order.products = products
            return order
        }))
        return completeOrders
    } catch (error) {
        console.error(error)
    }
} 

const getOrdersByUser = async ({ id })=>{
    try {
        const {rows: orders} = await client.query(`
            SELECT * FROM orders
            WHERE "userId"=$1
        `,[id])
        orders.forEach(async order=>{
            const orderProducts = await getOrderProductsByOrderId(order.id)
            const products = await Promise.all(orderProducts.map(async (orderProduct) =>{
    
                const product = await getProductById(orderProduct.productId)
                return product
            }))
            order.orderProducts = orderProducts
            order.products = products
        })
        return orders
    } catch (error) {
        console.error(error)
    }
}

const getOrdersByProduct = async ({id})=>{
    try {
        const {rows: orders} = await client.query(`
            SELECT orders.* FROM orders
            JOIN order_products ON order_products."orderId" = orders.id
            WHERE order_products."productId" = $1
        `, [id])

        return orders
    } catch (error) {
        console.error(error)
    }
}

const getCartByUser = async ({id})=>{
    try {
        const {rows: [cartOrder] } = await client.query(`
            SELECT * FROM orders 
            WHERE "userId"=$1 AND status='created'
        `,[id])

        const orderProducts = await getOrderProductsByOrderId(cartOrder.id)
        const products = await Promise.all(orderProducts.map(async (orderProduct) =>{

            const product = await getProductById(orderProduct.productId)
            return product
        }))

        if(orderProducts && products){
        cartOrder.orderProducts = orderProducts
        cartOrder.products = products}else{
            cartOrder.orderProducts = []
            cartOrder.products = []
        }

        console.log("CARTDB", cartOrder)
        return cartOrder
    } catch (error) {
        console.error(error)
    }
}

/*
status input needs to be 'created, cancelled, or completed'
*/

const createOrder = async ({status='created', userId})=>{
    try {
        if(status === 'created'|| status === 'cancelled'|| status === 'completed'){
            
        const date = new Date()
        const {rows: [order]} = await client.query(`
        INSERT INTO orders(status, "userId", "datePlaced") 
        VALUES ($1, $2, $3)
        RETURNING *
        `, [status, userId, date])

        return order
    } 
        else{
            return {
                message: "Error: status needs to be 'created', 'cancelled', or 'completed'"
            } 
        }
    } catch (error) {
        console.error(error)
    }
}

const updateOrder = async ({id, ...fields})=>{
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');
    
    const objVal = Object.values(fields)
    if( setString.length === 0){
        return;
    }
    
    objVal.push(id);

    try {
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id = $${objVal.length}
            RETURNING *;
        `, objVal);
        return order;
    } catch (error) {
        throw error;
    }
}

const completeOrder = async ({ id })=>{
    
    try {
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET status = 'completed'
            WHERE id = $1
            RETURNING *;
        `,[id] );
        return order;
    } catch (error) {
        throw error;
    }
}

const cancelOrder = async ( id )=>{
    
    try {
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET status = 'cancelled'
            WHERE id = $1
            RETURNING *;
        `,[id] );
        return order;
    } catch (error) {
        throw error;
    }
}


module.exports={
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder,
    updateOrder,
    completeOrder,
    cancelOrder
}