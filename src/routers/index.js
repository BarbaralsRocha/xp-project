const express = require('express');
const erroHandler  = require('../middlewares/errorHandler')

const router = express.Router();

const routeUser = require('./user');


router.use('/user', routeUser);


router.use(erroHandler);

module.exports = router;