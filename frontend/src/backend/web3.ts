import Web3 from "web3";
import landAbi from "./contract/landToken.json"
import yieldTokenAbi from "./contract/YieldToken.json"
import yieldLendingAbi from "./contract/YieldLending.json"
// import usdcAbi from "./contract/usdc.json"

const usdcAbi = [
   // Minimal ABI with only the `approve` function
   {
     constant: false,
     inputs: [
       { name: "_spender", type: "address" },
       { name: "_value", type: "uint256" },
     ],
     name: "approve",
     outputs: [{ name: "", type: "bool" }],
     type: "function",
   },
 ];
let landContractAddress = process.env.NEXT_PUBLIC_LAND_CONTRACT || process.env.LAND_CONTRACT;
let cropContractAddress = process.env.NEXT_PUBLIC_CROP_CONTRACT || process.env.CROP_CONTRACT;
let yieldTokenContractAddress = process.env.NEXT_PUBLIC_YIELDTOKEN_CONTRACT || process.env.YIELDTOKEN_CONTRACT;
let yieldLendingContractAddress = process.env.NEXT_PUBLIC_YIELDLENDING_CONTRACT || process.env.YIELDLENDING_CONTRACT;
let web3: any;
let landContract: any;
let yieldTokenContract: any;
let yieldLendingContract: any;
let usdcContract: any;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
   web3 = new Web3(window.ethereum);
   landContract = new web3.eth.Contract(landAbi.abi, landContractAddress)
   yieldTokenContract = new web3.eth.Contract(yieldTokenAbi.abi, yieldTokenContractAddress)
   yieldLendingContract = new web3.eth.Contract(yieldLendingAbi.abi, yieldLendingContractAddress)
   usdcContract = new web3.eth.Contract(usdcAbi, "0x036CbD53842c5426634e7929541eC2318f3dCF7e")
} else {
   const provider = new Web3.providers.HttpProvider(process.env.BASE_SEPOLIA_RPC_URL as string);
   web3 = new Web3(provider);
   landContract = new web3.eth.Contract(landAbi.abi, landContractAddress)
   yieldTokenContract = new web3.eth.Contract(yieldTokenAbi.abi, yieldTokenContractAddress)
   yieldLendingContract = new web3.eth.Contract(yieldLendingAbi.abi, yieldLendingContractAddress)
   usdcContract = new web3.eth.Contract(usdcAbi, "0x036CbD53842c5426634e7929541eC2318f3dCF7e")
}


export { landContract, yieldTokenContract, yieldLendingContract, usdcContract, web3}