import { HardhatUserConfig } from "hardhat/config";
import * as dotenvenc from "@chainlink/env-enc"
dotenvenc.config()
import "@nomicfoundation/hardhat-toolbox";

const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL
const ACCOUNTS = process.env.PRIVATE_KEY;
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
   baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL || "",
      accounts: ACCOUNTS ? [ACCOUNTS] : [],
      chainId: 84532
   }
  },
  etherscan: {
   apiKey: {
      'base-sepolia': 'empty'
    },
   customChains: [
      {
         network: "base-sepolia",
         chainId: 84532,
         urls: {
           apiURL: "https://base-sepolia.blockscout.com/api",
           browserURL: "https://base-sepolia.blockscout.com"
         }
       }
   ]
  },
  sourcify: {
   enabled: false
  }
};

export default config;
