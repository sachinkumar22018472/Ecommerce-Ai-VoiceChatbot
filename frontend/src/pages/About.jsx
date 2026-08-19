import React from 'react'
import Title from '../components/Title'
import about from '../assets/about.png'
import NewLetterBox from '../components/newLetterBox'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800">
      
      {/* Page Title */}
      <div className="text-center text-3xl font-bold tracking-tight mb-12">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Left: Image with Styled Background Badge */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl transform -rotate-1 -z-10"></div>
          <img 
            src={about} 
            alt="About OneCart" 
            className="w-full h-[400px] object-cover rounded-xl shadow-lg border border-gray-100"
          />
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
            Welcome to OneCart
          </span>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            Smart, Simple & Seamless Shopping Experience
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-base">
            OneCart was created to bring high-quality products, trending styles, and everyday essentials straight to your doorstep—all in one place. We combine affordability with convenience, offering a customer-first shopping platform built for the modern lifestyle.
          </p>

          {/* Mission Box */}
          <div className="p-6 bg-gray-50 border-l-4 border-indigo-600 rounded-r-xl">
            <h3 className="font-semibold text-gray-900 text-lg mb-1">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To redefine online shopping by delivering quality, affordability, and seamless customer care with every purchase.
            </p>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500">Quality Assured</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Fast</p>
              <p className="text-xs text-gray-500">Express Delivery</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">24/7</p>
              <p className="text-xs text-gray-500">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-10">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
          We are committed to providing the best online shopping environment for you.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Card 1 */}
        <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            01
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Assurance</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every product undergoes strict inspection before dispatch to ensure top-notch quality and durability.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            02
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Seamless Convenience</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Simple navigation, instant checkouts, and multi-payment support make shopping completely hassle-free.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            03
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Exceptional Service</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our dedicated team is ready to assist you around the clock with fast resolutions and easy return policies.
          </p>
        </div>

      </div>
      <NewLetterBox/>
      <Footer/>

    </div>
  )
}

export default About