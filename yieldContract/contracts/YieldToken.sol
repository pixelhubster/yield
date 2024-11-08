// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";

contract YieldToken is ERC1155, OwnerIsCreator, IERC1155Receiver {
    IERC721 public landTokenContract; // Link to the ERC721 land contract

    struct YieldData {
        uint256 landTokenId;
        string yieldType;
        uint256 season;
        uint256 totalYield; // in units (e.g., kg, tons)
    }
    struct ListSupply {
        uint256 yieldId;
        uint256 amount;
        uint256 pricePerShare;
    }

    mapping(uint256 => YieldData) public yieldData; // yieldId => YieldData
    mapping(uint256 => uint256) public totalSupply;
    ListSupply[] public listSupply;
    uint256 public nextCropId;

    event YieldMinted(
        address indexed owner,
        uint256 indexed yieldId,
        uint256 indexed landTokenId,
        string yieldType,
        uint256 amount
    );
    event BurnYield(
        address indexed owner,
        uint256 indexed yieldId,
        uint256 amount
    );
    event SharePurchased(
        uint256 indexed listId,
        uint256 indexed yieldId,
        uint256 amount
    );
    event YieldListed(
        uint256 indexed listId,
        uint256 indexed yieldId,
        uint256 amount,
        uint256 pricePerShare
    );

    constructor(address _landTokenContract, string memory _uri) ERC1155(_uri) {
        landTokenContract = IERC721(_landTokenContract); // Associate the land ownership
    }

    function mintYield(
        uint256 landTokenId,
        string memory yieldType,
        uint256 season,
        uint256 totalYield, // Total yield in units
        uint256 amount
    ) public {
        require(
            landTokenContract.ownerOf(landTokenId) == msg.sender,
            "You don't own the land for this crop."
        );

        uint256 yieldId = nextCropId;
        nextCropId++;

        yieldData[yieldId] = YieldData({
            landTokenId: landTokenId,
            yieldType: yieldType,
            season: season,
            totalYield: totalYield
        });

        _mint(msg.sender, yieldId, amount, "");
        totalSupply[yieldId] = amount;

        emit YieldMinted(msg.sender, yieldId, landTokenId, yieldType, amount);
    }

    function getYieldData(
        uint256 yieldId
    ) public view returns (YieldData memory) {
        return yieldData[yieldId];
    }

    function burnYield(uint256 yieldId, uint256 amount) public {
        require(
            balanceOf(msg.sender, yieldId) >= amount,
            "Insufficient token balance to burn."
        );
        _burn(msg.sender, yieldId, amount);
        totalSupply[yieldId] -= amount;
        emit BurnYield(msg.sender, yieldId, amount);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function listTokenForSale(
        uint256 yieldId,
        uint256 amount,
        uint256 pricePerShare
    ) external {
        require(balanceOf(msg.sender, yieldId) > 0, "Must be owner of token");
        require(
            amount <= balanceOf(msg.sender, yieldId),
            "Amount exceeded balance"
        );

        isApprovedForAll(msg.sender, address(this));
        ListSupply memory newList = ListSupply({
            yieldId: yieldId,
            amount: amount,
            pricePerShare: pricePerShare
        });
        listSupply.push(newList);
        safeTransferFrom(msg.sender, address(this), yieldId, amount, "");
        emit YieldListed(listSupply.length - 1, yieldId, amount, pricePerShare);
    }

    function buyShare(
        uint256 listId,
        uint256 yieldId,
        uint256 amount
    ) public payable {
        require(amount <= listSupply[listId].amount, "Token amount exceeded");
        uint256 paymentAmount = listSupply[listId].pricePerShare * amount;
        require(msg.value == paymentAmount, "Incorrect amount");

        safeTransferFrom(address(this), msg.sender, yieldId, amount, "");
        delete listSupply[listId];
        emit SharePurchased(listId, yieldId, amount);
    }

    //to be added: removeTokenFromSale

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function _totalSupply(uint256 yieldId) public view returns (uint256) {
        return totalSupply[yieldId];
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external override returns (bytes4) {}
}
