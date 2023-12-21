import React from "react";
import Header from "../../components/Header/Header";
import CreateMovie from "../../components/Admin/CreateMovie";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";
import DashboardHeader from "../../components/Admin/DashboardHeader";

const CreateMoviePage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="flex justify-center w-full">
          <CreateMovie />
        </div>
      </div>
    </div>
  );
};

export default CreateMoviePage;
