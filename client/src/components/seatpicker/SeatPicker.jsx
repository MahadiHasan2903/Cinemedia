// SeatPicker.js
import React, { useState } from "react";
import Seat from "./Seat";
import "./SeatPicker.css";

function SeatPicker() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const numRows = 5; // 5 rows
  const seatsPerRow = 10; // 10 seats per row
  const totalSeats = numRows * seatsPerRow;

  return (
    <div className="seat-picker">
      <h2>Pick your seat</h2>
      <div className="seat-grid">
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
              return (
                <Seat
                  key={seatNumber}
                  seatNumber={seatNumber}
                  isSelected={selectedSeats.includes(seatNumber)}
                  onSelect={handleSeatSelect}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatPicker;
