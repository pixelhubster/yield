import { landContract } from "@/backend/web3";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
   const landDetails = await landContract.methods.getAllLandDetails().call()
   console.log(landDetails)
   return NextResponse.json(landDetails, {status: 200})
  } catch (error) {
   console.log(error)
   return NextResponse.json({ error: "Couldn't fetch land details"}, { status: 500})
  }
}