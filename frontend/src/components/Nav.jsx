import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { MdHome, MdOutlineCollections, MdContacts } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext.jsx";

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);

  const {
    showSearch,
    setShowSearch,
    search,
    setSearch, 
    getCartCount
  } = useContext(shopDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Outside click to close search bar & profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search on close
  useEffect(() => {
    if (!showSearch) {
      setSearch("");
    }
  }, [showSearch]);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black font-bold text-sm border-b-2 border-black pb-1 transition"
      : "text-neutral-500 hover:text-black font-semibold text-sm pb-1 transition";

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      await getCurrentUser();
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Search Submit Handler
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/collections?search=${encodeURIComponent(search.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* Top Header Navbar Container */}
      <div 
        ref={searchRef} 
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-200"
      >
        {/* Navbar Main Header */}
        <nav className="px-3 sm:px-6 lg:px-8 py-3.5 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-xl flex items-center justify-center shadow-xs">
              <img
                src={Logo}
                alt="OneCart"
                className="w-4 h-4 sm:w-5 sm:h-5 invert"
              />
            </div>

            <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-gray-900">
              OneCart
            </span>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            {/* Search Toggle Button */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-700 hover:text-black"
              onClick={() => {
                setShowSearch((prev) => !prev);
                setShowProfile(false);
                navigate("/collections")
              }}
              aria-label="Toggle Search"
            >
              {showSearch ? (
                <IoCloseOutline size={22} />
              ) : (
                <IoSearchOutline size={22} />
              )}
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative">
              <button
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold uppercase cursor-pointer hover:scale-105 transition shadow-xs"
                onClick={() => {
                  setShowProfile((prev) => !prev);
                  setShowSearch(false);
                }}
                aria-label="User Profile"
              >
                {userData ? (
                  userData.name.charAt(0)
                ) : (
                  <CgProfile size={18} />
                )}
              </button>

              {/* Profile Menu Popup */}
              {showProfile && (
                <div className="absolute top-full right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {userData ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-gray-800 text-sm truncate">{userData.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {userData.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/orders");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>📦</span> My Orders
                      </button>

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>👤</span> My Profile
                      </button>

                      <button
                        onClick={() => {
                          navigate("/about");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>📔</span> About
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2 transition"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-gray-800 text-sm">Welcome</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Please login to continue
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/login");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>🔑</span> Login
                      </button>

                      <button
                        onClick={() => {
                          navigate("/signup");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>✨</span> Sign Up
                      </button>

                      <button
                        onClick={() => {
                          navigate("/about");
                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                      >
                        <span>📔</span> About
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Cart Button */}
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full text-gray-700 hover:text-black transition cursor-pointer hidden md:flex items-center justify-center"
              onClick={() => {
                if (!userData) {
                  navigate("/login");
                } else {
                  navigate("/cart");
                }
              }}
              aria-label="Shopping Cart"
            >
              <PiShoppingCartBold size={22} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-xs">
                {getCartCount ? getCartCount() : 0}
              </span>
            </button>
          </div>
        </nav>

        {/* Accordion Search Bar Inside Sticky Header */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showSearch
              ? "grid-rows-[1fr] opacity-100 pb-3"
              : "grid-rows-[0fr] opacity-0 pb-0"
          }`}
        >
          <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto relative flex items-center">
              <IoSearchOutline className="absolute left-4 text-gray-400" size={18} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-gray-100/90 focus:bg-white border border-gray-200 focus:border-black rounded-full pl-11 pr-10 py-2 sm:py-2.5 text-sm outline-none transition-all shadow-inner"
                autoFocus={showSearch}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 text-gray-400 hover:text-black p-1"
                >
                  <IoCloseOutline size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="grid grid-cols-4 h-[60px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <MdHome size={22} />
            <span className="text-[10px]">Home</span>
          </NavLink>

          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <MdOutlineCollections size={22} />
            <span className="text-[10px]">Collections</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <MdContacts size={22} />
            <span className="text-[10px]">Contact</span>
          </NavLink>

          <NavLink
            to={userData ? "/cart" : "/login"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            <div className="relative">
              <PiShoppingCartBold size={22} />
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {getCartCount ? getCartCount() : 0}
              </span>
            </div>

            <span className="text-[10px]">Cart</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Nav;