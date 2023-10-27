const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  genre_id: {
    type: Number,
    required: true,
  },
  genre_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Genre", GenreSchema);
