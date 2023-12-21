import React from "react";
import AllReservation from "../../components/Admin/AllReservation";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import DashboardHeader from "../../components/Admin/DashboardHeader";

const AllReservationPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={6} />
          </div>
          <AllReservation />
        </div>
      </div>
    </div>
  );
};

export default AllReservationPage;
