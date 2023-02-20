require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const AuthController = require('./server/controller/auth');
const UserController = require('./server/controller/user');

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONN_URI + '/test')
  .then(() => {
    console.log(`⚡️[mongodb]: Server is connected with DB test`);
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
});

app.post('/api/login', AuthController.login);
app.post('/api/register', AuthController.register);
app.get('/api/user', UserController.getUser);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});