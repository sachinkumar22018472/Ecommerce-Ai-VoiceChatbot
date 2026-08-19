import React, { useContext, useState } from 'react'
import Nav from '../componenet/Nav'
import Sidebar from '../componenet/Sidebar'
import upload from '../assets/uploadImage.png'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../componenet/Loading'

function Add() {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [price, setPrice] = useState("")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  const { serverUrl } = useContext(authDataContext)

  // Toggle size selection
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    )
  }

  const handleAddProduct = async (e) => {
    toast.success("Product Added Successfully")
    setLoading(false)
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("price", price)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // Only append if actual File objects exist
      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)



for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )

      console.log("Add Product Result:", result.data)

      if (result.data?.success) {
        // Reset states properly to null (Not false!)
        setName("")
        setDescription("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setSizes([])
        
      } else {
        alert(result.data?.message || "Something went wrong")
      }

    } catch (error) {
      console.error("Add Product Frontend Error:", error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Nav />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto w-full">
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">
              Add New Product
            </h1>

            {/* Upload Images Section */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700">
                Upload Product Images <span className="text-gray-400 font-normal">(Up to 4)</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: 'image1', state: image1, setter: setImage1, label: 'Slot 1 (Main)' },
                  { id: 'image2', state: image2, setter: setImage2, label: 'Slot 2' },
                  { id: 'image3', state: image3, setter: setImage3, label: 'Slot 3' },
                  { id: 'image4', state: image4, setter: setImage4, label: 'Slot 4' },
                ].map((item) => (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className="flex flex-col items-center justify-center h-32 sm:h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 transition-all overflow-hidden group relative"
                  >
                    <img
                      src={!item.state ? upload : URL.createObjectURL(item.state)}
                      alt={`Preview ${item.id}`}
                      className={!item.state ? "w-8 h-8 object-contain opacity-50 group-hover:opacity-80" : "w-full h-full object-cover"}
                    />
                    {!item.state && (
                      <span className="text-xs text-gray-500 mt-2 font-medium">{item.label}</span>
                    )}
                    <input
                      type="file"
                      id={item.id}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          item.setter(e.target.files[0])
                        }
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-1.5">
              <label htmlFor="product-name" className="text-sm font-semibold text-gray-700 block">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="e.g. Oversized Cotton T-Shirt"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-all"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* Product Description */}
            <div className="space-y-1.5">
              <label htmlFor="product-desc" className="text-sm font-semibold text-gray-700 block">
                Product Description
              </label>
              <textarea
                id="product-desc"
                rows={4}
                placeholder="Write a clear description of the product..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-all resize-y"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            {/* Category & Sub-Category Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="category" className="text-sm font-semibold text-gray-700 block">
                  Product Category
                </label>
                <select
                  id="category"
                  value={category}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none bg-white transition-all"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="sub-category" className="text-sm font-semibold text-gray-700 block">
                  Sub - Category
                </label>
                <select
                  id="sub-category"
                  value={subCategory}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none bg-white transition-all"
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                >
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-1.5">
              <label htmlFor="price" className="text-sm font-semibold text-gray-700 block">
                Product Price (₹)
              </label>
              <input
                id="price"
                type="number"
                min="0"
                placeholder="200"
                className="w-full sm:w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none transition-all"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Select Sizes</p>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
                      sizes.includes(size)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="bestseller" className="text-sm text-gray-700 font-medium cursor-pointer">
                Add to Bestseller
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-98"
              >
                {loading? <Loading/> : "Add Product"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Add