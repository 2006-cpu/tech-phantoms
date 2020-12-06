const express = require('express')
const productsRouter = express.Router()
const { getAllProducts, getProductById, updateProduct, createProduct, destroyProduct, getOrdersByProduct } = require('../db/products');
const { getUserById } = require('../db/users');

productsRouter.get('/', async (req,res,next)=>{
    try {
        const allProducts = await getAllProducts()
        res.send(allProducts)
    } catch (error) {
        res.send(error)
    }
})

productsRouter.get('/:productId', async (req,res,next)=>{
    try {
        const {productId}  = req.params
        const product = await getProductById(productId)
        
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//Only admins can create a new product
productsRouter.post('/', async (req,res,next) => {
    try {
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const createdProduct = await createProduct({name, description, price, imageURL, inStock, category})
          res.send(createdProduct)
        } else {
          res.send({message:'You must be an admin to create a product'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});
    
//Only admins can delete a product
productsRouter.delete('/:productId', async (req,res,next) => {
    try {
      const {productId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const deletedProduct = await destroyProduct({id})
          res.send(deletedProduct)
        } else {
          res.send({message:'You must be an admin to delete a product'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

//Only admins can update a product
productsRouter.patch('/:productId', async (req,res,next) => {
    try {
      const {productId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const updatedProduct = await updateProduct({id, ...fields})
          res.send(updatedProduct)
        } else {
          res.send({message:'You must be an admin to updated a product'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

//Get a list of all orders which have that product in them
productsRouter.get('/:productId/orders', async (req,res,next) => {
    try {
      const {productId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const orders = await getOrdersByProduct({id})
          res.send(orders)
        } else {
          res.send({message:'You must be an admin to view these orders'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

module.exports = productsRouter