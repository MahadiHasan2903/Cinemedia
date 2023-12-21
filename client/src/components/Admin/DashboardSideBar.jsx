import React from "react";
import { Link } from "react-router-dom";
import { BiSolidMovie, BiSolidSelectMultiple } from "react-icons/bi";
import { MdMovieEdit, MdTheaters } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { GiTheaterCurtains } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";

const dashboardSidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: RxDashboard,
  },
  {
    id: 2,
    title: "Create Movie",
    path: "/dashboard-create-movie",
    icon: MdMovieEdit,
  },
  {
    id: 3,
    title: "All Movies",
    path: "/dashboard-movies",
    icon: BiSolidMovie,
  },
  {
    id: 4,
    title: "Create Screen",
    path: "/dashboard-create-screen",
    icon: GiTheaterCurtains,
  },
  {
    id: 5,
    title: "All Screens",
    path: "/dashboard-screens",
    icon: MdTheaters,
  },
  {
    id: 6,
    title: "All Reservations",
    path: "/dashboard-reservations",
    icon: BiSolidSelectMultiple,
  },
  {
    id: 7,
    title: "All Users",
    path: "/dashboard-users",
    icon: HiUsers,
  },
];

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10 800px:pl-3 800px:pt-4">
      {dashboardSidebarItems.map((item) => (
        <div className="flex items-center w-full p-4" key={item.id}>
          <Link to={item.path} className="flex items-center w-full">
            {React.createElement(item.icon, {
              size: 30,
              color: active === item.id ? "#b64050" : "#555",
            })}
            <h5
              className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                active === item.id ? "text-[#b64050]" : "text-[#555]"
              }`}
            >
              {item.title}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
