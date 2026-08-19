import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import Footer from "../components/Footer";


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

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) =>
        prev === heroData.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mobile height */}
      <div className="relative h-[230px] sm:h-[320px] md:h-[450px] lg:h-screen">
        <Background heroCount={heroCount} />

        <div className="absolute inset-0">
          <Hero
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
          />
        </div>

      </div>
        <Product/>
        <OurPolicy/>
        <NewLetterBox />
        <Footer/>
    </div>
  );
}

export default Home;
