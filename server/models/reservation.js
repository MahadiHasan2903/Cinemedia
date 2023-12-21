const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    theaterName: {
      type: String,
      required: true,
    },
    showDate: {
      type: Date,
      required: true,
    },
    selectedShowtime: {
      type: String,
      required: true,
    },
    selectedHall: {
      type: String,
      required: true,
    },
    selectedSeats: {
      type: [String],
      required: true,
    },
    totalTicketPrice: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
