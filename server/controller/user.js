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

async function getLeaderboard(req, res) {
    if(!isLoggedIn(req.cookies)) {
        res.send({
            error: 'Invalid Token'
        });
        return;
    }


    const max = Number(req.query.max) || 10;

    let leaderboard;
    try {
        leaderboard = await User.aggregate([
            // Stage 0: Set to only return fields username and points
            {
                $project: {
                    _id: 0,
                    username: 1,
                    points: 1
                }
            },
            // Stage 1: Limit to 10 users
            {
                $limit: max
            },
            // Stage 2: Sort all matches user points descending
            {
                $sort: {
                    points: -1
                }
            }
        ]);
    } catch (err) {
        ErrorController.errorhandler(err, req, res);
        return;
    }

    console.log(leaderboard);

    res.send({
        success: true,
        body: {
            leaderboard: leaderboard
        }
    });
}

module.exports = { 
    getUser,
    getLeaderboard
};