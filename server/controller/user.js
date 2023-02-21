const User = require('../model/user');

const AuthController = require('./auth');
const ErrorController = require('./error');

function getUser(req, res) {
    if (!req.cookies) {
        ErrorController.errorhandler(err);
    }
    const jwtBearerToken = req.cookies['SESSIONID'];
    try {
        const decoded = AuthController.authenticate(jwtBearerToken);
        console.log(decoded);
        
        User.findById(decoded['sub'], (err, user) => {
            if (err) {
                ErrorController.errorhandler(err, req, res);
                return;
            }
            if(Object.is(user, null)) {
                throw "User with ID not found";
            }
            console.log(user.secret_key);

            if(user.secret_key === decoded['secret_key']) {
                console.log("Token valid");
            }

            res.send({
                success: true
            });
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: 'Invalid Token'
        });
    }
}

module.exports = { 
    getUser
};