import pinata from "@/backend/ipfs";
import { landContract } from "@/backend/web3";
import { NextRequest, NextResponse } from "next/server"

const appid = process.env.AGROMONITORING_API_KEY
export async function POST(req: NextRequest) {
   try {
      // Parse the request body as JSON
      const body = await req.json();
      const dummy = { "name": body.landName, "geo_json": { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": body.coordinates } } }
      // console.log(body)

      // Send the polygon to the Agromonitoring API
      const response = await fetch(`http://api.agromonitoring.com/agro/1.0/polygons?appid=${appid}&duplicated=true`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(dummy)
      });

      // Parse the response
      const data = await response.json();
      // console.log(data)

      const soilRes = await fetch(`https://api.agromonitoring.com/agro/1.0/soil?polyid=${data.id}&appid=${appid}`)
      const soilData = await soilRes.json()
      const weatherRes = await fetch(`https://api.agromonitoring.com/agro/1.0/weather?lat=${data.center[0]}&lon=${data.center[1]}&appid=${appid}`)
      const weatherData = await weatherRes.json()

      const dataJson = { ...body, ...data, weather: {...weatherData}, ...soilData}
      // console.log(JSON.parse(dataJson));
      const date = new Date()
      const file = new File([JSON.stringify(dataJson)], `${date}.json`, { type: "application/json"})
      const uploadData = await pinata.upload.file(file)
      // const url = await pinata.gateways.createSignedURL({ cid: uploadData.cid, expires: 36000})

      // Return success response
      return NextResponse.json({cid: uploadData.cid, polygon: body.coordinates, center: data.center, polygonId: data.id, success: "ok" }, { status: 200 });
   } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
   }
}


export async function GET(req: Request) {
   const url = new URL(req.url)
   const {searchParams} = url
   const cid = searchParams.get("cid")
   const id = searchParams.get("id")
   try {
      const contractResponse = await landContract.methods.ipfsHash().call()
      const data = await pinata.gateways.get(cid || contractResponse);
      // const data = await pinata.gateways.get("bafkreidmgywjwzkictk3t22iuqduc7cnmfkwqqjkc4g2ozvdzu4d3zghe4");
      const blob = await (data as any).data.text().then((text: any) => {
         return JSON.parse(text)
      })
      const result = blob ?? data.data;
      if (id) {
         const tokenUri = await landContract.methods.tokenURI(id).call();
         const ipfsResponse = await pinata.gateways.get(tokenUri)
         const blob = await (ipfsResponse as any).data.text().then((text: any) => {
            return JSON.parse(text)
         }).catch((error: any) => {
            return {}
         })
         const ifpsData = blob ?? data.data;
         return NextResponse.json({id: id, tokenUri: tokenUri, ipfsdata: ifpsData, ...result}, { status: 200})
      }
      // if (result.data[0].weather.cod) return NextResponse.json({error: "Corrupted file"}, { status: 404}) 
      return NextResponse.json({data: result}, {status: 200})
   } catch(e) {
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}