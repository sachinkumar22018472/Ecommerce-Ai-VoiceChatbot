import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Orders() {
    const { currency } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)

    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(true)

    // Backend se User Orders Fetch karne ka Logic
    const loadOrderData = async () => {
        setLoading(true)
        try {
            const response = await axios.post(
                `${serverUrl}/api/order/userorders`, 
                {}, 
                { withCredentials: true }
            )

            if (response.data.success) {
                let allOrdersItem = []
                
                // Saare orders me se items extract karke ek flat array banana
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status || 'Order Placed'
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod || 'COD'
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })

                // Latest orders sabse upar dikhane ke liye reverse
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log("Orders fetch error:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    // Loading State UI
    if (loading) {
        return (
            <div className='border-t pt-16 min-h-[60vh] flex flex-col items-center justify-center gap-3'>
                <div className='w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                <p className='text-gray-500 text-sm font-medium'>Fetching your orders...</p>
            </div>
        )
    }

    // Empty Orders State UI
    if (orderData.length === 0) {
        return (
            <div className='border-t pt-16 max-w-6xl mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center text-center'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl shadow-inner'>
                    📦
                </div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>No orders found</h2>
                <p className='text-gray-500 mb-6 text-sm max-w-sm'>
                    You haven't placed any orders yet. Start exploring our collection!
                </p>
            </div>
        )
    }

    return (
        <div className='border-t pt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
            {/* Header Title */}
            <div className='text-2xl font-semibold mb-6'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            {/* Orders List */}
            <div className='flex flex-col gap-4'>
                {orderData.map((item, index) => {
                    // Safe Image Extraction Logic
                    const itemImage = item.image1 || (Array.isArray(item.image) ? item.image[0] : item.image)

                    return (
                        <div 
                            key={index} 
                            className='py-4 px-5 border border-gray-200 rounded-2xl bg-white shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                        >
                            {/* Product Info & Image */}
                            <div className='flex items-start gap-4 text-sm'>
                                <img 
                                    className='w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg border bg-gray-50 flex-shrink-0' 
                                    src={itemImage} 
                                    alt={item.name} 
                                />
                                <div className='flex flex-col gap-1'>
                                    <p className='sm:text-base font-semibold text-gray-900 line-clamp-1'>
                                        {item.name}
                                    </p>
                                    <div className='flex items-center gap-3 text-xs sm:text-sm text-gray-600 mt-1'>
                                        <span className='font-bold text-gray-900'>{currency}{item.price}</span>
                                        <span>•</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>•</span>
                                        <span className='bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold uppercase border'>
                                            Size: {item.size}
                                        </span>
                                    </div>
                                    <p className='mt-2 text-xs text-gray-400'>
                                        Date: <span className='text-gray-600 font-medium'>{new Date(item.date).toDateString()}</span>
                                    </p>
                                    <p className='text-xs text-gray-400'>
                                        Payment: <span className='text-gray-600 font-medium uppercase'>{item.paymentMethod}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Status & Track Order Action */}
                            <div className='md:w-1/2 flex justify-between items-center md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100'>
                                {/* Order Status Indicator */}
                                <div className='flex items-center gap-2'>
                                    <span className='w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse'></span>
                                    <p className='text-xs sm:text-sm font-medium text-gray-700'>
                                        {item.status}
                                    </p>
                                </div>

                                {/* Track / Refresh Order Button */}
                                <button 
                                    onClick={loadOrderData}
                                    className='border border-gray-300 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95'
                                >
                                    Track Order
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
