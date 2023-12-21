import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "../Loader/Loader";
import { deleteUser, getAllUsers } from "../../redux/action/userAction";
import { server } from "../../server";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${server}/user/users`);
        const data = await response.json();
        setUsers(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleDelete = (userID) => {
    setUserID(userID);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting user:", userID);
    dispatch(deleteUser(userID));
    setOpen(false);
    toast.success("User deleted successfully");
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
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add header: Movie Report
    doc.setFontSize(16);
    doc.text("User Report", 14, 10);

    // Add "Report Generated Date"
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated Date: ${currentDate}`, 130, 10);

    // Add table content using autoTable
    doc.autoTable({
      head: [["Username", "Email", "Role", "Joined At"]],
      body: rowsWithUniqueId.map((row) => [
        row.name,
        row.email,
        row.role,
        row.createdAt,
      ]),
    });

    // Save the PDF
    doc.save("Users Report.pdf");
  };

  const columns = [
    { field: "name", headerName: "Username", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.7 },
    { field: "role", headerName: "Role", minWidth: 150, flex: 0.7 },
    {
      field: "createdAt",
      headerName: "Joined At",
      minWidth: 130,
      flex: 0.1,
    },
    {
      field: "deleteButton",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add unique id to each row based on _id
  const rowsWithUniqueId = filteredUsers.map((row) => ({
    id: row._id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: formatDate(row.createdAt),
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full pt-5">
          <div className="w-[97%]">
            <h3 className="text-[40px] font-Poppins pb-2 text-black">
              All Users
            </h3>
            <TextField
              id="standard-basic"
              label="Search by Username"
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
                  Are you sure you wanna delete this user?
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

export default AllUsers;
