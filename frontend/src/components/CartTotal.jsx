import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal({ itemCount = 0 }) {
    const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

    const subtotal = getCartAmount();
    const shipping = subtotal === 0 ? 0 : delivery_fee;
    const totalAmount = subtotal === 0 ? 0 : subtotal + shipping;

    return (
        <div className='bg-gray-50/80 p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 pb-4 mb-6 flex items-center justify-between'>
                <div className='text-lg font-bold text-gray-900'>
                    <Title text1={'CART'} text2={'TOTALS'} />
                </div>
                {itemCount > 0 && (
                    <span className='text-xs text-gray-500 font-medium'>
                        ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                )}
            </div>

            {/* Price Breakdown */}
            <div className='space-y-3.5 text-sm text-gray-600 mb-6'>
                <div className='flex justify-between items-center'>
                    <span>Subtotal</span>
                    <span className='font-semibold text-gray-900'>
                        {currency}{subtotal.toLocaleString()}.00
                    </span>
                </div>
                
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-1.5'>
                        Shipping Fee
                        <span className='text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase'>
                            Standard
                        </span>
                    </span>
                    <span className='font-semibold text-gray-900'>
                        {shipping === 0 ? 'FREE' : `${currency}${shipping}.00`}
                    </span>
                </div>

                <div className='border-t border-dashed border-gray-300 pt-4 mt-4'>
                    <div className='flex justify-between items-baseline text-base font-bold text-gray-900'>
                        <span>Total Amount</span>
                        <span className='text-xl text-black'>
                            {currency}{totalAmount.toLocaleString()}.00
                        </span>
                    </div>
                    <p className='text-[11px] text-gray-400 text-right mt-1'>
                        Taxes included if applicable
                    </p>
                </div>
            </div>

            {/* Promo Code Input */}
            <div className='mb-6'>
                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        placeholder="PROMO CODE" 
                        className='flex-1 border border-gray-300 px-3 py-2 text-xs rounded-lg outline-none focus:border-black uppercase bg-white'
                    />
                    <button className='bg-gray-900 text-white hover:bg-black px-4 py-2 text-xs font-semibold rounded-lg transition-all'>
                        Apply
                    </button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className='pt-5 border-t border-gray-200 grid grid-cols-2 gap-2 text-center text-[11px] text-gray-500 font-medium'>
                <div className='flex items-center gap-1.5 justify-center bg-white p-2 rounded-lg border border-gray-100 shadow-2xs'>
                    🔒 Secure Payment
                </div>
                <div className='flex items-center gap-1.5 justify-center bg-white p-2 rounded-lg border border-gray-100 shadow-2xs'>
                    🚚 Fast Delivery
                </div>
            </div>
        </div>
    );
}

export default CartTotal;