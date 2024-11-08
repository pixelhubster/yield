import * as fs from "fs";
import * as path from "path";
import { NetworkConfig } from "hardhat/types";

/**
 * Helper function to fetch the deployed contract address from the ignition deployment file.
 * @param network NetworkConfig object containing network details.
 * @param contractName The full name of the contract (as stored in the deployment JSON file).
 * @returns The deployed contract address as a string.
 * @throws Error if the deployment file or contract address is not found.
 */
export function getDeployedContract(network: NetworkConfig, contractName: string): string {
  // Hard-coded deployment path based on network's chain ID
  const deploymentPath = path.join(__dirname, `../ignition/deployments/chain-${network.chainId}/deployed_addresses.json`);

  // Check if the deployment file exists
  if (!fs.existsSync(deploymentPath)) {
    throw new Error(`Deployment file not found for ${contractName} on network ${network.chainId}`);
  }

  // Parse the deployment JSON file to fetch contract addresses
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));

  // Retrieve the contract address using the contract name as a key
  const address = deployment[contractName];
  if (!address) {
    throw new Error(`Contract ${contractName} not found in deployment file for network ${network.chainId}`);
  }

  return address;
}