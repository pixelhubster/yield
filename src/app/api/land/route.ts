import { NextRequest, NextResponse } from "next/server"
import { Web3 } from 'web3'
import abi from "../../../backend/contract/landToken.json"

export async function GET(req: NextRequest) {
  try {
   const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL as string);
   const web3 = new Web3(provider);
   const landContract = new web3.eth.Contract(abi.abi, "0x131e2C2Dfecae4d9eEFE60361797753d910CCD12")
   const landDetails = await landContract.methods.getAllLandDetails().call()
   return NextResponse.json(landDetails, {status: 200})
  } catch (error) {
   console.log(error)
   return NextResponse.json({ error: "Couldn't fetch land details"}, { status: 500})
  }
}