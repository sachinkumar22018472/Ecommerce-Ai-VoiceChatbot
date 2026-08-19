import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from '../components/Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
    const { products } = useContext(shopDataContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            // 1. Filter out current product
            let filterList = products.filter(
                (item) => String(item._id) !== String(currentProductId)
            )

            // 2. Try exact match (Category AND SubCategory) with case-insensitive check
            let matched = filterList.filter((item) => {
                const matchCat = category ? String(item.category).toLowerCase() === String(category).toLowerCase() : true
                const matchSub = subCategory ? String(item.subCategory || item.subcategory).toLowerCase() === String(subCategory).toLowerCase() : true
                return matchCat && matchSub
            })

            // 3. Fallback: If exact match gives less than 2 items, match only by Category
            if (matched.length < 2 && category) {
                matched = filterList.filter(
                    (item) => String(item.category).toLowerCase() === String(category).toLowerCase()
                )
            }

            // 4. Ultimate Fallback: If still no items, show any other products
            if (matched.length === 0) {
                matched = filterList
            }

            setRelated(matched.slice(0, 5))
        }
    }, [products, category, subCategory, currentProductId])

    if (related.length === 0) {
        return null
    }

    return (
        <div className='my-12 sm:my-20'>
            {/* Section Title */}
            <div className='text-center text-2xl sm:text-3xl py-4 mb-6'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-8'>
                {related.map((item, index) => {
                    const displayImage = Array.isArray(item.image) && item.image.length > 0 
                        ? item.image[0] 
                        : item.image1 || item.image

                    return (
                        <Card 
                            key={item._id || index} 
                            id={item._id} 
                            name={item.name} 
                            price={item.price} 
                            image={displayImage}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedProduct