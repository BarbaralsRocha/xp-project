const express = require('express');
require('express-async-errors');
const userController = require('../controller/user.controller');
const userValidation = require('../middlewares/userValidation');
const authentication = require('../middlewares/authentication');
const erroHandler  = require('../middlewares/errorHandler');

const routes = express.Router();

routes.post('/',
userValidation,
userController.newUser);


routes.get('/',
authentication,
userController.getUsers);

routes.use(erroHandler);
module.exports = routes;