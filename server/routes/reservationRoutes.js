const express = require("express");
const router = express.Router();

const {
  createReservation,
  getAllReservations,
  getSingleReservation,
  deleteReservation,
} = require("../controller/reservationController");

router.post("/create-reservation", createReservation);

router.get("/get-all-reservations", getAllReservations);
router.get("/get-reservation/:id", getSingleReservation);
router.delete("/delete-reservation/:id", deleteReservation);

module.exports = router;
