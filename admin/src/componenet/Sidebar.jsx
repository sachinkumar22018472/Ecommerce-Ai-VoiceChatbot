import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsListStars } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";

function Sidebar() {
  const baseStyle =
    "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200";

  const activeStyle = `${baseStyle} bg-black text-white`;
  const inactiveStyle = `${baseStyle} text-gray-600 hover:bg-gray-100`;

  return (
    <>
      {/* Desktop Sidebar - Sticky position fixed during scroll */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 sticky top-[65px] h-[calc(100vh-65px)] p-4 shrink-0">
        <div className="flex flex-col gap-3">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <IoIosAddCircleOutline className="text-2xl" />
            <span>Add Items</span>
          </NavLink>

          <NavLink
            to="/lists"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <BsListStars className="text-xl" />
            <span>List Items</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <SiTicktick className="text-lg" />
            <span>View Orders</span>
          </NavLink>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-3">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 ${
                isActive ? "text-black font-bold" : "text-gray-500"
              }`
            }
          >
            <IoIosAddCircleOutline className="text-2xl" />
            <span className="text-xs">Add</span>
          </NavLink>

          <NavLink
            to="/lists"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 ${
                isActive ? "text-black font-bold" : "text-gray-500"
              }`
            }
          >
            <BsListStars className="text-xl" />
            <span className="text-xs">Lists</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 ${
                isActive ? "text-black font-bold" : "text-gray-500"
              }`
            }
          >
            <SiTicktick className="text-lg" />
            <span className="text-xs">Orders</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;