import React from "react";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AllMovies from "../../components/Admin/AllMovies";

const AllMoviePage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={3} />
          </div>
          <AllMovies />
        </div>
      </div>
    </div>
  );
};

export default AllMoviePage;
