import Web3 from "web3";
import landAbi from "./contract/landToken.json"
import yieldTokenAbi from "./contract/YieldToken.json"
import yieldLendingAbi from "./contract/YieldLending.json"
import { AAWrapProvider, SendTransactionMode, SendTransactionEvent, SmartAccount } from "@particle-network/connectkit/aa";


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string
const appId = process.env.NEXT_PUBLIC_APP_ID as string

const smartAccount = new SmartAccount(provider, {
   projectId,
   clientKey,
   appId,
   aaOptions: {
      accountContracts: {
         BICONOMY: [
            { 
               version: '1.0.0',
               chainIds: [],
            },
            {
               version: '2.0.0',
               chainIds: [],
            }
         ],
      },
      paymasterApiKeys: [{
         chainId: 1,
         apiKey: ""
      }]
   }

})
const wrapProvider = new AAWrapProvider(smartAccount, SendTransactionMode.UserPaidNative)


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
   const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL as string);
   web3 = new Web3(provider);
   landContract = new web3.eth.Contract(landAbi.abi, landContractAddress)
   yieldTokenContract = new web3.eth.Contract(yieldTokenAbi.abi, yieldTokenContractAddress)
   yieldLendingContract = new web3.eth.Contract(yieldLendingAbi.abi, yieldLendingContractAddress)
   usdcContract = new web3.eth.Contract(usdcAbi, "0x036CbD53842c5426634e7929541eC2318f3dCF7e")
}


export { landContract, yieldTokenContract, yieldLendingContract, usdcContract, web3}