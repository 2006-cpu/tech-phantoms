const { client } = require('./index');

async function addProductToOrder({
    orderId,
    productId,
    price,
    quantity
}) {
try {
    // if the productId is NOT on the order yet, create a new order_products
    const { rows: [productOrder] } = await client.query(`
    INSERT INTO product_orders ("productId", "orderId", price, quantity)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [productId, orderId, price, quantity])
    return productOrder;
    } catch (error) {
    }
};

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

module.exports={
    addProductToOrder,
    destroyOrderProduct
}