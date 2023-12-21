import React from "react";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import AllScreens from "../../components/Admin/AllScreens";

const AllScreenPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={5} />
          </div>
          <AllScreens />
        </div>
      </div>
    </div>
  );
};

export default AllScreenPage;
