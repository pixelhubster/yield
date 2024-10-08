import { NextRequest, NextResponse } from "next/server"
import { landContract } from "@/backend/web3"

export async function GET(req: NextRequest) {
  try {
   // const landDetails = await landContract.methods.getAllLandDetails().call()
   console.log("done")
   return NextResponse.json({ success: "ok"}, {status: 200})
  } catch (error) {
   console.log(error)
   return NextResponse.json({ error: "Couldn't fetch land details"}, { status: 500})
  }
}