const express = require('express');
const buyController = require('../controller/buy.controller');
const saleController = require('../controller/sale.controller');
const authentication = require('../middlewares/authentication');
const investValidation = require('../middlewares/investValidation');

const routes = express.Router();

routes.post('/comprar', investValidation, authentication, buyController);
routes.post('/vender', investValidation, authentication, saleController);

module.exports = routes;