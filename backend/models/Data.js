const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  winner: {
    type: String,
    required: true,
  },
  board: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Data", dataSchema);
