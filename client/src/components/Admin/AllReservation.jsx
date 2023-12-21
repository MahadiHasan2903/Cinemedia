import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import {
  deleteReservation,
  getAllReservations,
} from "../../redux/action/reservationAction";
import TextField from "@mui/material/TextField";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const isLoading = useSelector((state) => state.reservations.isLoading);
  const [open, setOpen] = useState(false);
  const [reservationID, setReservationID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  console.log(reservations);
  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  const handleDelete = (reservationID) => {
    setReservationID(reservationID);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteReservation(reservationID));
    setOpen(false);
    toast.success("Reservation deleted successfully");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add header: Movie Report
    doc.setFontSize(16);
    doc.text("Reservation Report", 14, 10);

    // Add "Report Generated Date"
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated Date: ${currentDate}`, 130, 10);
    // Add table content
    doc.autoTable({
      head: [
        [
          "Ticket No",
          "Movie",
          "Theater",
          "Show Time",
          "Show Date",
          "Hall No",
          "Seat No",
        ],
      ],
      body: rowsWithUniqueId.map((row) => [
        row.id,
        row.movieName,
        row.theaterName,
        row.selectedShowtime,
        row.showDate,
        row.selectedHall,
        row.selectedSeats.join(", "),
      ]),
    });

    // Save the PDF
    doc.save("reservations.pdf");
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const columns = [
    { field: "id", headerName: "Ticket No", minWidth: 150, flex: 0.7 },
    { field: "movieName", headerName: "Movie", minWidth: 130, flex: 0.7 },
    { field: "theaterName", headerName: "Theater", minWidth: 150, flex: 0.7 },
    {
      field: "selectedShowtime",
      headerName: "Show Time",
      minWidth: 150,
      flex: 0.7,
    },
    { field: "showDate", headerName: "Show Date", minWidth: 130, flex: 0.1 },
    { field: "selectedHall", headerName: "Hall No", minWidth: 130, flex: 0.1 },
    { field: "selectedSeats", headerName: "Seat No", minWidth: 130, flex: 0.1 },
    {
      field: "deleteButton",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Reservation",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const filteredRows = reservations.filter((item) =>
    item._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowsWithUniqueId = filteredRows.map((row) => ({
    id: row._id,
    movieName: row.movieName,
    theaterName: row.theaterName,
    showDate: formatDate(row.showDate),
    selectedShowtime: row.selectedShowtime,
    selectedHall: row.selectedHall,
    selectedSeats: row.selectedSeats,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full pt-5">
          <div className="w-[97%]">
            <h3 className="text-[40px] font-Poppins pb-2 text-black">
              All Reservation
            </h3>
            <TextField
              id="standard-basic"
              label="Search by Reservation ID"
              variant="outlined"
              margin="normal"
              className="w-[83%] 800px:w-[50%]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="w-[80%] 800px:w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={rowsWithUniqueId}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
              <div className="flex items-center justify-center mt-5 mr-5 800px:mr-2 800px:justify-end ">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadPDF}
                >
                  Download Report
                </Button>
              </div>
            </div>
          </div>
          {open && (
            <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
              <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="flex justify-end w-full cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                  Are you sure you wanna delete this booked reservation?
                </h3>
                <div className="flex items-center justify-center w-full">
                  <div
                    className={`w-[150px] bg-black  my-3 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[#56D2C4] !hover:text-[#000000] transition duration-300 mt-5 text-white text-[18px] !h-[42px] mr-4`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`w-[150px] bg-black  my-3 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[#56D2C4] !hover:text-[#000000] transition duration-300 mt-5 text-white text-[18px] !h-[42px] ml-4`}
                    onClick={handleConfirmDelete}
                  >
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllReservation;
