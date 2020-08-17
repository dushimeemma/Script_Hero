import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  development: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    name: process.env.NAME_DEV,
    jwtSecret: process.env.JWTSECRET,
  },
  test: {
    host: process.env.HOST,
    port: process.env.PORT,
    name: process.env.NAME_TEST,
    jwtSecret: process.env.JWTSECRET,
  },
  production: {
    mongoURI: process.env.PROD_DB_URI,
    jwtSecret: process.env.JWTSECRET,
  },
};
