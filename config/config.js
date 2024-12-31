// Menggunakan dotenv untuk memuat variabel environment
const dotenv = require("dotenv");
dotenv.config();

// Menggunakan CommonJS untuk ekspor
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, // Pastikan konsisten penulisan nama variabel
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Perbaiki penulisan dari DB_DILECT menjadi DB_DIALECT
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
