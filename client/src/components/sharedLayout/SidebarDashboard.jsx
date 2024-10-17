import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { links } from "../../utils/links";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const SidebarDashboard = () => {
  const location = useLocation();
  const user = getUserFromLocalStorage();

  return (
    <section className="bg-[#363636]">
      <div
        className={`bg-[#363636] min-h-screen  ${
          open ? "w-64" : "w-16"
        } duration-500 text-white px-4`}
      >
        <div className="mt-4 flex flex-col gap-4 relative">
          <div className="flex flex-col items-center gap-1.5 p-2">
          <FaUserCircle size={100} className="text-white" />
            <h2
              className={`text-center text-xl duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {user.name}
            </h2>
            <h2
              className={`text-center text-xm duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {user.email}
            </h2>
          </div>
          <hr className="border-white my-4" />
          {links?.map((menu, i) => (
            <Link
              to={menu?.path}
              key={i}
              className={`${
                menu?.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#6e776e] rounded-md ${
                location.pathname === menu?.path ? "bg-[#5A7458]" : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.text}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-gray font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.text}
              </h2>
            </Link>
          ))}
          <hr className="border-white my-4" />
        </div>
      </div>
    </section>
  );
};

export default SidebarDashboard;
