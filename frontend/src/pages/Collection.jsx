import React, { useState, useContext, useEffect } from 'react';
import { BiSolidChevronRight, BiSolidChevronDown } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';

function Collection() {
  const { products, search, showSearch } = useContext(shopDataContext);
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';

  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle Category Checkboxes
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Toggle SubCategory Checkboxes
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // Apply Filters (Category, SubCategory & Search Query)
  const applyFilter = () => {
    if (!products) return;
    let productCopy = products.slice();

    if(showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Filter by search term from URL
    if (searchParam.trim()) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(searchParam.toLowerCase().trim())
      );
    }

    // Filter by Category
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by SubCategory
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply Sorting on filtered list
    sortProducts(sortType, productCopy);
  };

  // Sort Products Logic
  const sortProducts = (type, listToSort = filterProduct) => {
    let sortedList = listToSort.slice();

    switch (type) {
      case 'low-high':
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProduct(sortedList);
  };

  // Run filter when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, searchParam, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t border-gray-200 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Left Filter Options Sidebar */}
      <div className="min-w-60">
        {/* Filter Title & Toggle Button for Mobile */}
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl font-medium flex items-center gap-2 cursor-pointer sm:cursor-default text-gray-800"
        >
          FILTERS
          <span className="sm:hidden text-lg">
            {!showFilter ? <BiSolidChevronRight /> : <BiSolidChevronDown />}
          </span>
        </p>

        {/* Categories Filter Box */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 rounded-xl ${
            showFilter ? '' : 'hidden'
          } sm:block bg-white shadow-2xs`}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'Men'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'Women'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'Kids'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Sub-Categories Filter Box */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 rounded-xl ${
            showFilter ? '' : 'hidden'
          } sm:block bg-white shadow-2xs`}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
            SUB-CATEGORIES
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'TopWear'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleSubCategory}
              />
              TopWear
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'BottomWear'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleSubCategory}
              />
              BottomWear
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-black">
              <input
                type="checkbox"
                value={'WinterWear'}
                className="w-4 h-4 accent-black rounded cursor-pointer"
                onChange={toggleSubCategory}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* Right Product Grid Area */}
      <div className="flex-1">
        {/* Top Header & Sorting Row */}
        <div className="flex justify-between items-center text-base sm:text-2xl mb-6">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Sort Dropdown */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-xs sm:text-sm px-3 py-2 rounded-lg outline-none bg-white font-medium text-gray-700 focus:border-black cursor-pointer"
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Products Grid Container */}
        {filterProduct.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProduct.map((item, index) => (
              <Card
                key={item._id || index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1 || item.image?.[0]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 font-medium">
            No products found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;