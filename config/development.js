module.exports = {
  port: process.env.DEV_APP_PORT || 3001,
  sessionSecret: process.env.DEV_APP_SECRET_SESSION,
  db: {
    host: process.env.DEV_DB_HOST,
    database: process.env.DEV_DB_DATABASE,
    dialect: process.env.DEV_DB_DIALECT,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    rootpass: process.env.DEV_DB_ROOT_PASSWORD,
  },
};
