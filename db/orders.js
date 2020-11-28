const { client } = require('./index')
const { getUserByUserName } = require('./users')

const getOrderById = async (id)=>{
    try {
        const {rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE id=$1
        `,[id])

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

        return orders
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
        const {rows: cartOrder} = await client.query(`
            SELECT * FROM orders 
            WHERE "userId"=$1 AND status='created'
        `,[id])

        /*Insert Order_Products fetch code here */

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

module.exports={
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    createOrder
}