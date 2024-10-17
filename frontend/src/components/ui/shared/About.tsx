import React from "react";
import { Sprout } from "lucide-react";
import { Tractor, Wheat } from "lucide-react";

const AboutPage = () => {
   return (
      <div className="min-h-screen bg-white p-4 md:p-8">
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-green-800 p-8 rounded-full flex items-center justify-center">
                  <div className="relative w-48 h-48">
                     <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center transform -rotate-12">
                        <Sprout className="w-24 h-24 text-gray-800" />
                     </div>
                     <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center transform rotate-12">
                        <Sprout className="w-24 h-24 text-gray-800" />
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8">
                  <h2 className="text-4xl text-black font-bold mb-4">The world is beautiful when its green</h2>
                  <p className="text-gray-600 mb-4">
                     At Yield, we believe in reshaping the future of agriculture through innovative technology. Our platform brings farms and financial markets together, creating an ecosystem where anyone can participate in the agricultural value chain. Farmers get the support they need to grow, investors earn returns from sustainable farming, and communities benefit from responsible agriculture.


                  </p>
                  <p className="text-gray-600 mb-4">
                     Backed by blockchain technology, Yield ensures every investment is safe, traceable, and impactful. We empower people to make a difference—not just in their portfolios but also in how food is grown.
                  </p>
                  <p className="text-gray-600 mb-4">
                     Join our community-supported agriculture program and taste the
                     difference of truly fresh, local produce. Together, {"we're"} growing
                     a sustainable future.
                  </p>
                  <p className="text-sm text-gray-500">Image from Green Acres Farm</p>
               </div>
            </div>

            {/* <div className="mt-8 bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-700">
            At Green Acres, we believe in the power of nature and innovation
            working hand in hand. Our fields are a testament to sustainable
            agricultural practices, where every plant is nurtured with care and
            respect for the environment. From seed to harvest, we're committed
            to bringing you the finest organic produce while preserving the land
            for future generations.
          </p>
        </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pt-12">
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Tractor className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Tokenized Land and Crop Investments
                  </h3>
                  <p className="text-gray-600">
                     Investors can own digital shares of real agricultural projects—tokenized land or crop cycles—making it easy to track, trade, or reinvest for future gains.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Wheat className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Transparent and Secure Transactions
                  </h3>
                  <p className="text-gray-600">
                     We leverage blockchain for secure, transparent transactions that provide real-time tracking and verification of your investments.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Sprout className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Sustainable Agriculture Practices
                  </h3>
                  <p className="text-gray-600">
                     Your investments directly support environmentally friendly farming practices, ensuring a better future for the planet.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Sprout className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Marketplace for Crop and Produce Trading

                  </h3>
                  <p className="text-gray-600">
                     Farmers list their crops for sale, and investors can monitor crop performance, ensuring returns are based on real-time results.


                  </p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Sprout className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Loans with Collateralized Crops
                  </h3>
                  <p className="text-gray-600">
                     Farmers can take loans by using their crops as collateral, giving them access to funds needed to expand operations or manage unexpected challenges.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <Sprout className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                     Smart Contracts for Automated Processes
                  </h3>
                  <p className="text-gray-600">
                     Yield automates key processes—such as payouts, land assignments, and investment returns—through secure, self-executing smart contracts.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutPage;
