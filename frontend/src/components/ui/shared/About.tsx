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
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              Green Acres Farm: Cultivating excellence since 1985. Our
              commitment to sustainable farming practices and innovative
              agricultural techniques has made us a leader in organic crop
              production.
            </p>
            <p className="text-gray-600 mb-4">
              We take pride in our diverse range of crops, from heirloom
              vegetables to sustainable grains. Our methods not only yield
              high-quality produce but also nurture the land for future
              generations.
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
              Modern Techniques
            </h3>
            <p className="text-gray-600">
              We utilize cutting-edge farming technology to maximize efficiency
              and minimize environmental impact.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Wheat className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Diverse Crops
            </h3>
            <p className="text-gray-600">
              From heirloom vegetables to sustainable grains, we grow a wide
              variety of crops to support biodiversity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Sustainable Future
            </h3>
            <p className="text-gray-600">
              Our farming practices are designed to nurture the soil and protect
              local ecosystems for years to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
