import React, { useState, useEffect, useContext } from "react";
import Nav from "../componenet/Nav";
import Sidebar from "../componenet/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCount = async () => {
  try {
    const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
   
    const productList = Array.isArray(products.data) ? products.data : products.data.products;
    setTotalProducts(productList?.length || 0);

    const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
    
    
    if (orders.data.success) {
      setTotalOrders(orders.data.orders.length);
    }
  } catch (error) {
    console.log("failed to fetch count", error);
  }
};

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-800">
      {/* Navbar */}
      <Nav />

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Welcome to OneCart Admin
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Manage products, orders, and inventory efficiently from your dashboard.
            </p>
          </div>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Products Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between transition-all hover:shadow-md">
              <div>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
                  Total Products
                </p>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                  {totalProducts}
                </h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between transition-all hover:shadow-md">
              <div>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500">
                  Total Orders
                </p>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                  {totalOrders}
                </h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;