const mongoose = require('mongoose');

const RecipeContentSchema = mongoose.Schema({
  recipeOf: {
    type: mongoose.ObjectId,
    ref: 'Recipe'
  },
  ingredients: [
    {
        ingredient: {
            type: mongoose.ObjectId,
            ref: 'Ingredient'
        },
        amount: Number
    }
  ],
  instructionText: {
    type: Text,
    required: true
  }
});

module.exports = mongoose.model("RecipeContent", RecipeContentSchema);