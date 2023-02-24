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
        amount: {
          value: {
            type: Number,
            required: true
          },
          unit: {
            type: String,
            required: true
          }
        }
    }
  ],
  instructionText: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("RecipeContent", RecipeContentSchema, "recipeContents");