import React from "react";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import DashboardHero from "../../components/Admin/DashboardHero";

const DashBoardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default DashBoardPage;
