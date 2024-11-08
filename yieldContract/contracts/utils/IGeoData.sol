// SPDX-License-Identifier: MIT

pragma solidity 0.8.25;

interface IGeoData {
    
    // Events (if you want to include events from the original contract)
    // event DataRequestTransmitted(bytes32 indexed dataRequestId);
    
    // State variables (These would be available for reading in the contract that implements the interface)
    function dataRequestId() external view returns (bytes32);
    function oracleProgramId() external view returns (bytes32);
    
    // Functions
    /**
     * @notice Transmit a new data request to the SEDA network through the SedaProver contract.
     * @param data The data input for the data request.
     * @return The ID of the newly created data request.
     */
    function transmit(bytes memory data) external returns (bytes32);

    /**
     * @notice Fetches the latest answer for the data request from the SEDA network.
     * @dev This function retrieves the result of the last data request and returns the price if consensus was reached.
     * @return The latest price as a bytes32, or 0 if no consensus was reached or if no request has been transmitted.
     */
    function latestAnswer() external view returns (bytes memory);
}
