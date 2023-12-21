import CreateScreen from "../../components/Admin/CreateScreen";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import DashboardSideBar from "../../components/Admin/DashboardSideBar";

const CreateScreenPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="flex justify-center w-full">
          <CreateScreen />
        </div>
      </div>
    </div>
  );
};

export default CreateScreenPage;
