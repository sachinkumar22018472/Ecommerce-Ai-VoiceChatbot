import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";

function Nav() {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <img
              src={Logo}
              alt="OneCart"
              className="w-5 h-5 invert"
            />
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black uppercase">
              OneCart
            </h1>

            <span className="px-2 py-1 text-xs font-semibold bg-black text-white rounded-full">
              Admin
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        >
          <MdLogout size={20} />
          Logout
        </button>

      </nav>
    </header>
  );
}

export default Nav;