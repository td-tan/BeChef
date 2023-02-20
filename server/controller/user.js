const User = require('../model/user');
const AuthController = require('./auth');

function getUser(req, res) {
    if (!req.cookies) {
        res.send({
            error: 'Something went wrong'
        });
    }
    const jwtBearerToken = req.cookies['SESSIONID'];
    try {
        const decoded = AuthController.authenticate(jwtBearerToken);
        console.log(decoded);
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