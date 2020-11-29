const { client } = require('./index');


async function getOrderProductById(id) {
    try {
      const { rows: [orderProduct] } = await client.query(`
      SELECT * 
      FROM order_products
      WHERE id=$1 
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
      WHERE op.id=$1;
      `, [id,price,quantity]);
      return orderProduct;
    } catch (error) {
        throw error;
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
module.exports={
    getOrderProductById,
    updateOrderProduct,
    destroyOrderProduct
}