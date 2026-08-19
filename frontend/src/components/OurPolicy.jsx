import React from 'react';
import Title from './Title';
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

// Array of policies for DRY, scalable code
const policies = [
  {
    icon: RiExchangeFundsFill,
    title: "Easy Exchange Policy",
    description: "Exchange Made Easy - Quick, Simple And Customer Friendly."
  },
  {
    icon: TbRosetteDiscountCheckFilled,
    title: "Seven Days Return Policy",
    description: "Shop with Confidence - 7 Days Easy Return Guarantee."
  },
  {
    icon: BiSupport,
    title: "Best Customer Support",
    description: "Trusted Customer Support - Your Satisfaction Is Our Priority."
  }
];

function OurPolicy() {
  return (
    <section className="my-10 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center py-8">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Customer-Friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 bg-gray-50 rounded-full mb-4 text-gray-700">
                <Icon className="w-10 h-10 stroke-[0.5]" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg mb-2">
                {policy.title}
              </p>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                {policy.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OurPolicy;