const express = require('express');
const productsRouter = express.Router();
const { requireUser } = require('./')

const {
    createProduct,
    getAllProducts,
    getProductById
} = require('../db');

productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        if(!allProducts) {
            next({
                name: "GetAllProductsError",
                message: "Could not get any products."
            });
            return;
        }
        res.send(
            allProducts
        );
    } catch (error) {
      next (error);
    }
});

productsRouter.get('/:productsId/products', async (req, res, next) => {
    try {
      const allProducts = await getProductById({ id: req.params.activityId });
      if(allProducts) {
          res.send(allProducts);
      } else {
          next({
              name: 'ProductsById',
              message: 'No products by id found.'
          })
      }
    } catch (error) {
      next(error);
    }
})

module.exports = productsRouter;