import hre, { network } from "hardhat";

async function main() {
   if (network.name !== "baseSepolia") return console.log("Must be on Base Sepolia network");
   const PRIVATE_KEY = process.env.PRIVATE_KEY as string
   const rpcProvider = process.env.BASE_SEPOLIA_RPC_URL
   const contract = await hre.ethers.deployContract("YieldLending", ["0x10B365BC4043Fb4500c33a06EdFA9cc4b255A6eC", "0x036CbD53842c5426634e7929541eC2318f3dCF7e", "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165", 86400])
   await contract.waitForDeployment()
   console.log(`Contract Deployed on ${network.name} at address ${contract.target}`)

}

main().catch(error => {
   console.error(error)
   process.exitCode = 1;
})