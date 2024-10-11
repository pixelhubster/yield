import { HardhatUserConfig } from "hardhat/config";
import * as dotenvenc from "@chainlink/env-enc"
dotenvenc.config()
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-etherscan"

const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL
const ACCOUNTS = process.env.PRIVATE_KEY;
const config: HardhatUserConfig = {
   solidity: "0.8.24",
   networks: {
      baseSepolia: {
         url: BASE_SEPOLIA_RPC_URL || "",
         accounts: ACCOUNTS ? [ACCOUNTS] : [],
         chainId: 84532,
      }
   },
   etherscan: {
      apiKey: "E549EKTYBBWPNHSXXBYMGVITTIFPVXQQXQ",

      // apiKey: {
      //    'base-sepolia': 'empty',
      //  },
      // customChains: [
      //    {
      //       network: "baseSepolia",
      //       chainId: 84532,
      //       urls: {
      //          apiURL: "https://api-sepolia.etherscan.io/api",
      //          // apiURL: "https://api-sepolia.basescan.org",
      //          //   apiURL: "https://base-sepolia.blockscout.com/api",
      //          // browserURL: "https://base-sepolia.blockscout.com",
      //          // browserURL: "https://sepolia.base.org",
      //          browserURL: "https://sepolia.basescan.org",
      //          //   apiKey: process.env.ETHERSCAN_API_KEY
      //       }
      //    }
      // ]
   },
   sourcify: {
      enabled: true
   }
};

export default config;
