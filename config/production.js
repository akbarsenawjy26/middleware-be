module.exports = {
  port: process.env.PROD_APP_PORT || 8001,
  sessionSecret: process.env.PROD_APP_SECRET_SESSION,
  db: {
    host: process.env.PROD_DB_HOST,
    database: process.env.PROD_DB_DATABASE,
    dialect: process.env.PROD_DB_DIALECT,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    rootpass: process.env.PROD_DB_ROOT_PASSWORD,
  },
};
