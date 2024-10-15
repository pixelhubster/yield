import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram } from "lucide-react";



export default function FarmingAndForm({ name }:{name:string}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4" name={name}>
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Section: Brand Details */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-500 text-white text-2xl font-bold w-12 h-12 rounded flex items-center justify-center mr-4">
                  FH
                </div>
                <h1 className="text-3xl font-bold text-green-800">FarmHorizon</h1>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Horizon of Agriculture</h2>
              <p className="text-gray-600 mb-6">
                FarmHorizon is a contemporary agricultural brand that embodies modern farming techniques and sustainability. Focused on innovative practices and high-quality produce, FarmHorizon offers a refined approach to farming that blends timeless traditions with cutting-edge technology.
              </p>
            </div>
            <div>
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Full Brand Guidelines
              </Button>
              <div className="flex space-x-4 mt-8">
                <Facebook className="text-green-500 hover:text-green-600 cursor-pointer" />
                <Twitter className="text-green-500 hover:text-green-600 cursor-pointer" />
                <Instagram className="text-green-500 hover:text-green-600 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="bg-green-50 p-8 lg:p-12 rounded-3xl m-4 lg:m-8 shadow-inner">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Contact Us</h2>
            <form className="space-y-4">
              <Input className="bg-white border-green-300 focus:border-green-500 rounded-full" placeholder="Name" />
              <Input className="bg-white border-green-300 focus:border-green-500 rounded-full" type="email" placeholder="Email" />
              <Input className="bg-white border-green-300 focus:border-green-500 rounded-full" placeholder="Message" />
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-2 transition-colors duration-300">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}