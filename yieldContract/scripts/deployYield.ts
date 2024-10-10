import hre, { network } from "hardhat";

async function main() {
   if (network.name !== "baseSepolia") return console.log("Must be on Base Sepolia network");
   const PRIVATE_KEY = process.env.PRIVATE_KEY as string
   const rpcProvider = process.env.BASE_SEPOLIA_RPC_URL
   const contract = await hre.ethers.deployContract("YieldToken", ["0xF5F7D334B1Dc75C644816BEA608B0af31f6450dc", ""])
   await contract.waitForDeployment()
   console.log(`Contract Deployed on ${network.name} at address ${contract.target}`)

}

main().catch(error => {
   console.error(error)
   process.exitCode = 1;
})