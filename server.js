require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('./server/model/user');

const app = express();

const port = process.env.PORT || 3000;
const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');


app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONN_URI + '/test')
  .then(() => {
    console.log(`⚡️[mongodb]: Server is connected with DB test`);
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
});

app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email}, (err, User) => {
    if (err) {
      console.error(err);
      return;
    }

    if(Object.is(User, null)) {
      res.send('Something went wrong.');
      return;
    }

    if (User.verifyPassword(req.body.password)) {
      console.log("MATCH");

      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: User.id
      });
      console.log(jwtBearerToken);

      res.cookie("SESSIONID", jwtBearerToken, {
        httpOnly: true, 
        secure: true
      });
      
      res.send({
        username: User.username,
        email: User.email
      });
    } else {
      console.log("NO MATCH");
    }
  });
});

app.post('/api/register', (req, res) => {
  if (req.body.password !== req.body.passwordRepeat) {
    res.send('Passwords do not match.');
    return;
  }

  const emailOrUsername = { 
    $or: [
    {email: req.body.email}, 
    {username: req.body.username} 
  ]};

  if(User.findOne(emailOrUsername).exec()) {
    console.log("User already exists.");
    res.send("User already exists.");
    return;
  }

  let newUser = User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.hashPassword(req.body.password);

  newUser.save((err, User) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(User);
    res.send('User was created successfully.');
    return;
  });
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});