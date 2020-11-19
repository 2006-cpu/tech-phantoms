const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "Sending in test3"
  });
});

module.exports = apiRouter;
