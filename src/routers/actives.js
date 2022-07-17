const express = require('express');
const activesController = require('../controller/actives.controller');
const authentication = require('../middlewares/authentication');

const routes = express.Router();

routes.get('/:id', authentication, activesController);

module.exports = routes;