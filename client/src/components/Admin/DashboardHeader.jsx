import React from "react";
import logo from "../../assets/logo.png";
import { BiSolidMovie, BiSolidSelectMultiple } from "react-icons/bi";
import { MdTheaters } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <div className="w-full h-[110px] bg-black shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="w-[30%] 800px:w-40 logo ">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="!w-full 800px:w-40 800px:mx-5"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 ">
          <Link to="/dashboard" className="hidden 800px:block ">
            <RxDashboard
              color="#555"
              size={30}
              className="mx-5 text-white cursor-pointer"
              style={{ color: "white !important" }}
            />
          </Link>
          <Link to="/dashboard-movies" className="hidden 800px:block">
            <BiSolidMovie
              color="#555"
              size={30}
              className="mx-5 text-white cursor-pointer"
              style={{ color: "white !important" }}
            />
          </Link>
          <Link to="/dashboard-screens" className="hidden 800px:block ">
            <MdTheaters
              color="#555"
              size={30}
              className="mx-5 text-white cursor-pointer"
              style={{ color: "white !important" }}
            />
          </Link>
          <Link to="/dashboard-reservations" className="hidden 800px:block">
            <BiSolidSelectMultiple
              color="#555"
              size={30}
              className="mx-5 text-white cursor-pointer"
              style={{ color: "white !important" }}
            />
          </Link>
          <Link to="/dashboard-users" className="hidden 800px:block">
            <HiUsers
              color="#555"
              size={30}
              className="mx-5 text-white cursor-pointer"
              style={{ color: "white !important" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
