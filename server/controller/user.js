const mongoose = require('mongoose');
const User = require('../model/user');
const Recipe = require('../model/recipe');
const RecipeContent = require('../model/recipeContent');

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

async function getRecipes(req, res) {
    const decoded = await isLoggedIn(req.cookies);

    if(!decoded) {
        res.send({
            error: 'Invalid Token'
        });
        return;
    }

    if(req.query.all)
    {
        let recipes;
        try {
            recipes = await Recipe.aggregate([
                // Stage 0: Get Creator for recipe
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy.$id',
                        foreignField: '_id',
                        as: 'creator'
                    }
                },
                // Stage 1: Decompose
                {
                    $unwind: '$creator'
                },
                // Stage 2: Only match public recipes
                {
                    $match: {
                        visibility: true
                    }
                },
                // Stage 3: Set to only return fields 
                // title, difficulty, duration, likes, 
                // visibility and Creator
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        difficulty: 1,
                        duration: 1,
                        likes: 1,
                        'creator.username': 1
                    }
                },
            ]);
        } catch (err) {
            ErrorController.errorhandler(err, req, res);
            return;
        }
        console.log(recipes);

        res.send({
            success: true,
            body: {
                recipes: recipes
            }
        });
        return;
    }

    Recipe.find({'createdBy.$id': mongoose.Types.ObjectId(decoded['sub'])}, (err, recipes) => {
        if (err) {
            ErrorController.errorhandler(err, req, res);
            return;
        }
        if(recipes.length === 0) {
            res.send({
                error: "Recipes not found"
            });
            return;
        }
        console.log(recipes);
        res.send({
            success: true,
            body: {
                recipes: recipes
            }
        });
    });

}

async function getRecipeContent(req, res) {
    const decoded = await isLoggedIn(req.cookies);

    if(!decoded) {
        res.send({
            error: 'Invalid Token'
        });
        return;
    }

    const rid = String(req.params.recipe_id) || "";
    console.log(rid);
    
    let recipeContents;
    try {
        recipeContents = await RecipeContent.aggregate([
            // Stage 0: Match recipe
            {
                $match: {
                    'recipeOf.$id': mongoose.Types.ObjectId(rid)
                }
            },
            // Stage 1: Get recipe content
            {
                $lookup: {
                    from: 'recipes',
                    localField: 'recipeOf.$id',
                    foreignField: '_id',
                    as: 'recipe'
                }
            },
            {
                $unwind: '$recipe'
            },
            // Stage 2 : Get Creator for recipe
            {
                $lookup: {
                    from: 'users',
                    localField: 'recipe.createdBy.$id',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            {
                $unwind: '$creator'
            },
            {
                $project: {
                    _id: 1,
                    ingredients: 1,
                    instructionText: 1,
                    'recipe.title': 1,
                    'recipe.duration': 1,
                    'recipe.difficulty': 1,
                    'recipe.visibility': 1,
                    'creator.username': 1
                }
            }
              
        ]);
    } catch (err) {
        ErrorController.errorhandler(err, req, res);
        return;
    }
    console.log(recipeContents);

    res.send({
        success: true,
        body: {
            recipeContents: recipeContents
        }
    });

}

module.exports = { 
    getUser,
    getLeaderboard,
    getRecipes,
    getRecipeContent
};