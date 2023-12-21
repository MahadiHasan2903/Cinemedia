import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies, deleteMovie } from "../../redux/action/movieAction";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const [open, setOpen] = useState(false);
  const [movieID, setMovieId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const handleDelete = (movieID) => {
    setMovieId(movieID);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMovie(movieID));
    setOpen(false);
    toast.success("Movie deleted successfully");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add header: Movie Report
    doc.setFontSize(16);
    doc.text("Movie Report", 14, 10);

    // Add "Report Generated Date"
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated Date: ${currentDate}`, 130, 10);

    // Add table content using autoTable
    doc.autoTable({
      head: [["Title", "Genre", "Duration", "Ratings"]],
      body: rowsWithUniqueId.map((row) => [
        row.title,
        row.genre,
        row.duration,
        row.ratings,
      ]),
    });

    // Save the PDF
    doc.save("Movies Report.pdf");
  };

  const columns = [
    { field: "title", headerName: "Title", minWidth: 130, flex: 0.7 },
    { field: "ratings", headerName: "IMDB rating", minWidth: 150, flex: 0.7 },
    { field: "genre", headerName: "Genre", minWidth: 150, flex: 0.7 },
    {
      field: "duration",
      headerName: "Duration (Hour)",
      type: "number",
      minWidth: 130,
      flex: 0.1,
    },
    {
      field: "deleteButton",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Movie",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add unique id to each row based on _id
  const rowsWithUniqueId = filteredMovies.map((row) => ({
    id: row._id,
    title: row.title,
    duration: row.duration,
    genre: row.genre,
    ratings: row.ratings,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full pt-5">
          <div className="w-[97%]">
            <h3 className="text-[40px] font-Poppins pb-2 text-black">
              All Movies
            </h3>
            <TextField
              id="standard-basic"
              label="Search by Movie Title"
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
                  Are you sure you wanna delete this movie?
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

export default AllMovies;
