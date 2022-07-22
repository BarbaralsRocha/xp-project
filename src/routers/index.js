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

router.use('/user', routeUser);
router.use('/login', routeLogin);
router.use('/investimentos', routesInvestiments);
router.use('/conta', routesAccount);
router.use('/ativos', routesAssetsClients);
router.use('/ativos', routesAssets);


router.use(erroHandler);


module.exports = router;

 /**
 * @swagger
 *  components:
 *      schemas: 
 *          UserBody:
 *              type: object
 *              required:
 *                  -name
 *                  -password
 *                  -cpf
 *                  -email
 *                  -balance
 *                  -account
 *              properties: 
 *                 name:
 *                      type: string
 *                 password:
 *                      type: string
 *                 cpf:
 *                      type: string
 *                 email:
 *                      type: string
 *                 balance:
 *                      type: number
 *                 account:
 *                      type: number
 *              example:
 *                  name: Barbara
 *                  password: dsf2@23asd
 *                  cpf: "11111111111"
 *                  email: barbara@teste.com
 *                  balance: 50000
 *                  account: 169872
 * 
 *          UserResponse:
 *              type: object
 *              properties: 
 *                 name:
 *                      type: string
 *                 email:
 *                      type: string
 *                 balance:
 *                      type: number
 *                 token:
 *                      type: string
 *          UserAlredyRegister:
 *              type: object
 *              properties: 
 *                 message:
 *                      type: string
 *              example:
 *                  message: Usuário já possui uma conta existente
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags: ['User']
 *     description: Endpoint para cadastrar um usuário
 *     requestBody:
 *       content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserBody'
 *     responses:
 *       '201': 
 *         description: Usuário registrado com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserResponse'
 *       '409': 
 *         description: Usuário já possui cadastro
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserAlredyRegister'
 * 
 */


/* =================================================================================== */

 /**
 * @swagger
 *  components:
 *      schemas: 
 *          LoginBody:
 *              type: object
 *              required:
 *                  -email
 *                  -password
 *              properties: 
 *                 email:
 *                      type: string
 *                 password:
 *                      type: string
 *              example:
 *                  email: barbaralsrocha@gmail.com
 *                  password: '123456'
 * 
 *          LoginResponse:
 *              type: object
 *              properties: 
 *                 email:
 *                      type: string
 *                 token:
 *                      type: string
 *          LoginInvalid:
 *              type: object
 *              properties: 
 *                 message:
 *                      type: string
 *              example:
 *                  message: Campos Inválidos
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: ['Login']
 *     description: Endpoint para o cliente logar na aplicação
 *     requestBody:
 *       required: true
 *       content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       '201': 
 *         description: Cliente logado com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400': 
 *         description: Campos inválidos 
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/LoginInvalid'
 * 
 * 
 */

/* =================================================================================== */

 /**
 * @swagger
 *  components:
 *      schemas: 
 *          InvestimentsBody:
 *              type: object
 *              required:
 *                  -codAtivo
 *                  -qtdeATivos
 *                  -conta
 *              properties: 
 *                 codAtivo:
 *                      type: number
 *                 qtdeATivos:
 *                      type: number
 *                 conta:
 *                      type: number
 *              example:
 *                  codAtivo: 5
 *                  qtdeAtivos: 10
 *                  conta: 123456
 * 
 *          InvestimentsResponse:
 *              type: object
 *              properties: 
 *                 codAtivo:
 *                      type: number
 *                 qtdeATivos:
 *                      type: number
 *                 conta:
 *                      type: number
 */

/**
 * @swagger
 * /investimentos/comprar:
 *   post:
 *     tags: ['Comprar Investimentos']
 *     description: Endpoint para o cliente comprar ações. É necessário autenticação.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/InvestimentsBody'
 *     responses:
 *       '201': 
 *         description: Compra feita com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/InvestimentsResponse'
 * 
 * 
 */

/* =================================================================================== */

/**
* @swagger
* /investimentos/vender:
*   post:
*     tags: ['Vender Investimentos']
*     description: Endpoint para o cliente vender ações. É necessário autenticação.
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content: 
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/InvestimentsBody'
*     responses:
*       '201': 
*         description: Venda feita com sucesso
*         content: 
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/InvestimentsResponse'
* 
* 
*/

/* =================================================================================== */

/**
 * @swagger
 *  components:
 *      schemas: 
 *          AmountBody:
 *              type: object
 *              required:
 *                  -codCliente 
 *                  -valor
 *              properties: 
 *                 codCliente:
 *                      type: number
 *                 valor:
 *                      type: number
 *              example:
 *                  codCliente: 1
 *                  valor: 1000
 * 
 *          AmountResponse:
 *              type: object
 *              properties: 
 *                 codCliente:
 *                      type: number
 *                 valor:
 *                      type: number
 */

/**
 * @swagger
 * /conta/deposito:
 *   post:
 *     tags: ['Deposito']
 *     description: Endpoint para o cliente depositar.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AmountBody'
 *     responses:
 *       '201': 
 *         description: Depósito feito com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AmountResponse'
 * 
 * 
 */

/* =================================================================================== */

/**
 * @swagger
 * /conta/saque:
 *   post:
 *     tags: ['Saque']
 *     description: Endpoint para o cliente sacar.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AmountBody'
 *     responses:
 *       '201': 
 *         description: Saque feito com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AmountResponse'
 * 
 * 
 */

/* =================================================================================== */


/**
 * @swagger
 *  components:
 *      schemas: 
 *          AccountResponse:
 *              type: object
 *              properties: 
 *                 codCliente:
 *                      type: number
 *                 saldo:
 *                      type: number
 */

/**
 * @swagger
 * /conta/{id}:
 *   get:
 *     tags: ['Conta']
 *     description: Endpoint para visualizar qual o saldo do cliente logado na aplicação
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       '201': 
 *         description: Busca pelo saldo do cliente feita com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AccountResponse'
 * 
 * 
 */

/* =================================================================================== */


/**
 * @swagger
 *  components:
 *      schemas: 
 *          AssetsByClientResponse:
 *              type: object
 *              properties: 
 *                 codCliente:
 *                      type: number
 *                 codAtivo:
 *                      type: number
 *                 qtdeAtivos:
 *                      type: number
 *                 valor:
 *                      type: number
 */

/**
 * @swagger
 * /ativos/clientes/{id}:
 *   get:
 *     tags: ['Ativos por cliente']
 *     description: Endpoint para visualizar quais ativos um cliente possui
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       '201': 
 *         description: BUsca para visualizar quais ativos o cliente possui feita com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               items:
 *                  $ref: '#/components/schemas/AssetsByClientResponse'
 * 
 * 
 */

/* =================================================================================== */

/**
* @swagger
*  components:
*      schemas: 
*          AssetsByIdResponse:
*              type: object
*              properties: 
*                 codAtivo:
*                      type: number
*                 qtdeAtivos:
*                      type: number
*                 valor:
*                      type: number
*/

/**
* @swagger
* /ativos/{id}:
*   get:
*     tags: ['Ativos por Id']
*     description: Endpoint para visualizar um ativo específico
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         type: string
*         required: true
*     responses:
*       '200': 
*         description: Busca para visualizar um ativo específico feito com sucesso
*         content: 
*           application/json:
*             schema:
*               items:
*                  $ref: '#/components/schemas/AssetsByIdResponse'
* 
* 
*/