const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  track_id: {
    type: String,
    required: false,
  },
  danceability: {
    type: Number,
    required: false,
  },
  energy: {
    type: Number,
    required: false,
  },

  acousticness: {
    type: Number,
    required: false,
  },

  valence: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("tracks_to_vectorize", TrackSchema);
