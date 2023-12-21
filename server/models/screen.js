const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  showtimes: [{ type: String, required: true }],
  theaterName: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  screenDate: {
    type: Date,
    required: true,
  },
});

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
