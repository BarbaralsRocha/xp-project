const express = require('express');
require('express-async-errors');
const amountController = require('../controller/amount.controller');
const authentication = require('../middlewares/authentication');
const accountValidation = require('../middlewares/accountValidation');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.get('/:id', authentication, amountController.amount);
routes.post('/deposito', accountValidation, authentication, amountController.deposit);
routes.post('/saque', accountValidation, authentication, amountController.withdraw);

routes.use(erroHandler);
module.exports = routes;