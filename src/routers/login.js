const express = require('express');
const loginController = require('../controller/login.controller');

const routes = express.Router();

routes.post('/', loginController);

module.exports = routes;