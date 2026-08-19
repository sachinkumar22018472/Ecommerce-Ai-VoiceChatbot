import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { products, currency, cartItem, updatedQuantity } = useContext(shopDataContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    // Transform hierarchical cartItem object into flat array
    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItem[items][item],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItem, products]);

    // Empty Cart UI State
    if (cartData.length === 0) {
        return (
            <div className='border-t pt-16 max-w-6xl mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center text-center'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5 text-3xl shadow-inner'>
                    🛒
                </div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Your cart feels so light!</h2>
                <p className='text-gray-500 mb-6 max-w-md text-sm'>
                    Explore our collection and add your favorite items to your cart.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className='bg-black text-white px-8 py-3 text-xs font-semibold rounded-full hover:bg-gray-800 transition-all shadow-md tracking-wider uppercase'
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className='border-t pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24'>
            {/* Page Header */}
            <div className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-8'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* 2-Column Responsive Layout */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-start'>
                
                {/* LEFT SIDE: Cart Items List */}
                <div className='flex-1 w-full'>
                    {/* Header Row for Desktop */}
                    <div className='hidden sm:grid grid-cols-[4fr_1.5fr_1fr_0.5fr] text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-200'>
                        <span>Product</span>
                        <span className='text-center'>Quantity</span>
                        <span className='text-right'>Total</span>
                        <span className='text-right'>Action</span>
                    </div>

                    {/* Products Loop */}
                    <div className='divide-y divide-gray-100'>
                        {cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);

                            if (!productData) return null;

                            const itemImage = productData.image1 || (Array.isArray(productData.image) ? productData.image[0] : '');

                            return (
                                <div key={index} className='py-6 flex flex-col sm:grid sm:grid-cols-[4fr_1.5fr_1fr_0.5fr] items-center gap-4 group'>
                                    
                                    {/* Product Details */}
                                    <div className='flex items-center gap-4 w-full'>
                                        <div 
                                            onClick={() => navigate(`/product/${productData._id}`)}
                                            className='w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-gray-50 border rounded-lg overflow-hidden cursor-pointer'
                                        >
                                            <img 
                                                className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300' 
                                                src={itemImage} 
                                                alt={productData.name} 
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1 flex-1'>
                                            <h3 
                                                onClick={() => navigate(`/product/${productData._id}`)}
                                                className='text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 hover:text-black cursor-pointer'
                                            >
                                                {productData.name}
                                            </h3>
                                            <div className='flex items-center gap-3 text-xs sm:text-sm text-gray-500 mt-1'>
                                                <span className='font-bold text-gray-900'>{currency}{productData.price}</span>
                                                <span>•</span>
                                                <span className='bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide border border-gray-200'>
                                                    Size: {item.size}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Increment/Decrement Controls */}
                                    <div className='flex items-center justify-between sm:justify-center w-full sm:w-auto mt-2 sm:mt-0'>
                                        <span className='text-xs text-gray-400 sm:hidden font-medium'>Quantity:</span>
                                        <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm'>
                                            <button 
                                                onClick={() => updatedQuantity(item._id, item.size, item.quantity - 1)}
                                                className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors font-bold text-sm'
                                            >
                                                -
                                            </button>
                                            <span className='w-9 text-center text-xs sm:text-sm font-semibold text-gray-800'>
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => updatedQuantity(item._id, item.size, item.quantity + 1)}
                                                className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors font-bold text-sm'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Line Item Total Price */}
                                    <div className='hidden sm:block text-right font-bold text-gray-900 text-sm sm:text-base'>
                                        {currency}{(productData.price * item.quantity).toLocaleString()}
                                    </div>

                                    {/* Remove Button */}
                                    <div className='flex justify-end w-full sm:w-auto'>
                                        <button 
                                            onClick={() => updatedQuantity(item._id, item.size, 0)}
                                            className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all'
                                            title='Remove item'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDE: CartTotal + PROCEED TO CHECKOUT BUTTON */}
                <div className='w-full lg:w-[380px] xl:w-[420px] lg:sticky lg:top-24 flex-shrink-0 flex flex-col gap-5'>
                    <CartTotal itemCount={cartData.length} />

                    <button 
                        onClick={() => navigate('/placeorder')}
                        className='w-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase py-4 rounded-lg hover:bg-gray-800 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2'
                    >
                        <span>PROCEED TO CHECKOUT</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Cart;