import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden'>
      {/* Background Soft Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-200/50 rounded-full blur-3xl -z-10 pointer-events-none'></div>

      {/* 404 Badge */}
      <div className='px-3.5 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 shadow-xs'>
        404 — Page Not Found
      </div>

      {/* Large 404 Text */}
      <h1 className='text-7xl sm:text-9xl font-extrabold text-neutral-900 tracking-tight leading-none'>
        404
      </h1>

      {/* Subheading & Explanation */}
      <h2 className='text-2xl sm:text-3xl font-bold text-neutral-800 mt-4'>
        Lost in space?
      </h2>
      <p className='text-neutral-500 text-sm sm:text-base max-w-md mt-2 leading-relaxed'>
        Aap jis page ko dhoondh rahe hain woh shayad move ho gaya hai, delete ho gaya hai ya URL galat hai.
      </p>

      {/* Navigation Buttons */}
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto'>
        <button
          onClick={() => navigate('/')}
          className='w-full sm:w-auto px-7 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-black/10 active:scale-95 cursor-pointer'
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className='w-full sm:w-auto px-7 py-3.5 bg-white border border-neutral-200 hover:border-neutral-300 text-black font-bold text-sm rounded-xl transition-all active:scale-95 shadow-xs cursor-pointer'
        >
          Previous Page
        </button>
      </div>
    </div>
  )
}

export default NotFound