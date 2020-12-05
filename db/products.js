const { client } = require('./index');

async function createProduct({name, description, price, imageURL='https://i.imgur.com/6CsuY8X.png', inStock, category}) {
    try {
        const { rows: [ product ] } = await client.query (`
            INSERT INTO products(name, description, price, "imageURL", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, imageURL, inStock, category]);
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

async function destroyProduct({id}) {
    //make sure to delete all the order_products whose product is the one being deleted.
//  make sure the orders for the order_products being deleted do not have a status = completed
    try {
        // if(order.status === 
        //     'completed'){
        //         return;
        //     }
        await client.query(`
        DELETE from order_products
        WHERE "productId"=$1
        RETURNING *;
        `, [id]);
        const { rows: [product] } = await client.query (`
        DELETE from products
        WHERE id=$1
        RETURNING *;
        `, [id]);
        console.log("****PRODUCT", product);
        return product;
    } catch (error) {
        throw error;
    }
}
// destroyProduct({id: 3, name: "pizza soap", description: "Contains authentic New York pizza grease.", price: 1999});
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    destroyProduct
}