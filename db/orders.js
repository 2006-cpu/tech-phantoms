const { client } = require('./index')

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

const getOrdersByUser = async ({username})=>{
    try {
        const {rows: orders} = await client.query(`
            SELECT * FROM orders
            WHERE username=$1
        `,[username])

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
        const {rows: cart} = await client.query(`
            SELECT * FROM orders 
            WHERE "userId"=$1 AND status=created
        `,[id])

        return cart
    } catch (error) {
        console.error(error)
    }
}

const createOrder = async ({status, userId})=>{
    try {
        const {rows: [order]} = await client.query(`

        INSERT INTO orders 
        VALUES ($1, $2)
        RETURNING *
        `, [status, userId])

        return order
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