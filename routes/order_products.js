const express = require('express')
const orderProductsRouter = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' }  = process.env; 

const { addProductToOrder } = require('../db/order_products');



module.exports = orderProductsRouter