require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./src/utils/swagger.config');
const app = require('./app');

// eslint-disable-next-line no-undef
const port = process.env.API_PORT || 3006;

const swaggerDocs = swaggerJsdoc(swaggerConfig)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(port, () => console.log('ouvindo porta', port));
