import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { getAllReservations } from "../redux/action/reservationAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";

const TicketPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [reservationId, setReservationId] = useState(null);

  const {
    movieName,
    theaterName,
    showDate,
    selectedShowtime,
    selectedHall,
    selectedSeats,
    totalTicketPrice,
  } = location.state || {};

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  useEffect(() => {
    const matchedReservation = reservations.find((reservation) => {
      const match =
        reservation.movieName === movieName &&
        reservation.theaterName === theaterName &&
        reservation.showDate === showDate &&
        reservation.selectedShowtime === selectedShowtime &&
        parseInt(reservation.selectedHall) === parseInt(selectedHall) &&
        JSON.stringify(reservation.selectedSeats) ===
          JSON.stringify(selectedSeats);

      return match;
    });

    if (matchedReservation) {
      setReservationId(matchedReservation._id);
    }
  }, [
    reservations,
    movieName,
    theaterName,
    showDate,
    selectedShowtime,
    selectedHall,
    selectedSeats,
    totalTicketPrice,
  ]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Add background color
    doc.setFillColor("#000000");
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );

    // Add content to the PDF
    doc.setTextColor("#FFFFFF");
    doc.addImage(logo, "PNG", 10, 5, 30, 30);

    // Title with larger font size
    doc.setFontSize(24);
    doc.text("Your Ticket", 80, 20);

    doc.setDrawColor("#FFFFFF");
    doc.line(10, 30, doc.internal.pageSize.width - 10, 30);

    doc.setFontSize(15);
    doc.text(`Ticket NO: ${reservationId}`, 10, 40);
    doc.text(`Movie Name: ${movieName}`, 10, 50);
    doc.text(`Theater Name: ${theaterName}`, 10, 60);
    doc.text(`Show Date: ${showDate}`, 10, 70);
    doc.text(`Show Time: ${selectedShowtime}`, 10, 80);
    doc.text(`Hall No: ${selectedHall}`, 10, 90);
    doc.text(`Seat No: ${selectedSeats.join(", ")}`, 10, 100);
    doc.text(`Ticket Price: ${totalTicketPrice}`, 10, 110);

    // Save the PDF
    doc.save("Ticket.pdf");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex-shrink-0 w-[90%] 800px:w-[30%] bg-black  shadow h-[80vh] rounded-[4px] p-3 ">
          <div className="flex border-b border-white ">
            <img src={logo} alt="logo" className="w-[100px] mt-2" />

            <p className=" text-[35px] text-white ml-[30px] 800px:ml-[80px]">
              Your Ticket
            </p>
          </div>
          <div className="mt-10">
            <p className="my-1 text-[20px]">Ticket NO : {reservationId}</p>
            <p className="my-1 text-[20px]">Movie Name : {movieName} </p>
            <p className="my-1 text-[20px]">Theater Name: {theaterName}</p>
            <p className="my-1 text-[20px]">Show Date : {showDate}</p>
            <p className="my-1 text-[20px]">Show Time : {selectedShowtime} </p>
            <p className="my-1 text-[20px]">Hall No : {selectedHall}</p>
            <p className="my-1 text-[20px]">
              Seat No : {selectedSeats.join(", ")}
            </p>
            <p className="my-1 text-[20px]">
              Ticket Price : {totalTicketPrice}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketPage;
