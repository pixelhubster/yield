// SPDX-License-Identifier: MIT
// NOTICE: This is an example contract with no security considerations taken into account.
// This contract is for educational purposes only and should not be used in production environments.

pragma solidity 0.8.25;

import "@seda-protocol/contracts/src/SedaProver.sol";

/**
 * @title GeoData
 * @notice This contract demonstrates how to create and interact with data requests on the SEDA network.
 * It interacts with the SedaProver contract for transmitting data requests and fetching results.
 */
contract GeoData {
    // ID of the most recent data request.
    bytes32 public dataRequestId;

    // ID of the data request WASM binary on the SEDA network.
    bytes32 public oracleProgramId;

    // Instance of the SedaProver contract, which verifies the authenticity of data request results.
    SedaProver public sedaProverContract;

    /**
     * @notice Initializes the contract with the SedaProver contract and the binary ID for the data request.
     * @param _sedaProverContract Address of the deployed SedaProver contract.
     * @param _oracleProgramId The ID of the WASM binary that handles the data request.
     */
    constructor(address _sedaProverContract, bytes32 _oracleProgramId) {
        sedaProverContract = SedaProver(_sedaProverContract);
        oracleProgramId = _oracleProgramId;
    }

    /**
     * @notice Triggers the transmission of new data request to the SEDA network through the SedaProver contract.
     * @dev This function sends a request to fetch the Geographical data of the polygon id from the SEDA network.
     * @return The ID of the newly created data request.
     */
    function transmit(bytes memory data) public returns (bytes32) {
         // string memory input = abi.decode(data, (string));                
        SedaDataTypes.DataRequestInputs memory inputs = SedaDataTypes
            .DataRequestInputs(
                oracleProgramId,                // Oracle Program ID (0x...)
                data,                          // Inputs for the data request (ETH-USDC)
                oracleProgramId,                // Tally binary ID (same as DR binary ID in this example)
                hex"00",                        // Tally inputs
                1,                              // Replication factor (number of nodes required to execute the DR)
                hex"00",                        // Consensus filter (set to `None`)
                1,                              // Gas price
                5000000,                        // Gas limit
                abi.encodePacked(block.number)  // Additional info (block number as memo)
            );

        // Post the data request to the SedaProver contract and store the request ID.
        dataRequestId = sedaProverContract.postDataRequest(inputs);

        return dataRequestId;
    }

    /**
     * @notice Fetches the latest answer for the data request from the SEDA network.
     * @dev This function retrieves the result of the last data request and returns the price if consensus was reached.
     * @return The latest price as a uint128, or 0 if no consensus was reached or if no request has been transmitted.
     */
    function latestAnswer() public view returns (bytes memory) {
        // Ensure a data request has been transmitted.
        require(dataRequestId != bytes32(0), "No data request transmitted");

        // Fetch the data result from the SedaProver contract using the stored data request ID.
        SedaDataTypes.DataResult memory dataResult = sedaProverContract
            .getDataResult(dataRequestId);

        // Check if the data result reached consensus (≥ 66% agreement among nodes).
        if (dataResult.consensus) {
            // return uint128(bytes16(dataResult.result));
            return abi.encode(dataResult.result);
        }
        // Return 0 if no valid result or no consensus.
        return new bytes(0);
    }
}
