import React from 'react'

function Loading() {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8 w-full'>
      {/* Outer spinning ring */}
      <div className='relative flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
      </div>
      
      {/* Loading Text */}
      <p className='text-sm font-medium text-gray-500 tracking-wider animate-pulse'>
        Loading...
      </p>
    </div>
  )
}

export default Loading