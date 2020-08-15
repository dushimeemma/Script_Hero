import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  development: {
    mongoURI: process.env.DEV_DB_URI,
  },
  test: {
    mongoURI: process.env.TEST_DB_URI,
  },
  production: {
    mongoURI: process.env.PROD_DB_URI,
  },
};