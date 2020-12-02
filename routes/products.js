const express = require('express')
const productsRouter = express.Router()
const { getAllProducts, getProductById} = require('../db/products')

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

module.exports = productsRouter