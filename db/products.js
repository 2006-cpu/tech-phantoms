const { client } = require('./index');
const { getOrderProductById } = require('./order_products');
const { getOrderById } = require('./orders');
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
const updateProduct = async ({id, ...fields})=>{
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');
    
    const objVal = Object.values(fields)
    if( setString.length === 0){
        return;
    }
    console.log ("objVal updateProduct", objVal);
    objVal.push(id);

    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id = $${objVal.length}
            RETURNING *;
        `, objVal);
        console.log("PRODUCT", product);
        return product;
    } catch (error) {
        throw error;
    }
};

async function destroyProduct({id}) {
    try {
        const order = await getOrderById(id);
        if(order.status === 
            'completed'){
                console.log("This order has been completed")
                return;
            }
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
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    destroyProduct
}