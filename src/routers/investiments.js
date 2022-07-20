const express = require('express');
require('express-async-errors');
const buyController = require('../controller/buy.controller');
const saleController = require('../controller/sale.controller');
const authentication = require('../middlewares/authentication');
const investValidation = require('../middlewares/investValidation');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.post('/comprar', investValidation, authentication, buyController);
routes.post('/vender', investValidation, authentication, saleController);

routes.use(erroHandler);
module.exports = routes;