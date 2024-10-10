const landData = {
   landID: "0xA24d6B1C235DbA1eF95Ea7E5fDfECf4Ff6d8A236",
   owner: "0x5d3Ea15f2bB7a53955AF7B55E20Aa9166975aF44",
   location: {
     latitude: 37.7749,
     longitude: -122.4194
   },
   address: "123 Farm Lane, Springfield, CA 94103",
   sizeInAcres: 50.0,
   fertilityScore: 78,
   soilType: "Loamy",
   climateData: {
     averageTemperature: 20.5,
     averageRainfall: 500,
     soilMoisture: 0.65
   },
   landHistory: [
     {
       previousOwner: "0x9f5C8B31b4Ff6d3499c0Cd77E01eF2E7e43B6e80",
       ownershipStartDate: "2019-06-15",
       ownershipEndDate: "2023-09-10"
     },
     {
       previousOwner: "0x2E7c7E72B00e65BCAff2C6e5422Fbd1A1f34d650",
       ownershipStartDate: "2015-04-01",
       ownershipEndDate: "2019-06-15"
     }
   ],
   cropData: [
     {
       cropType: "Corn",
       plantingDate: "2024-05-01",
       harvestDate: "2024-09-15",
       yieldAmount: 3500,
       investmentData: [
         {
           investor: "0xA17B9E39Ccd8B3B6cEa6Bd6e21D24D9349E3cD7E",
           investmentAmount: 5000,
           investmentDate: "2024-04-15"
         }
       ]
     }
   ],
   mortgagesAndLoans: [
     {
       lender: "0x8B1f2fE2C755aDd4f948BdBE4310A4236F8D12B6",
       loanAmount: 20000,
       loanStartDate: "2023-10-01",
       loanEndDate: "2026-10-01",
       collateral: "Corn"
     }
   ]
 };
 export {landData}