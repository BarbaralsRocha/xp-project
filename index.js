require('dotenv').config();
const app = require('./app');

// eslint-disable-next-line no-undef
const port = process.env.API_PORT || 3006;

app.listen(port, () => console.log('ouvindo porta', port));
