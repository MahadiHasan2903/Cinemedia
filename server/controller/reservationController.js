const Reservation = require("../models/reservation");
const format = require("date-fns/format");

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const {
      movieName,
      theaterName,
      showDate,
      selectedShowtime,
      selectedHall,
      selectedSeats,
      totalTicketPrice,
      paymentInfo,
    } = req.body;

    const newReservation = new Reservation({
      movieName,
      theaterName,
      showDate,
      selectedShowtime,
      selectedHall,
      selectedSeats,
      totalTicketPrice,
      paymentInfo,
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation Created Successfully",
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    // Format the showDate field for each reservation
    const formattedReservations = reservations.map((reservation) => ({
      ...reservation.toObject(),
      showDate: format(new Date(reservation.showDate), "MMMM dd, yyyy"), // Format the date
    }));

    res.status(200).json({
      success: true,
      reservations: formattedReservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reservations",
    });
  }
};

// Get reservation by ID
const getSingleReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reservation",
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    await Reservation.findByIdAndDelete(reservationId);

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting reservation",
    });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getSingleReservation,
  deleteReservation,
};
