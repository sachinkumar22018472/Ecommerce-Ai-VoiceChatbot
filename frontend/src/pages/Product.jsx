import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

function Product() {
  return (
    <div className=''>

        <div className='' >
                <LatestCollection/>
        </div>
        <div className='' >
                <BestSeller/>
        </div>
        
    </div>
  )
}

export default Product