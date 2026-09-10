const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  coord: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model("Game", gameSchema);