const mongoose = require('mongoose');
const User = require('../model/user');

const AuthController = require('./auth');
const ErrorController = require('./error');

async function isLoggedIn(cookies) {
    if (!cookies) {
        ErrorController.errorhandler(err);
        return false;
    }
    const jwtBearerToken = cookies['SESSIONID'];
    let decoded;
    try {
        decoded = AuthController.authenticate(jwtBearerToken);
        console.log(decoded);
    } catch (err) {
        console.error(err);
        return false;
    }

    const user = await User.findById(decoded['sub']).exec();

    if(user.secret_key !== decoded['secret_key']) {
        return false;
    }

    return decoded;
}

async function getUser(req, res) {
    const decoded = await isLoggedIn(req.cookies);
    if(!decoded) {
        res.send({
            error: 'Invalid Token.'
        });
        return;
    }

    const user = await User.findById(decoded['sub']);

    res.send({
        success: true,
        body: {
            username: user.username,
            points: user.points 
        }
    });
}

async function getLeaderboard(req, res) {
    if(!await isLoggedIn(req.cookies)) {
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
    getLeaderboard,
    isLoggedIn,
};