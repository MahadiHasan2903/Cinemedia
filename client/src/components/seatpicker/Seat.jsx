// Seat.js
import React, { useState } from "react";
import "./SeatPicker.css";

function Seat({ seatNumber, isSelected, onSelect }) {
  return (
    <div
      className={`seat ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(seatNumber)}
    >
      {seatNumber}
    </div>
  );
}

export default Seat;
