const { Sequelize } = require("sequelize");
const config = require("./index"); // Pastikan path ke konfigurasi benar
require("dotenv").config(); // Memuat variabel lingkungan dari .env

// Membuat koneksi Sequelize
const sequelizeConnection = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Koneksi ke database berhasil!");
  })
  .catch((err) => {
    console.error("Gagal terhubung ke database:", err);
  });

module.exports = { sequelizeConnection };
