import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { MdOutlineStar, MdStarHalf } from "react-icons/md"
import { TbTruckDelivery, TbCash, TbArrowsExchange } from "react-icons/tb"
import RelatedProduct from '../components/RelatedProduct'
import { toast } from 'react-toastify'

function ProductDetails() {
    const { productId } = useParams()
    const { products, currency, addtoCart, addToCart } = useContext(shopDataContext)
    
    const [productData, setProductData] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

    // Real-time dynamic delivery date calculation (4 days from today)
    const getEstimatedDelivery = () => {
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + 4)
        return deliveryDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })
    }

    useEffect(() => {
        if (products && products.length > 0) {
            const item = products.find((item) => String(item._id) === String(productId))
            
            if (item) {
                setProductData(item)

                const initialImages = Array.isArray(item.image)
                    ? item.image
                    : [item.image1, item.image2, item.image3, item.image4].filter(Boolean)

                if (initialImages.length > 0) {
                    setMainImage(initialImages[0])
                }
                
                setSelectedSize('')
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [productId, products])

    if (!productData) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center p-10 text-center font-medium text-gray-600'>
                <div className='animate-pulse flex flex-col items-center gap-3'>
                    <div className='h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
                    <span className='text-sm tracking-wide text-gray-500'>Loading product details...</span>
                </div>
            </div>
        )
    }

    const imageList = Array.isArray(productData.image)
        ? productData.image
        : [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean)

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size first!', {
                position: "top-right",
                autoClose: 2500,
            })
            return
        }
        
        // Supports both context property variants (`addToCart` or `addtoCart`)
        const cartFunction = addToCart || addtoCart
        if (cartFunction) {
            cartFunction(productData._id, selectedSize)
            toast.success(`Added ${productData.name} (${selectedSize}) to cart!`, {
                position: "top-right",
                autoClose: 2500,
            })
        }
    }

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-300'>
            
            {/* Main Product Section */}
            <div className='flex flex-col md:flex-row gap-8 lg:gap-12'>
                
                {/* Left Section: Image Gallery */}
                <div className='flex-1 flex flex-col-reverse sm:flex-row gap-4'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full max-h-[500px] scrollbar-none'>
                        {imageList.map((imgUrl, index) => (
                            <img 
                                key={index} 
                                src={imgUrl} 
                                alt={`Thumbnail ${index + 1}`} 
                                className={`w-16 h-16 sm:w-full sm:h-24 object-cover cursor-pointer rounded-md border-2 shrink-0 transition-all duration-200 ${
                                    mainImage === imgUrl ? 'border-orange-500 scale-95 shadow-xs' : 'border-gray-200 hover:border-gray-400'
                                }`} 
                                onClick={() => setMainImage(imgUrl)} 
                            />
                        ))}
                    </div>

                    <div className='w-full sm:w-[80%] aspect-square max-h-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center'>
                        <img 
                            src={mainImage} 
                            alt={productData.name} 
                            className='w-full h-full object-cover object-center transition-opacity duration-300'
                        />
                    </div>
                </div>

                {/* Right Section: Product Details */}
                <div className='flex-1 flex flex-col gap-4'>
                    <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 tracking-wide leading-tight'>
                        {productData.name?.toUpperCase()}
                    </h1>

                    <div className='flex items-center gap-1 text-amber-500 text-lg'>
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdStarHalf />
                        <span className='text-sm text-gray-500 ml-2 font-medium'>(124 Reviews)</span>
                    </div>

                    <p className='text-3xl font-bold text-gray-900 mt-1'>
                        {currency} {productData.price}
                    </p>

                    <p className='text-gray-600 text-sm sm:text-base leading-relaxed mt-1'>
                        {productData.description}
                    </p>

                    <div className='mt-3'>
                        <p className='font-semibold text-gray-700 mb-3'>Select Size</p>
                        <div className='flex flex-wrap gap-3'>
                            {productData.sizes?.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(item)}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-150 ${
                                        item === selectedSize 
                                            ? 'border-orange-500 bg-orange-50 text-orange-600 font-bold scale-105 shadow-xs ring-1 ring-orange-500' 
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className='mt-4 w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-medium text-sm rounded-md active:scale-95 transition-all shadow-md hover:shadow-lg cursor-pointer'
                    >
                        ADD TO CART
                    </button>

                    <hr className='mt-4 border-gray-200' />

                    <div className='space-y-4 pt-1 text-slate-700 font-medium text-sm sm:text-base'>
                        <div className='flex items-center gap-4'>
                            <TbTruckDelivery className='text-2xl sm:text-3xl text-slate-800 shrink-0' />
                            <p>Get it by <span className='font-bold text-slate-900'>{getEstimatedDelivery()}</span></p>
                        </div>

                        <div className='flex items-center gap-4'>
                            <TbCash className='text-2xl sm:text-3xl text-slate-800 shrink-0' />
                            <p>Pay on delivery available</p>
                        </div>

                        <div className='flex items-center gap-4'>
                            <TbArrowsExchange className='text-2xl sm:text-3xl text-slate-800 shrink-0' />
                            <p>Easy 14 days return & exchange available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className='mt-16 sm:mt-24 pt-8 border-t border-gray-200'>
                <RelatedProduct 
                    category={productData.category} 
                    subCategory={productData.subCategory || productData.subcategory} 
                    currentProductId={productData._id} 
                />
            </div>
            
        </div>
    )
}

export default ProductDetails