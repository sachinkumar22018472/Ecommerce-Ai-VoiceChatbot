import React, { useState, useContext, useEffect } from 'react'
import Nav from '../componenet/Nav.jsx'
import Sidebar from '../componenet/Sidebar.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { SiEbox } from "react-icons/si"

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  // Subhi orders fetch karne ka function
  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/list',
        {},
        { withCredentials: true }
      )

     

      if (result.data.success) {
        setOrders([...result.data.orders].reverse())
      }

    } catch (error) {
      console.log("Error fetching orders:", error)
    }
  }
  // Admin order ka status update kar sakta hai
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        serverUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { withCredentials: true }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log("Error updating status:", error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        <div className='w-full p-4 sm:p-8'>
          <h3 className='text-xl font-bold mb-4'>All Orders List</h3>

          <div className='flex flex-col gap-4'>
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 p-5 rounded-lg text-sm text-gray-700 bg-white shadow-sm'
              >
                {/* Icon */}
                <SiEbox className='text-4xl text-blue-600 self-center justify-self-center' />

                {/* Items Information */}
                <div>
                  <div className='font-semibold mb-2'>
                    {order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return (
                          <span key={idx}>
                            {item.name.toUpperCase()} x {item.quantity}{' '}
                            <span className='text-xs text-gray-500'>({item.size})</span>
                          </span>
                        )
                      } else {
                        return (
                          <span key={idx}>
                            {item.name.toUpperCase()} x {item.quantity}{' '}
                            <span className='text-xs text-gray-500'>({item.size})</span>,{' '}
                          </span>
                        )
                      }
                    })}
                  </div>

                  {/* Customer Address Details */}
                  {order.address && (
                    <div className='text-xs text-gray-600 mt-2 space-y-0.5'>
                      <p className='font-bold text-gray-800'>
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <p>{order.address.street + ","}</p>
                      <p>
                        {order.address.city + ", " + order.address.state + ", " + order.address.country + " - " + order.address.zipcode}
                      </p>
                      <p className='font-medium text-gray-700 mt-1'>
                        Phone: {order.address.phone}
                      </p>
                    </div>
                  )}
                </div>

                {/* Order Details & Items Count */}
                <div>
                  <p className='font-medium'>Items: {order.items.length}</p>
                  <p className='mt-1'>Method: <span className='uppercase font-semibold'>{order.paymentMethod || 'COD'}</span></p>
                  <p>Payment: <span className={order.payment ? 'text-green-600 font-bold' : 'text-orange-500 font-bold'}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span></p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Total Price */}
                <div className='font-bold text-base self-center'>
                  ₹{order.amount}
                </div>

                {/* Order Status Selector */}
                <div className='self-center'>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className='p-2 font-semibold border border-gray-300 rounded bg-gray-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders