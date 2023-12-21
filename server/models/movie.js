const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  cast: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
