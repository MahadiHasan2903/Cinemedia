import React from "react";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import AllUsers from "../../components/Admin/AllUser";
import DashboardHeader from "../../components/Admin/DashboardHeader";

const AllUserPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={7} />
          </div>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AllUserPage;
