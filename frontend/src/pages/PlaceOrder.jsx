import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function PlaceOrder() {
    const navigate = useNavigate()

    const [method, setMethod] = useState('cod')
    const [loadingPincode, setLoadingPincode] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const {
        cartItem,
        setCartItem,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(shopDataContext)

    const { serverUrl } = useContext(authDataContext)

    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'India',
        phone: ''
    }

    const [formData, setFormData] = useState(initialFormState)

    // -----------------------------
    // Razorpay Payment Handler
    // -----------------------------
    const initPay = (order, backendOrderId) => {
        if (!window.Razorpay) {
            alert('Razorpay SDK not loaded. Please refresh the page.')
            return
        }

        if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
            alert('Razorpay Key ID is missing.')
            console.error('VITE_RAZORPAY_KEY_ID is missing from frontend .env')
            return
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'OneCart',
            description: 'Order Payment',
            order_id: order.id,
            handler: async (response) => {
                try {
                    const verifyResponse = await axios.post(
                        `${serverUrl}/api/order/verifyRazorpay`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: backendOrderId
                        },
                        { withCredentials: true }
                    )

                    if (verifyResponse.data.success) {
                        setFormData(initialFormState)
                        setCartItem({})
                        navigate('/orders')
                    } else {
                        alert(verifyResponse.data.message || 'Payment verification failed.')
                    }
                } catch (error) {
                    console.error('Verification Error:', error)
                    alert(error.response?.data?.message || 'Payment verification failed.')
                }
            },
            modal: {
                ondismiss: function () {
                    console.log('Razorpay payment window closed.')
                }
            },
            theme: { color: '#000000' }
        }

        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
            console.error('Razorpay Payment Failed:', response.error)
            alert(response.error?.description || 'Payment failed.')
        })
        rzp.open()
    }

    // -----------------------------
    // Form Input Handler
    // -----------------------------
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // -----------------------------
    // Auto Fetch City / State with AbortController
    // -----------------------------
    useEffect(() => {
        const controller = new AbortController()

        const fetchLocationByPincode = async () => {
            if (formData.pinCode.length !== 6) return

            setLoadingPincode(true)
            try {
                const response = await fetch(
                    `https://api.postalpincode.in/pincode/${formData.pinCode}`,
                    { signal: controller.signal }
                )
                const data = await response.json()

                if (
                    data?.[0]?.Status === 'Success' &&
                    data[0].PostOffice?.length > 0
                ) {
                    const details = data[0].PostOffice[0]
                    setFormData(prev => ({
                        ...prev,
                        city: details.District,
                        state: details.State
                    }))
                } else {
                    alert('Invalid Pincode. Please enter a valid pincode.')
                    setFormData(prev => ({ ...prev, city: '', state: '' }))
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Pincode Error:', error)
                }
            } finally {
                setLoadingPincode(false)
            }
        }

        fetchLocationByPincode()

        return () => controller.abort()
    }, [formData.pinCode])

    // -----------------------------
    // Submit Order Handler
    // -----------------------------
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!cartItem || Object.keys(cartItem).length === 0) {
            alert('Your cart is empty!')
            navigate('/')
            return
        }

        setSubmitting(true)

        try {
            const orderItems = []
            for (const productId in cartItem) {
                for (const size in cartItem[productId]) {
                    const qty = cartItem[productId][size]
                    if (qty > 0) {
                        const product = products.find(p => p._id === productId)
                        if (product) {
                            orderItems.push({
                                ...product,
                                size,
                                quantity: qty
                            })
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                alert('No items to order.')
                setSubmitting(false)
                return
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            if (method === 'cod') {
                const result = await axios.post(
                    `${serverUrl}/api/order/placeorder`,
                    orderData,
                    { withCredentials: true }
                )
                if (result.data.success) {
                    setFormData(initialFormState)
                    setCartItem({})
                    navigate('/orders')
                } else {
                    alert(result.data.message || 'Failed to place order.')
                }
            } else if (method === 'razorpay') {
                const resultRazorpay = await axios.post(
                    `${serverUrl}/api/order/razorpay`,
                    orderData,
                    { withCredentials: true }
                )
                if (resultRazorpay.data.success) {
                    initPay(resultRazorpay.data.order, resultRazorpay.data.orderId)
                } else {
                    alert(resultRazorpay.data.message || 'Failed to initialize Razorpay payment.')
                }
            } else {
                alert('Select a payment method.')
            }
        } catch (error) {
            console.error('Order Submit Error:', error)
            alert(error.response?.data?.message || 'Order placing failed. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const inputStyle =
        "w-full border border-gray-200 bg-gray-50/50 rounded-xl py-2.5 px-4 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"

    return (
        <div className="bg-gray-50/30 min-h-screen py-8 sm:py-12 border-t">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={onSubmitHandler}
                    className="flex flex-col lg:flex-row justify-between items-start gap-8 xl:gap-12"
                >
                    {/* LEFT - DELIVERY INFORMATION */}
                    <div className="w-full lg:w-[480px] bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs flex-shrink-0">
                        <div className="mb-6 pb-3 border-b border-gray-100 flex items-center justify-between">
                            <Title text1="DELIVERY" text2="INFORMATION" />
                            <span className="text-xs font-medium text-gray-400">
                                Step 1 of 2
                            </span>
                        </div>

                        <div className="flex flex-col gap-3.5">
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={inputStyle}
                                    onChange={onChangeHandler}
                                    name="firstName"
                                    value={formData.firstName}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={inputStyle}
                                    onChange={onChangeHandler}
                                    name="lastName"
                                    value={formData.lastName}
                                    required
                                />
                            </div>

                            <input
                                type="email"
                                placeholder="Email Address"
                                className={inputStyle}
                                onChange={onChangeHandler}
                                name="email"
                                value={formData.email}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Street Address / Flat No."
                                className={inputStyle}
                                onChange={onChangeHandler}
                                name="street"
                                value={formData.street}
                                required
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Pincode"
                                        className={inputStyle}
                                        onChange={onChangeHandler}
                                        name="pinCode"
                                        value={formData.pinCode}
                                        maxLength={6}
                                        required
                                    />
                                    {loadingPincode && (
                                        <span className="absolute right-2.5 top-3 text-[10px] text-blue-600 animate-pulse font-semibold bg-white px-1">
                                            Fetching...
                                        </span>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Country"
                                    className={`${inputStyle} cursor-not-allowed text-gray-500`}
                                    name="country"
                                    value={formData.country}
                                    readOnly
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="City / District"
                                    className={inputStyle}
                                    onChange={onChangeHandler}
                                    name="city"
                                    value={formData.city}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    className={inputStyle}
                                    onChange={onChangeHandler}
                                    name="state"
                                    value={formData.state}
                                    required
                                />
                            </div>

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className={inputStyle}
                                onChange={onChangeHandler}
                                name="phone"
                                value={formData.phone}
                                required
                            />
                        </div>
                    </div>

                    {/* RIGHT - CART TOTAL + PAYMENT */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6 lg:sticky lg:top-20">
                        <CartTotal />

                        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs">
                            <div className="mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                                <Title text1="PAYMENT" text2="METHOD" />
                                <span className="text-xs font-medium text-gray-400">
                                    Step 2 of 2
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div
                                    onClick={() => setMethod('razorpay')}
                                    className={`relative flex items-center justify-center p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-200 min-h-[54px] ${
                                        method === 'razorpay'
                                            ? 'border-black bg-black/[0.02]'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                                        alt="Razorpay"
                                        className="h-5 object-contain"
                                    />
                                </div>

                                <div
                                    onClick={() => setMethod('cod')}
                                    className={`relative flex items-center justify-center p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-200 min-h-[54px] ${
                                        method === 'cod'
                                            ? 'border-black bg-black/[0.02]'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <span className="text-xs font-bold">
                                        CASH ON DELIVERY
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-all shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {submitting ? 'Placing Order...' : 'Place Order Now'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder