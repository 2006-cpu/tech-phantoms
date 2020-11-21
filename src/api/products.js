

//This file needs to contain React routes to update the frontend using either fetch or axios. Express routes go in the 'routes' folder//


/*
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
                message: "Could not get all products."
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
*/