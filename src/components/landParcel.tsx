import React from 'react';
import { CiLocationArrow1 } from "react-icons/ci";
import { GiIsland } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandParcel = ({ landData }: {landData: any}) => {
  return (
    <div className="w-[20rem] h-full text-black shadow-lg rounded-lg p-0 z-0 px-0 overflow-x-hidden">
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Land Parcel Information</h2> */}

      {/* Owner and ID */}
      {/* <div className="border-b pb-4 mb-4">
        <p><span className="font-semibold">Land ID:</span> {landData.landID}</p>
        <p><span className="font-semibold">Current Owner:</span> {landData.owner}</p>
      </div> */}

      {/* Location */}
      <div className="pb-4 mb-4 bg-gray-100 p-5">
        <h3 className="text-md font-semibold mb-2 text-center">Location</h3>
        <div className='flex'>

        <div className='px-4'>
        <CiLocationArrow1 fontSize={40}/>
        </div>
        <div className='text-[14px]'>
        <p><span className="font-semibold">Address:</span> {landData.address}</p>
        <p><span className="font-semibold">Latitude:</span> {landData.location.latitude}</p>
        <p><span className="font-semibold">Longitude:</span> {landData.location.longitude}</p>
        <p><span className="font-semibold">Size in Acres:</span> {landData.sizeInAcres}</p>

        </div>
        </div>
      </div>

      {/* Fertility and Climate */}
      <div className="pb-4 mb-4 bg-gray-100 p-5">
        <h3 className="text-md font-semibold mb-2 text-center">Land Conditions</h3>

        <div className='flex'>
        <div className='px-4'>
        <GiIsland fontSize={40}/>
        </div>
        <div className='text-[14px]'>
        <p><span className="font-semibold">Fertility Score:</span> {landData.fertilityScore}</p>
        <p><span className="font-semibold">Soil Type:</span> {landData.soilType}</p>
        <p><span className="font-semibold">Average Temperature:</span> {landData.climateData.averageTemperature} °C</p>
        <p><span className="font-semibold">Average Rainfall:</span> {landData.climateData.averageRainfall} mm</p>
        <p><span className="font-semibold">Soil Moisture:</span> {landData.climateData.soilMoisture}</p>

         </div>
        </div>
      </div>

      {/* Land History */}
      {/* <div className="border-b pb-4 mb-4 bg-gray-100">
        <h3 className="text-xl font-semibold mb-2">Land History</h3>
        {landData.landHistory.map((history, index) => (
          <div key={index} className="mb-2">
            <p><span className="font-semibold">Previous Owner:</span> {history.previousOwner}</p>
            <p><span className="font-semibold">Ownership Start:</span> {history.ownershipStartDate}</p>
            <p><span className="font-semibold">Ownership End:</span> {history.ownershipEndDate}</p>
          </div>
        ))}
      </div> */}

      {/* Crop Data */}
      <div className="pb-4 mb-4 bg-gray-100 p-5">
        <h3 className="text-md font-semibold mb-2 text-center">Crop Data</h3>
        <div className='flex'>
        <div className='px-4'>
        <GiFarmer fontSize={40}/>
        </div>
        <div className='text-[14px]'>
        {landData.cropData.map((crop, index) => (
           <div key={index} className="mb-2">
            <p><span className="font-semibold">Crop Type:</span> {crop.cropType}</p>
            <p><span className="font-semibold">Planting Date:</span> {crop.plantingDate}</p>
            <p><span className="font-semibold">Harvest Date:</span> {crop.harvestDate}</p>
            <p><span className="font-semibold">Yield Amount:</span> {crop.yieldAmount} kg</p>

            <h4 className="font-semibold mt-2">Investment Data</h4>
            {crop.investmentData.map((investment, invIndex) => (
              <div key={invIndex} className="ml-4">
                <p><span className="font-semibold">Investor:</span> {investment.investor}</p>
                <p><span className="font-semibold">Investment Amount:</span> {investment.investmentAmount} USD</p>
                <p><span className="font-semibold">Investment Date:</span> {investment.investmentDate}</p>
              </div>
            ))}
          </div>
        ))}
        </div>
        </div>
      </div>

      {/* Loans */}
      <div className="pb-4 mb-4 bg-gray-100 p-5">
        <h3 className="text-md font-semibold mb-2 text-center">Loans & Mortgages</h3>
        <div className='flex'>
        <div className='px-4'>
        <GiIsland fontSize={40}/>
        </div>
        <div className='text-[14px]'>
        {landData.mortgagesAndLoans.map((loan, index) => (
          <div key={index} className="mb-2">
            <p><span className="font-semibold">Lender:</span> {loan.lender}</p>
            <p><span className="font-semibold">Loan Amount:</span> {loan.loanAmount} USD</p>
            <p><span className="font-semibold">Loan Start Date:</span> {loan.loanStartDate}</p>
            <p><span className="font-semibold">Loan End Date:</span> {loan.loanEndDate}</p>
            <p><span className="font-semibold">Collateral:</span> {loan.collateral}</p>
          </div>
        ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandParcel;
