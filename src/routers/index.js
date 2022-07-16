const express = require('express');
const erroHandler  = require('../middlewares/errorHandler')

const router = express.Router();

const routeUser = require('./user');
const routeLogin = require('./login');
const routesInvestiments = require('./investiments');

router.use('/user', routeUser);
router.use('/login', routeLogin);
router.use('/investimentos', routesInvestiments);

router.use(erroHandler);

module.exports = router;