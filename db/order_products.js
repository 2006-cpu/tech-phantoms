const { client } = require('./index');


async function getOrderProductById(id) {
    try {
      const { rows: [orderProduct] } = await client.query(`
      SELECT * 
      FROM order_products
      WHERE id=$1;
      `, [id]);
      return orderProduct;
    } catch (error) {
        throw error;
    }
};

// ***********************************************************************************

async function updateOrderProduct({ id, price, quantity }) {
    try {
      const { rows: [orderProduct] } = await client.query(`
      UPDATE order_products op
      SET price=$2, quantity=$3
      WHERE op.id=$1
      RETURNING *;
      `, [id,price,quantity]);
      return orderProduct;
    } catch (error) {
        throw error;
    }
};

// ***********************************************************************************

async function addProductToOrder({
    orderId,
    productId,
    price,
    quantity
}) {
try {
    // if the productId is NOT on the order yet, create a new order_products
    const { rows: [productOrder] } = await client.query(`
    INSERT INTO order_products ("productId", "orderId", price, quantity)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [productId, orderId, price, quantity])
    return productOrder;
    } catch (error) {
    }
};

// ***********************************************************************************

async function destroyOrderProduct(id) {
    try {
      const { rows: [orderProduct] } = await client.query(`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING *
      `, [id]);
      return orderProduct;
    } catch (error) {
        throw error;
    }
};

// ***********************************************************************************

async function getOrderProductsByOrderId(orderId){
    try {
        const {rows: orderProducts} = await client.query(`
            SELECT * FROM order_products
            WHERE "orderId" = $1
        `,[orderId])
        console.log('ORDERPRODUCTS',orderProducts)
        return orderProducts
    } catch (error) {
        console.error(error)
    }
}
module.exports={
    getOrderProductById,
    updateOrderProduct,
    addProductToOrder,
    destroyOrderProduct,
    getOrderProductsByOrderId

}
