// import { HardhatUserConfig } from "hardhat/config";
// // import * as dotenvenc from "@chainlink/env-enc"
// // dotenvenc.config()
// import "@nomicfoundation/hardhat-toolbox";
// // import "@nomiclabs/hardhat-etherscan"

// const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL
// const ACCOUNTS = process.env.PRIVATE_KEY;
// const config: HardhatUserConfig = {
//    solidity: "0.8.25",
//    networks: {
//       baseSepolia: {
//          url: BASE_SEPOLIA_RPC_URL || "",
//          accounts: ACCOUNTS ? [ACCOUNTS] : [],
//          chainId: 84532,
//       }
//    },
//    etherscan: {
//       apiKey: "E549EKTYBBWPNHSXXBYMGVITTIFPVXQQXQ",

//       // apiKey: {
//       //    'base-sepolia': 'empty',
//       //  },
//       // customChains: [
//       //    {
//       //       network: "baseSepolia",
//       //       chainId: 84532,
//       //       urls: {
//       //          apiURL: "https://api-sepolia.etherscan.io/api",
//       //          // apiURL: "https://api-sepolia.basescan.org",
//       //          //   apiURL: "https://base-sepolia.blockscout.com/api",
//       //          // browserURL: "https://base-sepolia.blockscout.com",
//       //          // browserURL: "https://sepolia.base.org",
//       //          browserURL: "https://sepolia.basescan.org",
//       //          //   apiKey: process.env.ETHERSCAN_API_KEY
//       //       }
//       //    }
//       // ]
//    },
//    sourcify: {
//       enabled: true
//    }
// };

// export default config;



import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// PriceFeed Tasks
import "./tasks/transmit";
import "./tasks/latestAnswer";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.25',
  networks: {
    baseSepolia: {
      accounts: [process.env.EVM_PRIVATE_KEY || ""],
      url: 'https://sepolia.base.org',
      chainId: 84532,
    }
  },
  etherscan: {
    apiKey: process.env.BASE_SEPOLIA_ETHERSCAN_API_KEY || "",
    customChains: [
      {
        chainId: 84532,
        network: 'baseSepolia',
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        }
      }
    ]
  }
}

export default config;
