const User = require('../model/user');

const AuthController = require('./auth');
const ErrorController = require('./error');

function getUser(req, res) {
    if (!req.cookies) {
        ErrorController.errorhandler(err);
        return;
    }
    const jwtBearerToken = req.cookies['SESSIONID'];
    let decoded = '';
    try {
        decoded = AuthController.authenticate(jwtBearerToken);
        console.log(decoded);
    } catch (err) {
        console.error(err);
        res.send({
            error: 'Invalid Token'
        });
    }

    User.findById(decoded['sub'], (err, user) => {
        if (err) {
            ErrorController.errorhandler(err, req, res);
            return;
        }
        if(Object.is(user, null)) {
            res.send({
                error: "User not found"
            });
        }
        console.log(user.secret_key);

        if(user.secret_key !== decoded['secret_key']) {
            res.send({
                error: "Session dead"
            });
            return;
        }

        res.send({
            success: true
        });
    });
}

module.exports = { 
    getUser
};