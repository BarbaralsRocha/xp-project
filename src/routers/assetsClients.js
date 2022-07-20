const express = require('express');
require('express-async-errors');
const activesController = require('../controller/assets.controller');
const authentication = require('../middlewares/authentication');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.get('/ativos/:id', authentication, activesController.getAssetsClients);

routes.use(erroHandler);
module.exports = routes;