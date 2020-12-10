const apiRouter = require('express').Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter)

const orderProductsRouter = require('./order_products');
apiRouter.use('/order_products', orderProductsRouter);

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    message: "API is healthy!"
  });
});

module.exports = apiRouter;
