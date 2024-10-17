"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import {
  ArrowRight,
  Leaf,
  Sun,
  Droplet,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import AboutPage from "@/components/ui/shared/About";
import FarmingAndForm from "@/components/ui/shared/RegisterForm";
import { useRouter } from "next/navigation";

const images = [
  "https://img.freepik.com/premium-photo/vibrant-assortment-fresh-vegetables-fruits-arranged-wooden-surface_936494-8074.jpg?w=1060",
  "https://c7.alamy.com/comp/E7Y2KC/green-coffee-beans-in-a-plantation-in-ghana-africa-near-the-ivorian-E7Y2KC.jpg",
  "https://ideogram.ai/assets/progressive-image/balanced/response/-a4a1_jZTEOL6rtsF0xQWg",
  "https://c7.alamy.com/comp/AECH7X/cocoa-pod-ghana-AECH7X.jpg",
];

const ModernHeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-r from-green-800 to-green-800"
      id="startview"
    >
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-10 bg-white-50/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Leaf className="h-8 w-8 text-green-600" />
           Yield
          <div className="hidden md:flex space-x-6">
            <div className="flex gap-4">
              {/* <Link
                // onClick={() => scrollToSection(startView)}
                to="startview"
                className="text-white hover:text-green-200 cursor-pointer transition-colors"
              >
                Home
              </Link>
              <Link
                //  key={item}
                // onClick={() => scrollToSection(regForm)}
                to="registerform"
                className="text-white hover:text-green-200 cursor-pointer transition-colors"
              >
                Register
              </Link> */}
            </div>
          </div>
          <Button variant="outline" className="md:hidden">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-around gap-10 mt-[7rem]">
          {/* Text Section */}
          <motion.div
            className="lg:w-[50%]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl  font-bold text-white mb-6">
            Empowering Growth Through Yield-Driven Innovation
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8">
            Unlock the potential of sustainable investments and maximize returns with our seamless Yield platform, designed for farmers, investors, and landowners alike.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors duration-300 font-medium text-lg shadow-md hover:shadow-lg" onClick={()=> router.push("/app")}>
                Launch App
              </button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full max-w-lg relative" // Make this responsive
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square bg-green-200 rounded-full overflow-hidden relative">
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="Healthy Plants"
                  className="object-cover w-full h-full absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 to-transparent" />
            </div>

            <motion.div
              className="absolute top-4 left-4 bg-white p-4 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <Leaf className="h-8 w-8 text-green-600" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <Sun className="h-8 w-8 text-yellow-500" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-2 transform translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <Droplet className="h-8 w-8 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* About Section */}
      <AboutPage />
      <FarmingAndForm name="registerform" />

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-auto rounded-t-[4rem]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                Yield - your reliable partner in creating the perfect
                tokenized farm. We offer the highest quality of return on investment and loans.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contacts</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+233 (559) 761-460</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>pixelhubster@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Accra, Ghana</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Subscription</h3>
              <p className="text-sm mb-2">
                Subscribe to our newsletter to receive updates and special
                offers.
              </p>
              {/* <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 text-green-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">
                  Subscribe
                </Button>
              </div> */}
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-green-700 text-center text-sm">
            © 2024 Yield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernHeroSection;