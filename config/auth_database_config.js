const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeConnection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

module.exports = sequelizeConnection;
