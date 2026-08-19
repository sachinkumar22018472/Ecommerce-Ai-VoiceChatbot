import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

function Card({ name, image, id, price }) {
  // Destructuring currency from Context
  const { currency } = useContext(shopDataContext)
  let navigate = useNavigate()

  return (
    <Link 
      to={`/productdetail/${id}`} 
      className="group block text-gray-700 cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Product Image Wrapper */}
      <div className="overflow-hidden bg-gray-100 relative aspect-square">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate group-hover:text-black transition-colors">
          {name}
        </p>

        <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
          {currency || "₹"} {price}
        </p>
      </div>
    </Link>
  )
}

export default Card