const { client } = require('./index');

async function createProduct({
    name, description
}) {
    try {
        const { rows: [ product ] } = await client.query (`
            INSERT INTO products(name, description, price, "imageUrl", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description]);
      return product;        
    } catch (error) {
      throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows: productIds } = await client.query(`
        SELECT id
        FROM products
        `);
        const products = await Promise.all(productsIds.map(
            products => getProductById( product.id )
        ));
      return products;
    } catch (error) {
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const { rows: [ product ] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1;
        `, [productId]);
      return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
}