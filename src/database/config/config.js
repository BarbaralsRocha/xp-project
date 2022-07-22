/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": 'steelInvestiment',
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": "steelInvestiment",
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB_NAME,
    "host": process.env.MYSQL_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
  }
  }
}
