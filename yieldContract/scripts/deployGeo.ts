import hre, { network } from "hardhat";

import { AbiCoder, ethers } from "ethers"
async function main() {
   if (network.name !== "baseSepolia") return console.log("Must be on Base Sepolia network");
   const PRIVATE_KEY = process.env.PRIVATE_KEY as string
   const rpcProvider = process.env.BASE_SEPOLIA_RPC_URL;
   // const oracleId = ethers.utils.formatBytes32String("999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77")
   // const oracleId = hre.ethers.encodeBytes32String("999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77")
   // const abiCoder = new AbiCoder
   // const encoded = abiCoder.encode(["bytes32"], ["999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77"]);
   const contract = await hre.ethers.deployContract("GeoData", ["0xcBC8a3159535BfE276ADaA8604940602e02c5457", "0x999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77"])
   await contract.waitForDeployment()
   console.log(`Contract Deployed on ${network.name} at address ${contract.target}`)

}

main().catch(error => {
   console.error(error)
   process.exitCode = 1;
})