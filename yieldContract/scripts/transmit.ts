import { AbiCoder } from "ethers";
import { ethers } from "hardhat";
import { Web3 } from 'web3'
async function main() {
   // Address of the already deployed GeoData contract
   const contractAddress = "0x9CB0029E69b0982BC58A85FC81474ebA745BaFB0"; // Replace with the actual deployed address

   // The ABI of the deployed GeoData contract (you can get this from the artifacts or from the contract itself)
   const geoDataABI = [
      "function transmit(bytes calldata data) external returns (bytes32)"
   ];

   // Get the signer (the account that will interact with the contract)
   const [signer] = await ethers.getSigners();
   console.log("Interacting with the contract using account:", signer.address);

   // Create a contract instance
   const geoData = new ethers.Contract(contractAddress, geoDataABI, signer);
   const web3 = new Web3("https://sepolia.base.org")

   
   // Example input data for the transmit function
   //   const inputData = ethers.utils.toUtf8Bytes("Example geographical data or other input");
   function stringToBytes32(str: string) {
      return web3.utils.padRight(web3.utils.asciiToHex(str), 64); // Pads the string to 32 bytes
    }
   const inputData = "720ee6ba01017d67d198d3f11517f5bc/6729ebda7fc9dc4a1e7734ba/51.56297825/-0.0352305"
   const encoded = stringToBytes32(inputData)
   // const abiCoder = new AbiCoder()
   // const encoded = abiCoder.encode(["string"], [inputData])
   
   // Call the transmit function
   console.log("Calling transmit...");
   const tx = await geoData.transmit(encoded);
   console.log(tx.data)
   const data = web3.utils.hexToUtf8(tx.data)
   console.log(data)

   console.log("Transaction sent. Hash:", tx.hash);

   // Wait for the transaction to be mined
   const receipt = await tx.wait();
   console.log("Transaction mined:", receipt.transactionHash);
}

// Run the script
main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
