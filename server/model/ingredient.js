const mongoose = require('mongoose');

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);