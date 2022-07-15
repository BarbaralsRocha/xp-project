const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use(require('./src/routers'));

module.exports = app;
