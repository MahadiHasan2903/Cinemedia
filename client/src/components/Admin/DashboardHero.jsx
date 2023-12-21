import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import {
  MdBorderClear,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllReservations } from "../../redux/action/reservationAction";
import AllReservation from "./AllReservation";

const DashboardHero = () => {
  const movies = useSelector((state) => state.movies.movies);
  const screens = useSelector((state) => state.screens.screens);

  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  // Calculate the total ticket price
  const adminTotalIncome = reservations.reduce((total, reservation) => {
    console.log(reservation.totalTicketPrice);
    return total + reservation.totalTicketPrice;
  }, 0);

  console.log(adminTotalIncome);

  return (
    <div className="w-full p-4">
      <h3 className="text-[40px] font-Poppins pb-2 text-black">Overview</h3>
      <div className="items-center justify-between block w-full 800px:flex">
        <div className="w-full mb-4 800px:w-[30%]  min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center ">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={` font-Roboto text-[#333] !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Earning
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-black">
            {adminTotalIncome} BDT
          </h5>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`font-Roboto text-[#333] !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Screens
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-black">
            {screens && screens.length}
          </h5>
          <Link to="/dashboard-screens">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Screens</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineProductionQuantityLimits
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={` font-Roboto text-[#333] !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Movies
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500] text-black">
            {movies && movies.length}
          </h5>
          <Link to="/dashboard-movies">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Movies</h5>
          </Link>
        </div>
      </div>

      <br />
      <div className="w-full min-h-[45vh] bg-white rounded">
        <AllReservation />
      </div>
    </div>
  );
};

export default DashboardHero;
