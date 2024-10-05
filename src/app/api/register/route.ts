import pinata from "@/backend/ipfs";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
   try {
      // Parse the request body as JSON
      const body = await req.json();
      const dummy = { "name": body.landName, "geo_json": { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": body.coordinates } } }
      // Send the polygon to the Agromonitoring API
      const response = await fetch("http://api.agromonitoring.com/agro/1.0/polygons?appid=3b87578fd3bdb941cfe5b24122812690&duplicated=true", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(dummy)
      });

      // Parse the response
      const data = await response.json();
      const dataJson = JSON.stringify({ ...body, ...data})
      console.log(dataJson);
      const date = new Date()
      const file = new File([dataJson], `${date}.json`, { type: "application/json"})
      const uploadData = await pinata.upload.file(file)
      // const url = await pinata.gateways.createSignedURL({ cid: uploadData.cid, expires: 36000})

      // Return success response
      return NextResponse.json({cid: uploadData.cid, polygon: body.coordinates, success: "ok" }, { status: 200 });
   } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
   }
}


// export async function GET(req: Request) {
//    const url = new URL(req.url)
//    const {searchParams} = url
//    const cid = searchParams.get("cid")
//    try {
//       const data = await pinata.gateways.get(cid as string);
//       const blob = await (data as any).data.text().then((text: any) => {
//          return JSON.parse(text)
//       })
//       const result = blob ?? data.data;
//       console.log(result)
//       return NextResponse.json({data: result}, {status: 200})
//    } catch(e) {
//       console.log(e)
//       return NextResponse.json(
//          { error: "Internal Server Error" },
//          { status: 500 }
//       );
//    }
// }