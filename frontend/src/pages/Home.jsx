import React, { useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";

function Home() {
  const heroData = [
    {
      text1: "Discover the Best",
      text2: "Shopping Experience",
    },
    {
      text1: "New Collection",
      text2: "Just Arrived",
    },
    {
      text1: "Up To 70% Off",
      text2: "Limited Time Offer",
    },
    {
      text1: "Premium Quality",
      text2: "At Best Prices",
    },
    {
      text1: "Fast Delivery",
      text2: "& Easy Returns",
    },
  ];

  const [heroCount, setHeroCount] = useState(0);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background heroCount={heroCount} />

      <div className="absolute inset-0 flex items-center">
        <Hero
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
        />
      </div>
    </div>
  );
}

export default Home;