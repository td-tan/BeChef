require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

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

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);


app.post('/api/login', (req, res) => {
  const email = req.body.email,
        password = req.body.password;

  User.findOne({ email: email}, (err, document) => {
    if (err) return handleError(err);

    if(Object.is(document, null)) {
      res.send('Something went wrong.');
      return;
    }

    console.log(document.password);
    res.send(`Hello ${document.email}`);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});