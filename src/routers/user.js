const express = require('express');
const userController = require('../controller/user.controller');
const userValidation = require('../middlewares/userValidation');

const routes = express.Router();

routes.post('/',

userValidation,
userController.newUser);

module.exports = routes;