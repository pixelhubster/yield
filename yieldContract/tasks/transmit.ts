import { getDeployedContract } from "./utils";
import { priceFeedScope } from "./scope";

/**
 * Task: Calls the transmit function on the PriceFeed contract.
 * Optional parameter: contract (PriceFeed contract address).
 * If the contract address is not provided, fetches from previous deployments.
 */
priceFeedScope.task("transmit", "Calls the transmit function on the PriceFeed contract")
  .addOptionalParam("contract", "The PriceFeed contract address")
  .setAction(async ({ contract }, hre) => {
    try {
      // Fetch the address from previous deployments if not provided
      let priceFeedAddress = "0x9CB0029E69b0982BC58A85FC81474ebA745BaFB0";
      if (!priceFeedAddress) {
        console.log("No contract address specified, fetching from previous deployments...");
        priceFeedAddress = getDeployedContract(hre.network.config, 'GeoDataModule#GeoData');
        console.log("Contract found:", priceFeedAddress);
      }

      // Get the PriceFeed contract instance
      const priceFeed = await hre.ethers.getContractAt("PriceFeed", priceFeedAddress);

      // Call the transmit function
      console.log(`\nCalling transmit() on PriceFeed at ${priceFeedAddress}...`);
      const tx = await priceFeed.transmit();

      // Wait for the transaction
      await tx.wait();
      console.log("Transmit executed successfully.");
    } catch (error: any) {
      console.error("An error occurred during the transmit function:", error.message);
    }
  });
