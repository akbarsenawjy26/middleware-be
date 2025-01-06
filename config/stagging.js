module.exports = {
  port: process.env.STAG_APP_PORT || 4001,
  sessionSecret: process.env.STAG_APP_SECRET_SESSION,
  db: {
    host: process.env.STAG_DB_HOST,
    database: process.env.STAG_DB_DATABASE,
    dialect: process.env.STAG_DB_DIALECT,
    username: process.env.STAG_DB_USERNAME,
    password: process.env.STAG_DB_PASSWORD,
    rootpass: process.env.STAG_DB_ROOT_PASSWORD,
  },
};
