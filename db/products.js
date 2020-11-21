const { client } = require('./index');

async function createProduct({name, description, price, imageUrl, inStock, category}) {
    try {
        const { rows: [ product ] } = await client.query (`
            INSERT INTO products(name, description, price, "imageUrl", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, imageUrl, inStock, category]);
      return product;        
    } catch (error) {
      throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows: products } = await client.query(`
        SELECT *
        FROM products
        `);
        
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