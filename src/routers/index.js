const express = require('express');
require('express-async-errors');

const router = express.Router();

const routeUser = require('./user');
const routeLogin = require('./login');
const routesInvestiments = require('./investiments');
const routesAssetsClients = require('./assetsClients');
const routesAssets = require('./assets');
const routesAccount = require('./account');
const erroHandler  = require('../middlewares/errorHandler');

/**
 * @swagger
 *  tags:
 *      name: User
 *      description: Endpoint para cadastro de usuários
 */

router.use('/user', routeUser);
router.use('/login', routeLogin);
router.use('/investimentos', routesInvestiments);
router.use('/conta', routesAccount);
router.use('/clientes', routesAssetsClients);
router.use('/assets', routesAssets);

router.use(erroHandler);

module.exports = router;