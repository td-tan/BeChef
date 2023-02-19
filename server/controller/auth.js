const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('../model/user');
const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

function login(req, res) {
    User.findOne({ email: req.body.email}, (err, user) => {
        if (err) {
          console.error(err);
          return;
        }
    
        if(Object.is(user, null)) {
          res.send('Something went wrong.');
          return;
        }
    
        if (user.verifyPassword(req.body.password)) {
          console.log("MATCH");
    
          const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
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
        }
      });
}

async function register(req, res) {
    if (req.body.password !== req.body.passwordRepeat) {
        res.send('Passwords do not match.');
        return;
      }
    
      const emailOrUsername = { 
        $or: [
        {email: req.body.email}, 
        {username: req.body.username} 
      ]};
    
      User.exists(emailOrUsername, (err, user) => {
        if(err) {
            console.error(err);
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
            console.error(err);
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
    register 
};