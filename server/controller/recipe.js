const mongoose = require('mongoose');
const Recipe = require('../model/recipe');
const RecipeContent = require('../model/recipeContent');

const ErrorController = require('./error');
const UserController = require('./user');

async function getRecipes(req, res) {
    const decoded = await UserController.isLoggedIn(req.cookies);

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
    const decoded = await UserController.isLoggedIn(req.cookies);

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
    getRecipes,
    getRecipeContent
};