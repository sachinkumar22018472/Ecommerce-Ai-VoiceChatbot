import React, { useState, useContext, useEffect } from 'react'
import Nav from '../componenet/Nav'
import Sidebar from '../componenet/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const { serverUrl } = useContext(authDataContext)

  // Fetch all products
  const fetchList = async () => {
    try {
      setLoading(true)
      const result = await axios.get(`${serverUrl}/api/product/list`)
      
      // Handle both formats: Array directly OR { success: true, products: [...] }
      if (Array.isArray(result.data)) {
        setList(result.data)
      } else if (result.data?.products) {
        setList(result.data.products)
      } else {
        setList([])
      }
    } catch (error) {
      console.error("Fetch Products Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Remove a product
  const removeList = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      )

      if (result.data) {
        fetchList()
      } else {
        alert("Failed to remove product")
      }
    } catch (error) {
      console.error("Remove Product Error:", error)
      alert(error.response?.data?.message || "Failed to remove product")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Nav />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Products List
            </h1>
            <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              Total: {list.length}
            </span>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Table Header - Visible on Medium & Above Screens */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
              <span className="col-span-2">Image</span>
              <span className="col-span-4">Name</span>
              <span className="col-span-2">Category</span>
              <span className="col-span-2">Price</span>
              <span className="col-span-2 text-center font-bold">Action</span>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm">Loading products...</p>
              </div>
            ) : list?.length > 0 ? (
              /* Product List Rows */
              <div className="divide-y divide-gray-100">
                {list.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-0 p-4 items-center hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Image & Mobile Header */}
                    <div className="col-span-2 flex items-center gap-3 w-full md:w-auto">
                      <img
                        src={item.image1 || 'https://via.placeholder.com/80?text=No+Image'}
                        alt={item.name}
                        className="w-16 h-16 sm:w-14 sm:h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      />
                      {/* Mobile title only */}
                      <div className="md:hidden flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    {/* Name - Desktop */}
                    <div className="hidden md:block col-span-4 text-sm font-medium text-gray-800 pr-2">
                      {item.name}
                    </div>

                    {/* Category - Desktop */}
                    <div className="hidden md:block col-span-2 text-sm text-gray-600">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Price & Action Row for Mobile / Columns for Desktop */}
                    <div className="col-span-2 flex justify-between md:justify-start items-center w-full md:w-auto">
                      <span className="md:hidden text-xs text-gray-400">Price:</span>
                      <span className="text-sm font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="col-span-2 flex justify-end md:justify-center items-center w-full md:w-auto pt-2 md:pt-0 border-t md:border-0 border-gray-100">
                      <button
                        onClick={() => removeList(item._id)}
                        title="Delete Product"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-800">No Products Available</h3>
                <p className="text-xs text-gray-500 mt-1">Start by adding new products from the sidebar menu.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Lists