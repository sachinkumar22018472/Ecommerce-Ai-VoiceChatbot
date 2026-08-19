import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    const { products } = useContext(shopDataContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 8))
        }
    }, [products])

    return (
        <section className="my-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section - Perfect Medium Scale */}
            <div className="text-center py-6 px-4 max-w-2xl mx-auto flex flex-col items-center">
                {/* Modern Pill Badge */}
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-gray-600 mb-2.5 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    ✦ NEW DROPS
                </span>

                {/* Medium-Sized Bold Title Wrapper */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2.5">
                    <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium tracking-wide leading-relaxed">
                    Step Into Style — <span className="text-black font-semibold">New Collection</span> Dropping This Season!
                </p>

                {/* Subtle Divider Line */}
                <div className="w-10 h-[2px] bg-black/80 mt-3 rounded-full"></div>
            </div>

            {/* Responsive Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 gap-y-8 mt-4">
                {latestProducts.length > 0 ? (
                    latestProducts.map((item, index) => (
                        <Card 
                            key={item._id || index} 
                            name={item.name} 
                            image={item.image1 || item.image?.[0]} 
                            id={item._id} 
                            price={item.price}
                        />
                    ))
                ) : (
                    /* Skeleton Loader Grid */
                    Array(8).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse flex flex-col gap-3">
                            <div className="bg-gray-200 aspect-square rounded-xl w-full"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default LatestCollection