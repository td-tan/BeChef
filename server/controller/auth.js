const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('../model/user');
const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

function errorhandler(err) {
  console.log(err)
  res.status(500).send({
    error: 'Something went wrong'
  });
}

function authenticate(jwtBearerToken) {
  return jwt.verify(jwtBearerToken, RSA_PRIVATE_KEY);
}

function login(req, res) {
    User.findOne({ email: req.body.email}, (err, user) => {
        if (err) {
          errorhandler(err);
          return;
        }
    
        if(Object.is(user, null)) {
          res.send({
            error: 'Email is not registered'
          });
          return;
        }
    
        if (user.verifyPassword(req.body.password)) {
          console.log("MATCH");
    
          const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: "120",
            subject: user.id
          });
          console.log(jwtBearerToken);
    
          res.cookie("SESSIONID", jwtBearerToken, {
            httpOnly: true, 
            secure: true
          });
          
          res.send({
            username: user.username,
            email: user.email
          });
        } else {
          console.log("NO MATCH");
          res.send({
            error: 'Password does not match'
          });
        }
      });
}

function register(req, res) {
      const emailOrUsername = { 
        $or: [
        {email: req.body.email}, 
        {username: req.body.username} 
      ]};
    
      User.exists(emailOrUsername, (err, user) => {
        if(err) {
            errorhandler(err);
            return;
        }
        if(!Object.is(user, null)) {
            console.log('User does exists.');
            res.send('User does exists.');
            return;
        }
        let newUser = User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.hashPassword(req.body.password);
        
        newUser.save((err, User) => {
            if (err) {
              errorhandler(err);
              return;
            }
            console.log(User);
            res.send('User was created successfully.');
            return;
        });
      });
}

module.exports = { 
    login, 
    register,
    authenticate
};