/* eslint-disable no-undef */
require('dotenv').config(); 
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME || 'steelInvestiment',
});

module.exports = connection; 