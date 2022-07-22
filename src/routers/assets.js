const express = require('express');
require('express-async-errors');
const assetsController = require('../controller/assets.controller');
const authentication = require('../middlewares/authentication');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.get('/:id', authentication, assetsController.getAssetsById);

routes.use(erroHandler);
module.exports = routes;