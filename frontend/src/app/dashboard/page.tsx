"use client"
import React from "react";
import {useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Layout from "../../../components/Layout";
// import UniversityStatsChart from "@/components/Chart";
import {
  Users,
  School,
  BookOpen,
  GraduationCap,
  BarChart3,
  PlusCircle,
  ShoppingCart,
  List,
  FileWarning,
  Package,
} from "lucide-react";
import LandParcel from "@/components/LandParcel";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BorrowModal from "@/components/modals/borrow";
import RegisterYieldModal from "@/components/modals/registerYield";
import ListYieldModal from "@/components/modals/listYield";
// import Map from "@/components/Map";

const DashMain = () => {

    const [borrowModal ,setBorrowModal] = useState(false)
    const [regYield ,setRegYield] = useState(false)
    const [listYield ,setListYield] = useState(false)

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986790384692!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1697414114610!5m2!1sen!2s";
  return (
    <>
      <div className="p-4 max-w-7xl mx-auto bg-background-dark min-h-screen text-text">
        <h1 className="text-2xl font-bold mb-6"> Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Overview */}
          <Card className="bg-green-800 border-secondary hover:bg-green-700 transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-white mr-2" />
                <h2 className="text-3xl font-bold text-white">0</h2>
              </div>
              <p className="text-xl text-center text-white mb-4">Supplies</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="bg-white text-green-800 hover:bg-green-100 flex items-center justify-center"
                  onClick={() => setRegYield(true)}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Register
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-green-800 hover:bg-green-100 flex items-center justify-center"
                  onClick={() => setListYield(true)}
                >
                  <List className="w-4 h-4 mr-1" />
                  List
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-green-800 hover:bg-green-100 flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Purchase
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map card */}
          <Card className="col-span-full   lg:col-span-2 xl:col-span-3 bg-background border-accent">
            <CardContent className="">
              <iframe
                src={mapUrl}
                width="100%"
                height="200"
                className="rounded-2xl"
                style={{ border: 0 }}
                //   allowFullScreen=true
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                ></iframe>
              {/* <Map/> */}
            </CardContent>
          </Card>

          {/* land parcel */}
          <Card className="bg-[#151718] border-[#202425] col-span-full  lg:col-span-2 xl:col-span-2">
            <CardContent className="px-6">
              <LandParcel />
            </CardContent>
          </Card>

          <Card className="bg-secondary border-[#c7cdce]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">

              <Card className="bg-[#151718] border-[#202425]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Evaluation(USDC)
                  </CardTitle>
                  <ExclamationTriangleIcon />
                </CardHeader>
                <CardContent className="px-6">
                  <div className="text-2xl font-bold">0</div>
                </CardContent>
              </Card>

              <Card className="bg-[#151718] border-[#202425]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Expected Total yield
                  </CardTitle>
                  <ExclamationTriangleIcon />
                </CardHeader>
                <CardContent className="px-6">
                  <div className="text-2xl font-bold">45,678</div>
                </CardContent>
              </Card>

              <Card className="bg-secondary border-secondary hover:bg-accent cursor-pointer transition-colors flex flex-col gap-3 p-2">
                {/* Season card */}
                <Card className="bg-secondary border-[#c7cdce] hover:bg-accent cursor-pointer transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Season
                    </CardTitle>
                    <ExclamationTriangleIcon />
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground">0</p>
                  </CardContent>
                </Card>
                {/* Balance Card */}
                <Card className="bg-secondary border-[#c7cdce] hover:bg-accent cursor-pointer transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Balance
                    </CardTitle>
                    <ExclamationTriangleIcon />
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground">0</p>
                  </CardContent>
                </Card>
              </Card>
            </CardContent>
          </Card>

          {/* season balance liquidate */}
          <Card className="bg-accent border-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Graduation Rate
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* content */}
            <CardContent className="flex flex-col gap-3">
              <Card className="bg-secondary border-secondary hover:bg-accent cursor-pointer transition-colors flex flex-col gap-3 p-2">
                {/* Lvt card */}
                <Card className="bg-secondary border-[#c7cdce] hover:bg-accent cursor-pointer transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      LVT Ratio
                    </CardTitle>
                    <ExclamationTriangleIcon />
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground">60%</p>
                  </CardContent>
                </Card>
                {/*Liquidation */}
                <Card className="bg-secondary border-[#c7cdce] hover:bg-accent cursor-pointer transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Liquidation
                    </CardTitle>
                    <ExclamationTriangleIcon />
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground">75%</p>
                  </CardContent>
                </Card>
              </Card>

              <Card className="bg-secondary border-secondary  transition-colors flex flex-col gap-3 p-2">
                {/* Season card */}
                <Card className="bg-secondary border-none border-[#c7cdce]  transition-colors">
                  <CardContent className="px-6">
                    <Button className="w-full bg-green-800 text-white" onClick={() => setBorrowModal(true)}>
                      Borrow
                    </Button>
                  </CardContent>
                </Card>
                {/* Balance Card */}
                <Card className="bg-secondary border-none border-[#c7cdce]  transition-colors">
                  <CardContent className="px-6">
                    <Button className="w-full bg-green-800 text-white">
                      pay
                    </Button>
                  </CardContent>
                </Card>
              </Card>
            </CardContent>
          </Card>

          {/* Random */}
          <Card className="bg-[#151718] border-[#202425]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Random
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-6">
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground">
                In the last academic year
              </p>
            </CardContent>
          </Card>

          {/* Add service */}
          <Card className="bg-secondary border-[#c7cdce] hover:bg-accent cursor-pointer transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Other service
              </CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-sm text-muted-foreground">
                New service
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* modals */}
      <BorrowModal setBorrowModal={setBorrowModal} borrowModal={borrowModal}/>
      <RegisterYieldModal setRegYield={setRegYield} regYield={regYield} />
      <ListYieldModal setListYield={setListYield} listYield={listYield} />
    </>
  );
};

export default DashMain;
