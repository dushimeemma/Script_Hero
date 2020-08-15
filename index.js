const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/config');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const db = config[process.env.NODE_ENV].mongoURI;

const connectDB = async () => {
  const con = await mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log('MongoDB connected successfully');
  return con;
};
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    msg: 'Undefined route',
  });
});

app.listen(port, () => console.log(`Server started on port:${port}`));

module.exports = app;
