import { NextRequest, NextResponse } from "next/server"
import { landContract } from "@/backend/web3"
import pinata from "@/backend/ipfs"
const appid = process.env.AGROMONITORING_API_KEY

export async function GET(req: NextRequest) {
   try {
      const landDetails = await landContract.methods.getAllLandDetails().call()
      const returnData = []
      for (let index = 0; index < landDetails.length; index++) {
         if (landDetails[index].id === "") {
            returnData.push({
               polygonId: "",
               lat: "",
               lon: ""
            })
         } else {
            const data = landDetails[index];
            const newData = await fetchData(data);
            returnData.push(newData)
         }
      }
      const date = new Date()
      const file = new File([JSON.stringify(returnData)], `${date}.json`, { type: "application/json"})
      const uploadData = await pinata.upload.file(file)
      return NextResponse.json(uploadData.cid, { status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Couldn't fetch land details" }, { status: 500 })
   }
}
async function fetchData(data: any) {
   try {
      const soilRequest = await fetch(`https://api.agromonitoring.com/agro/1.0/soil?polyid=${data.polygonId}&appid=${appid}`)
      const soilData = await soilRequest.json()
      const weatherRequest = await fetch(`https://api.agromonitoring.com/agro/1.0/weather?lat=${data.lat}&lon=${data.log}&appid=${appid}`)
      const weatherData = await weatherRequest.json()
      const dataJson = JSON.stringify({ weather: { ...weatherData }, ...soilData })
      return dataJson
   } catch (error) {
      console.log(error)
   }
}



// const { PinataSDK } = await import('npm:pinata');

// const jwt = secrets.jwt
// const gateway = secrets.gateway
// const appid = secrets.appid;

// const pinata = new PinataSDK({
//   pinataJwt: jwt,
//   pinataGateway: gateway
// })
// const getLandDetailsFromServer = await Functions.makeHttpRequest({
//   url: `https://yield.vercel.app/api/land`,
// })
// async function fetchData(data) {
//   try {
//     const soilRequest = await Functions.makeHttpRequest({
//       url: `https://api.agromonitoring.com/agro/1.0/soil?polyid=${data.polygonId}&appid=${appid}`
//     })
//     const weatherRequest = await Functions.makeHttpRequest({
//       url: `https://api.agromonitoring.com/agro/1.0/weather?lat=${data.lat}&lon=${data.lon}&appid=${appid}`
//     })

//     const dataJson = JSON.stringify({ weather: { ...weatherRequest.data }, ...soilRequest.data })
//     return dataJson

//   } catch (error) {
//     console.log(error)
//   }
// }

// const returnData = []
// if (!getLandDetailsFromServer.error) {
//   for (let index = 0; index < getLandDetailsFromServer.data.length; index++) {
//     if (getLandDetailsFromServer.data[index].id === "") {
//       returnData.push({
//         polygonId: "",
//         lat: "",
//         lon: ""
//       })
//     } else {
//       const data = getLandDetailsFromServer.data[index];
//       const newData = await fetchData(data);
//       returnData.push(newData)
//     }
//   }
// } else {
//   console.log(JSON.stringify(getLandDetailsFromServer, null, 2));
//   throw new Error('Get Data from server error')
// }

// const date = new Date()
// const file = new File([getLandDetailsFromServer.data], `${date}.json`, { type: "application/json" })
// const uploadData = await pinata.upload.file(file)

// return Functions.encodeString(uploadData.cid)