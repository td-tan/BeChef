const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../model/user');
const ErrorController = require('./error');

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

function authenticate(jwtBearerToken) {
  return jwt.verify(jwtBearerToken, RSA_PRIVATE_KEY);
}

function login(req, res) {
    User.findOne({ email: req.body.email}, (err, user) => {
        if (err) {
          ErrorController.errorhandler(err, req, res);
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

          // Use user secret key as part of jwt sign key
          // After logout will invalidate token by changing secret key
          console.log(user.secret_key);
          const jwtBearerToken = jwt.sign({secret_key: user.secret_key}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: "1d",
            subject: user.id
          });
          console.log(jwtBearerToken);
    
          res.cookie("SESSIONID", jwtBearerToken, {
            httpOnly: true, 
            secure: true
          });
          
          res.send({
            success: true
          });
        } else {
          console.log("NO MATCH");
          res.send({
            error: 'Password does not match'
          });
        }
      });
}

async function logout(req, res) {
    if (!req.cookies) {
        ErrorController.errorhandler(err);
        return;
    }
    const jwtBearerToken = req.cookies['SESSIONID'];
    try {
        const decoded = authenticate(jwtBearerToken);
        
        const user = await User.findOneAndUpdate(
            { _id: decoded['sub'] }, 
            { secret_key: crypto.randomBytes(16).toString('Hex')});
        
        console.log(user);
        res.send({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: 'Invalid Token'
        });
    }
}

function register(req, res) {
      const emailOrUsername = { 
        $or: [
        {email: req.body.email}, 
        {username: req.body.username} 
      ]};
    
      User.exists(emailOrUsername, (err, user) => {
        if(err) {
            ErrorController.errorhandler(err, req, res);
            return;
        }
        if(!Object.is(user, null)) {
            console.log('User does exists');
            res.send({
              error: 'User does exists'
            });
            return;
        }
        let newUser = User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.hashPassword(req.body.password);
        
        newUser.save((err, User) => {
            if (err) {
              ErrorController.errorhandler(err, req, res);
              return;
            }
            console.log(User);
            res.send({
              success: true
            });
            return;
        });
      });
}

module.exports = { 
    login, 
    logout,
    register,
    authenticate
};