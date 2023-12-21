import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { deleteScreen, getAllScreens } from "../../redux/action/screenAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import TextField from "@mui/material/TextField";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllScreens = () => {
  const dispatch = useDispatch();
  const screens = useSelector((state) => state.screens.screens);
  const isLoading = useSelector((state) => state.screens.isLoading);
  const [open, setOpen] = useState(false);
  const [screenId, setScreenId] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    dispatch(getAllScreens());
  }, [dispatch]);

  const handleDelete = (screenId) => {
    setScreenId(screenId);
    setOpen(true);
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

  const handleConfirmDelete = () => {
    dispatch(deleteScreen(screenId));
    setOpen(false);
    toast.success("Screen deleted successfully");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add header: Screen Report
    doc.setFontSize(16);
    doc.text("Screen Report", 14, 10);

    // Add "Report Generated Date"
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated Date: ${currentDate}`, 130, 10);

    // Add table content
    doc.autoTable({
      head: [
        [
          "Name",
          "Theater",
          "Hall",
          "Ticket Price",
          "Total Seats",
          "Screen Date",
          "Show Times",
        ],
      ],
      body: rows.map((row) => [
        row.name,
        row.theaterName,
        row.hall,
        row.ticketPrice,
        row.seats,
        row.screenDate,
        row.showtimes,
      ]),
    });

    // Save the PDF
    doc.save("screens.pdf");
  };

  const columns = [
    {
      minWidth: 130,
      field: "name",
      headerName: "Movie Title",
      flex: 0.7,
    },
    {
      field: "theaterName",
      minWidth: 130,
      headerName: "Theater Name",
      flex: 0.7,
    },

    {
      field: "hall",
      type: "number",
      minWidth: 140,
      headerName: "Hall",
      flex: 0.8,
    },
    {
      field: "ticketPrice",
      minWidth: 130,
      headerName: "Ticket Price",
      flex: 0.7,
    },

    {
      field: "seats",
      minWidth: 130,
      headerName: "Total Seats",
      flex: 0.7,
    },
    { field: "screenDate", headerName: "Screen Date", flex: 0.7 },

    {
      field: "showtimes",
      minWidth: 130,
      headerName: "Show Times",
      type: "text",
      flex: 0.7,
    },

    {
      field: " ",
      headerName: "Delete Screen",
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

  const flattenedScreens = screens.flatMap((screen) => {
    const movieNames = Array.isArray(screen.movies)
      ? screen.movies.map((movie) => movie.name)
      : [];
    return [{ ...screen, movieNames }];
  });

  const combinedFilteredScreens = flattenedScreens.filter((screen) => {
    const searchTerm = filterTerm.toLowerCase();
    const theaterNameMatch = screen.theaterName
      .toLowerCase()
      .includes(searchTerm);
    const movieNameMatch = screen.movieNames.some((name) =>
      name.toLowerCase().includes(searchTerm)
    );

    return theaterNameMatch || movieNameMatch;
  });

  const rows = combinedFilteredScreens.map((screen) => ({
    id: screen._id,
    name: screen.name,
    theaterName: screen.theaterName,
    hall: screen.hall,
    ticketPrice: screen.ticketPrice,
    seats: screen.seats,
    screenDate: formatDate(screen.screenDate),
    showtimes: screen.showtimes.join(", "),
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full pt-5">
          <div className="w-[97%]">
            <h3 className="text-[40px] font-Poppins pb-2 text-black">
              All Screens
            </h3>
            <TextField
              id="standard-basic"
              label="Search by Theater Name"
              variant="outlined"
              margin="normal"
              className="w-[83%] 800px:w-[50%]"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <div className="w-[80%] 800px:w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={rows}
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
                  Are you sure you wanna delete this screen?
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

export default AllScreens;
