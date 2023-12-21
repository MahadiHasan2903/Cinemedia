import React from "react";

const Seat = ({ seat, isSelected, isReserved, onClick }) => (
  <div
    className={`text-black seat ${
      isSelected ? "bg-[#7eff34]" : isReserved ? "bg-[#ff0000]" : "bg-[#fff]"
    }`}
    onClick={onClick}
    style={{
      width: "40px",
      height: "40px",
      border: "1px solid black",
      padding: "5px",
      textAlign: "center",
      margin: "2px",
      cursor: isReserved ? "not-allowed" : "pointer",
      display: "inline-block",
      borderRadius: "5px",
    }}
  >
    {seat}
  </div>
);

const SeatBookingLayout = ({ selectedSeats, onSeatClick, reservedSeats }) => {
  const rows = "ABCDEFGHIJ";
  const columns = 10;

  const renderSeats = () => {
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowSeats = [];

      for (let j = 1; j <= columns; j++) {
        const seat = `${row}${j}`;
        const isSelected = selectedSeats.includes(seat);
        const isReserved = reservedSeats.includes(seat);

        rowSeats.push(
          <Seat
            key={seat}
            seat={seat}
            isSelected={isSelected}
            isReserved={isReserved}
            onClick={() => !isReserved && onSeatClick(seat)}
          />
        );
      }

      seats.push(
        <div key={row} className="row">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  return <div className="seat-booking-layout">{renderSeats()}</div>;
};

export default SeatBookingLayout;
