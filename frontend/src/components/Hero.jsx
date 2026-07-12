import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="flex flex-col justify-center h-full text-white px-6 md:px-16 lg:px-24">
      
      {/* Hero Text */}
      <div className="space-y-3">
        <p className="text-2xl md:text-5xl font-bold leading-tight">
          {heroData.text1}
        </p>

        <p className="text-2xl md:text-5xl font-bold leading-tight">
          {heroData.text2}
        </p>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-4 mt-10">
        {[0, 1, 2, 3, 4].map((index) => (
          <FaCircle
            key={index}
            onClick={() => setHeroCount(index)}
            className={`w-3 h-3 cursor-pointer transition-all duration-300 ${
              heroCount === index
                ? "fill-orange-400 scale-125"
                : "fill-white hover:fill-orange-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Hero;