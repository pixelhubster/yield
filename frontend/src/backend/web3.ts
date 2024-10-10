import Web3 from "web3";
import landAbi from "./contract/landToken.json"
import cropAbi from "./contract/landToken.json"

let landContractAddress = process.env.NEXT_PUBLIC_LAND_CONTRACT || process.env.LAND_CONTRACT;
let cropContractAddress = process.env.NEXT_PUBLIC_CROP_CONTRACT || process.env.CROP_CONTRACT;
let web3: any;
let landContract: any;
let cropContract: any;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
   web3 = new Web3(window.ethereum);
   landContract = new web3.eth.Contract(landAbi.abi, landContractAddress)
   cropContract = new web3.eth.Contract(cropAbi.abi, cropContractAddress)
} else {
   const provider = new Web3.providers.HttpProvider(process.env.BASE_SEPOLIA_RPC_URL as string);
   web3 = new Web3(provider);
   landContract = new web3.eth.Contract(landAbi.abi, landContractAddress)
   cropContract = new web3.eth.Contract(cropAbi.abi, cropContractAddress)
}


export { landContract, cropContract, web3}