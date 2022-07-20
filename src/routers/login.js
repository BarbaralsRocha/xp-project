const express = require('express');
require('express-async-errors');
const loginController = require('../controller/login.controller');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.post('/', loginController);

routes.use(erroHandler);
module.exports = routes;