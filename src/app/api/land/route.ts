import { landContract } from "@/backend/web3";
import { NextRequest, NextResponse } from "next/server"
import Web3 from "web3";

let landContractAddress = process.env.NEXT_PUBLIC_LANDCONTRACT;

export async function GET(req: NextRequest) {
  try {
   const landDetails = await landContract.methods.getAllLandDetails().call()
   console.log(landDetails)
   return NextResponse.json(landDetails)
   
  } catch (error) {
   console.log(error)
   return NextResponse.json({ error: "Couldn't fetch land details"}, { status: 500})
  }
}

