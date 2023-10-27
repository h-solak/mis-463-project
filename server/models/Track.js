const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  track_id: {
    type: String,
    required: false,
  },
  track_name: {
    type: String,
    required: false,
  },
  album_id: {
    type: String,
    required: false,
  },
  artist_id: {
    type: String,
    required: false,
  },
  release_date: {
    type: Date,
    required: false,
  },
  explicit: {
    type: Number,
    required: false,
  },
  time_signature: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  tempo: {
    type: Number,
    required: false,
  },
  key: {
    type: String,
    required: false,
  },
  mode: {
    type: Number,
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
  loudness: {
    type: Number,
    required: false,
  },
  speechiness: {
    type: Number,
    required: false,
  },
  acousticness: {
    type: Number,
    required: false,
  },
  instrumentalness: {
    type: Number,
    required: false,
  },
  liveness: {
    type: Number,
    required: false,
  },
  valence: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("tracks", TrackSchema);
