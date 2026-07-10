import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { MdHome } from "react-icons/md";
import { MdOutlineCollections } from "react-icons/md";
import { MdContacts } from "react-icons/md";

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext)

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false)

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showSearch) {
      setSearch("");
    }
  }, [showSearch])

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black font-bold text-sm border-b-2 border-black pb-1 transition"
      : "text-neutral-500 hover:text-black font-semibold text-sm pb-1 transition";


  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      await getCurrentUser()
      setShowProfile(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div ref={searchRef}>
      {/* Navbar */}
      <nav className="px-2 sm:px-4 lg:px-6 py-4 max-w-7xl mx-auto flex items-center justify-between bg-white sticky top-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-xl flex items-center justify-center">
            <img
              src={Logo}
              alt="OneCart"
              className="w-4 h-4 sm:w-5 sm:h-5 invert"
            />
          </div>

          <span className="text-lg sm:text-xl font-black uppercase tracking-tight">
            OneCart
          </span>
        </div>


        {/* Navigation */}
        <div className="hidden md:flex flex-1 justify-center gap-8 lg:gap-10 ml-14">
          {userData && (
            <>
              <NavLink to="/" className={linkStyle}>
                Home
              </NavLink>

              <NavLink to="/collections" className={linkStyle}>
                Collections
              </NavLink>

              <NavLink to="/about" className={linkStyle}>
                About
              </NavLink>

              <NavLink to="/contact" className={linkStyle}>
                Contact
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">

          {/* Search */}
          <button
            className="hover:text-black transition cursor-pointer"
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowProfile(false);
            }}
          >
            {showSearch ? (
              <IoCloseOutline size={22} />
            ) : (
              <IoSearchOutline size={22} />
            )}
          </button>

          {/* Profile */}
          {/* Profile */}
          <div className="relative">
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold uppercase cursor-pointer hover:scale-105 transition"
              onClick={() => {
                setShowProfile((prev) => !prev);
                setShowSearch(false);
              }}
            >
              {userData ? (
                userData.name.charAt(0)
              ) : (
                <CgProfile size={18} />
              )}
            </button>

            {showProfile && (
              <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">

                {userData ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{userData.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/orders");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      📦 My Orders
                    </button>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/about");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      📔 About
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">Welcome</p>
                      <p className="text-xs text-gray-500">
                        Please login to continue
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      🔑 Login
                    </button>

                    <button
                      onClick={() => {
                        navigate("/signup");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      ✨ Sign Up
                    </button>

                    <button
                      onClick={() => {
                        navigate("/about");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      📔 About
                    </button>
                  </>
                )}

              </div>
            )}
          </div>

          {/* Cart */}
          <button
            className="relative hover:text-black transition cursor-pointer"
            onClick={() => {
              if (!userData) {
                navigate("/login");
              } else {
                navigate("/cart");
              }
            }}
          >
            <PiShoppingCartBold size={22} className="hidden md:block" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 hidden md:block flex items-center justify-center">
              10
            </span>
          </button>

        </div>
      </nav>

      {/* Search Bar */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? "max-h-24 py-4" : "max-h-0 py-0"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-[60%] bg-gray-100 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-black"
          />
        </div>

      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="grid grid-cols-4 h-[65px]">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
              }`
            }
          >
            <MdHome size={22} />
            <span className="text-[11px]">Home</span>
          </NavLink>

          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
              }`
            }
          >
            <MdOutlineCollections size={22} />
            <span className="text-[11px]">Collections</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
              }`
            }
          >
            <MdContacts size={22} />
            <span className="text-[11px]">Contact</span>
          </NavLink>

          <NavLink
            to={userData ? "/cart" : "/login"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
              }`
            }
          >
            <div className="relative">
              <PiShoppingCartBold size={22} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                10
              </span>
            </div>

            <span className="text-[11px]">Cart</span>
          </NavLink>

        </div>
      </div>
    </div>
  );
}

export default Nav;