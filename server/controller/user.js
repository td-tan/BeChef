const User = require('../model/user');

const AuthController = require('./auth');
const ErrorController = require('./error');

function isLoggedIn(cookies) {
    if (!cookies) {
        ErrorController.errorhandler(err);
        return false;
    }
    const jwtBearerToken = cookies['SESSIONID'];

    try {
        const decoded = AuthController.authenticate(jwtBearerToken);
        console.log(decoded);
        return decoded['sub'];
    } catch (err) {
        console.error(err);
    }
    return false;
}

function getUser(req, res) {
    const id = isLoggedIn(req.cookies);

    if(!id) {
        res.send({
            error: 'Invalid Token'
        });
        return;
    }

    User.findById(id, (err, user) => {
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
            success: true,
            body: {
                username: user.username,
                points: user.points 
            }
        });
    });
}

module.exports = { 
    getUser
};