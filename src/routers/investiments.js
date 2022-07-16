const express = require('express');
const buyController = require('../controller/buy.controller');
const authentication = require('../middlewares/authentication');
const buyValidation = require('../middlewares/buyValidation');

const routes = express.Router();

routes.post('/comprar', buyValidation, authentication, buyController);

module.exports = routes;