// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { YieldToken } from "./YieldToken.sol";
import { IERC1155Receiver, IERC165 } from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";
import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract YieldLending is IERC1155Receiver, OwnerIsCreator, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct LoanDetails {
        uint256 yieldAmountSupplied; // Amount of crop tokens supplied as collateral
        uint256 usdcAmountLoaned; // Amount of USDC loaned
        uint256 usdcLiquidationThreshold; // Liquidation threshold in USDC
    }

    YieldToken internal immutable i_yieldToken; // The crop token contract
    address internal immutable i_usdc; // USDC token address
    AggregatorV3Interface internal s_usdcUsdAggregator; // Chainlink USDC price feed
    uint32 internal s_usdcUsdFeedHeartbeat; // Price feed heartbeat

    uint256 internal immutable i_ltvInitialThreshold; // Initial loan-to-value (LTV) ratio
    uint256 internal immutable i_ltvLiquidationThreshold; // Liquidation threshold (LTV)

    mapping(uint256 => mapping(address => LoanDetails)) internal s_activeLoans; // Track active loans by tokenId and borrower

    event YieldLoaned(
        uint256 indexed yieldId, 
        address indexed borrower, 
        uint256 yieldAmount, 
        uint256 loanAmount, 
        uint256 liquidationThreshold
    );
    event LoanRepayed(uint256 indexed yieldId, address indexed borrower, uint256 yieldAmount);
    event LoanLiquidated(uint256 indexed yieldId, address indexed borrower);

    error AlreadyBorrowed(address borrower, uint256 yieldId);
    error OnlyYieldTokenSupported();
    error InvalidValuation();
    error SlippageToleranceExceeded();
    error PriceFeedDdosed();
    error InvalidRoundId();
    error StalePriceFeed();
    error NothingToRepay();

    constructor(
        address yieldTokenAddress,
        address usdc,
        address usdcUsdAggregatorAddress,
        uint32 usdcUsdFeedHeartbeat
    ) {
        i_yieldToken = YieldToken(yieldTokenAddress);
        i_usdc = usdc;
        s_usdcUsdAggregator = AggregatorV3Interface(usdcUsdAggregatorAddress);
        s_usdcUsdFeedHeartbeat = usdcUsdFeedHeartbeat;

        i_ltvInitialThreshold = 60; // 60% initial LTV
        i_ltvLiquidationThreshold = 75; // 75% liquidation LTV
    }

    function borrow(
        uint256 yieldId,
        uint256 yieldAmount, // Fraction of crop tokens to be collateralized
        bytes memory data,
        uint256 minLoanAmount,
        uint256 maxLiquidationThreshold
    ) external nonReentrant {
        if (s_activeLoans[yieldId][msg.sender].usdcAmountLoaned != 0) revert AlreadyBorrowed(msg.sender, yieldId);

        uint256 cropValuationInUsdc = getYieldValuationInUsdc(yieldId) * yieldAmount / i_yieldToken._totalSupply(yieldId);
        if (cropValuationInUsdc == 0) revert InvalidValuation();

        uint256 loanAmount = (cropValuationInUsdc * i_ltvInitialThreshold) / 100;
        if (loanAmount < minLoanAmount) revert SlippageToleranceExceeded();

        uint256 liquidationThreshold = (cropValuationInUsdc * i_ltvLiquidationThreshold) / 100;
        if (liquidationThreshold > maxLiquidationThreshold) revert SlippageToleranceExceeded();

        i_yieldToken.safeTransferFrom(msg.sender, address(this), yieldId, yieldAmount, data);

        s_activeLoans[yieldId][msg.sender] = LoanDetails({
            yieldAmountSupplied: yieldAmount,
            usdcAmountLoaned: loanAmount,
            usdcLiquidationThreshold: liquidationThreshold
        });

        IERC20(i_usdc).safeTransfer(msg.sender, loanAmount);

        emit YieldLoaned(yieldId, msg.sender, yieldAmount, loanAmount, liquidationThreshold);
    }

    function repay(uint256 yieldId) external nonReentrant {
        LoanDetails memory loanDetails = s_activeLoans[yieldId][msg.sender];
        if (loanDetails.usdcAmountLoaned == 0) revert NothingToRepay();

        delete s_activeLoans[yieldId][msg.sender];

        IERC20(i_usdc).safeTransferFrom(msg.sender, address(this), loanDetails.usdcAmountLoaned);

        i_yieldToken.safeTransferFrom(address(this), msg.sender, yieldId, loanDetails.yieldAmountSupplied, "");

        emit LoanRepayed(yieldId, msg.sender, loanDetails.yieldAmountSupplied);
    }

    function liquidate(uint256 yieldId, address borrower) external {
        LoanDetails memory loanDetails = s_activeLoans[yieldId][borrower];

        uint256 cropValuationInUsdc = getYieldValuationInUsdc(yieldId) * loanDetails.yieldAmountSupplied / i_yieldToken._totalSupply(yieldId);
        if (cropValuationInUsdc == 0) revert InvalidValuation();

        uint256 liquidationThreshold = (cropValuationInUsdc * i_ltvLiquidationThreshold) / 100;
        if (liquidationThreshold < loanDetails.usdcLiquidationThreshold) {
            delete s_activeLoans[yieldId][borrower];

            emit LoanLiquidated(yieldId, borrower);
        }
    }

    function getUsdcPriceInUsd() public view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = s_usdcUsdAggregator.latestRoundData();

        if (updatedAt < block.timestamp - s_usdcUsdFeedHeartbeat) {
            revert StalePriceFeed();
        }

        return uint256(price);
    }

    function getYieldValuationInUsdc(uint256 yieldId) public view returns (uint256) {
        YieldToken.YieldData memory yieldData = i_yieldToken.getYieldData(yieldId);

        // using crop yield as evaluation metrics, will adapt to use ai models for crop growth prediction in the future.
        uint256 valuation = yieldData.totalYield;

        uint256 usdcPriceInUsd = getUsdcPriceInUsd();
        uint256 normalizedValuation = Math.mulDiv(valuation, 10**6, usdcPriceInUsd); // Adjusting for USDC decimals

        return normalizedValuation;
    }

    function setUsdcUsdPriceFeedDetails(address usdcUsdAggregatorAddress, uint32 usdcUsdFeedHeartbeat) external onlyOwner {
        s_usdcUsdAggregator = AggregatorV3Interface(usdcUsdAggregatorAddress);
        s_usdcUsdFeedHeartbeat = usdcUsdFeedHeartbeat;
    }

    function onERC1155Received(
        address, /* operator */
        address, /* from */
        uint256, /* id */
        uint256, /* value */
        bytes calldata /* data */
    ) external nonReentrant returns (bytes4) {
        if (msg.sender != address(i_yieldToken)) {
            revert OnlyYieldTokenSupported();
        }

        return IERC1155Receiver.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address, /*operator*/
        address, /*from*/
        uint256[] calldata, /*ids*/
        uint256[] calldata, /*values*/
        bytes calldata /*data*/
    ) external view returns (bytes4) {
        if (msg.sender != address(i_yieldToken)) {
            revert OnlyYieldTokenSupported();
        }
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165) returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId || interfaceId == type(IERC165).interfaceId;
    }
}
