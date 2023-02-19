require('dotenv').config();

const crypto = require('crypto');
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
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.hashPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('Hex');

  this.hash = crypto.scryptSync(password+process.env.SECRET_KEY, this.salt, 64).toString('hex');
}

userSchema.methods.verifyPassword = function(password) {
  const hash = crypto.scryptSync(password+process.env.SECRET_KEY, this.salt, 64).toString('hex');
  return this.hash === hash;
}

const User = mongoose.model("User", userSchema);


app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email}, (err, document) => {
    if (err) {
      console.error(err);
      return;
    }

    if(Object.is(document, null)) {
      res.send('Something went wrong.');
      return;
    }

    if (document.verifyPassword(req.body.password)) {
      console.log("MATCH");
    } else {
      console.log("NO MATCH");
    }
    res.send(`Hello ${document.email}`);
  });
});

app.post('/api/register', (req, res) => {
  if (req.body.password !== req.body.passwordRepeat) {
    res.send('Passwords do not match.');
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