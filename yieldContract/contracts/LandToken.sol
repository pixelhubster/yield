// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {FunctionsSource} from "./landSource.sol";
import {IGeoData} from "./utils/IGeoData.sol";

contract LandToken is ERC721URIStorage, OwnerIsCreator, FunctionsSource, FunctionsClient {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using FunctionsRequest for FunctionsRequest.Request;
    IGeoData public geoDataContract;

    struct LandDetails {
        address owner;
        string lat;
        string log;
        string polygonId;
    }

    error OnlyAutomationForwarderOrOwnerCanCall();

    address internal s_automationForwarderAddress;
    LandDetails[] public landDetailsArray;
    string public ipfsHash;
    

    event Registered(address indexed owner, uint256 indexed tokenId, string tokenURI, string coordinates);
    event LandDailyReport(uint256 date, bytes32 requestId);
    event UpdateSuccessfull(string hash, uint256 date);
    event RemovedToken(uint256 tokenId);

    constructor(address functionRouterAddress, address geoDataAddress) FunctionsClient(functionRouterAddress) ERC721("Land", "LND") {
      geoDataContract = IGeoData(geoDataAddress);
    }

    modifier onlyAutomationForwarderOrOwner() {
        if (msg.sender != s_automationForwarderAddress && msg.sender != owner()) {
            revert OnlyAutomationForwarderOrOwnerCanCall();
        }
        _;
    }

    function setAutomationForwarder(address automationForwarderAddress) external onlyOwner {
        s_automationForwarderAddress = automationForwarderAddress;
    }

    // Register new land parcel, mint token, and store land details
    function register(
        string memory tokenURI, 
        string memory coordinates, 
        string memory lat, 
        string memory lon, 
        string memory polygonId
    ) 
        external 
        returns (uint256) 
    {
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        landDetailsArray.push(LandDetails({
            owner: msg.sender,
            lat: lat,
            log: lon,
            polygonId: polygonId
        }));

        emit Registered(msg.sender, newTokenId, tokenURI, coordinates);
        _tokenIds.increment();
        return newTokenId;
    }

    // Update daily report data (e.g., soil, weather) on IPFS for a specific land token
    function updateDailyData(uint64 subscriptionId, uint32 gasLimit, bytes32 donID) public returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(this.getData());

        requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donID);
        emit LandDailyReport(block.timestamp, requestId);
    }

    // Forcefully remove land by burning its token (useful if land deed is invalid)
    function remove(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        delete landDetailsArray[tokenId];
        emit RemovedToken(tokenId);
    }

    // Retrieve all land details
    function getAllLandDetails() public  view returns (LandDetails[] memory) {
        return landDetailsArray;
    }

    // Retrieve specific land details for a tokenId
    function getLandDetails(uint256 tokenId) public view returns (LandDetails memory) {
        return landDetailsArray[tokenId];
    }

   //  function getLandGeo(string memory appId, uint tokenId) public returns (bytes memory) {
   //    LandDetails memory land = landDetailsArray[tokenId];
   //     string memory format = string(abi.encodePacked(appId, "/", land.polygonId, "/", land.lat, "/", land.log));
        
   //      bytes memory input = bytes(abi.encodePacked(format));
   //      geoDataContract.transmit(input);
   //      return geoDataContract.latestAnswer();
   //  }
    function getLandGeo(string memory appId, uint tokenId) public returns (bytes memory) {
    LandDetails memory land = landDetailsArray[tokenId];
    string memory format = string.concat(appId, "/", land.polygonId, "/", land.lat, "/", land.log);
    bytes memory input = bytes(format);
    geoDataContract.transmit(input);
    return input;
   }

    function fulfillRequest(bytes32, /*requestId*/ bytes memory response, bytes memory err) internal override {
        if (err.length != 0) {
            revert(string(err));
        }
        ipfsHash = string(response);
        emit UpdateSuccessfull(ipfsHash, block.timestamp);
    }
}
