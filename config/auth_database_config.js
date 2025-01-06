const { Sequelize } = require("sequelize");
const config = require("./index");
require("dotenv").config();

const sequelizeConnection = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: false,
});

module.exports = sequelizeConnection;
