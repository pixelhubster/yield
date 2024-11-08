# Yield
[Website](https://agricyield.vercel.app/)

## Overview
**Yield** is a decentralized lending platform built on blockchain technology, allowing users to borrow against their assets securely. The platform facilitates loans using USDC and supports the ERC-1155 standard for tokenized assets, making it suitable for various applications like land and crop financing.

## Features
- **Decentralized Lending:** Users can borrow funds using their tokenized assets as collateral.
- **Multi-Asset Support:** Compatible with ERC-1155 tokens, allowing various asset types to be used as collateral.
- **Transparent Transactions:** All transactions are recorded on the blockchain for complete transparency.
- **User-Friendly Interface:** A clean and intuitive frontend for seamless user interaction.

## Getting Started

### Prerequisites
- Node.js
- Yarn or npm
- Metamask or any compatible wallet

**Project Structure:**
- **/frontend**: Platform's Frontend implemented using Nextjs
- **/yieldContract**: Land Tonization, Borrowing and seda (for smart contract)
- **/seda**: Seda Request and other implementations of seda protocol
- **/graph**: The Graph implementation to query the blockchain

    
### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/pixelhubster/yield.git
    cd yield/frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory:
    ```plaintext
    REACT_APP_AGROMONITORING_API_KEY=your_api_key
    ..etc
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Connect your wallet (e.g., Metamask) to the YieldLending platform.
2. Register Land and get ERC-721 ownership token.
3. Register Yield to grow on land and list yield Token for sale.
4. Use the lending features to borrow against your tokenized assets.

## Contract Addresses
- **Land Token Contract (ERC-721):** `0x810cB15e1fb9954d2513fD5Eb490f084a49416c7`
- **Yield Token Contract (ERC-1155):** `0x10B365BC4043Fb4500c33a06EdFA9cc4b255A6eC`
- **YieldLending Contract:** `0x5a176Aa95797955ce405a39dfbDa6F3209F9cBA0`
- **Orcacle program Id:** `999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77`

## Oracle And API endpoints
Used this endpoints in my seda program call to fetch soil and weather data of land.
input for oracle program: appId/polygonId/latitude/longitude
**OracleId:** `999bf15ed4fa3ef94347a97918427419a04981453a8a309140e0fe722a886b77`
**Sample Transaction Hash:** [https://devnet.explorer.seda.xyz/data-requests/7b6b8f3bd24d50bb5cc8967f6c008067f529513319a142b803dac5a7f73f010b](https://devnet.explorer.seda.xyz/data-requests/7b6b8f3bd24d50bb5cc8967f6c008067f529513319a142b803dac5a7f73f010b)
**sample for replication**: `720ee6ba01017d67d198d3f11517f5bc/6729ebda7fc9dc4a1e7734ba/51.56297825/-0.0352305`
- **Polygon Creation:**
    - Endpoint: `http://api.agromonitoring.com/agro/1.0/polygons`
    - Method: `POST`
    - Parameters: `appid, duplicated, geo_json`
    
- **Soil Data Retrieval:**
    - Endpoint: `https://api.agromonitoring.com/agro/1.0/soil`
    - Method: `GET`
    - Parameters: `polyid, appid`

- **Weather Data Retrieval:**
    - Endpoint: `https://api.agromonitoring.com/agro/1.0/weather`
    - Method: `GET`
    - Parameters: `lat, lon, appid`

## Features
- **Data Fetching:** Chain Link function retrieves data from a our platforms API endpoint to get daily weather and soil data for all the lands registered.
- **Chainlink Automation:** Schedules the function to run daily, ensuring data is consistently updated.
- **IPFS Storage:** Stores the fetched data's IPFS hash on the blockchain for easy retrieval and verification.
- **Data Feeds:** Gets the usdc price feed for borrowing and repay of loan on our platform.

## Functionality
1. **Data Fetching Function:** 
   - Fetches data from the platform's API.
   - Processes and stores the data.
   - Saves the IPFS hash of the data on the blockchain.

2. **Chainlink Automation:** 
   - Utilizes Chainlink Automation to trigger the data fetching function daily, ensuring that the latest data is always available on the blockchain.


## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature/YourFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add YourFeature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, please reach out to:
- **Noble Nyuiela**: [pixelhubster@gmail.com](mailto:pixelhubster@gmail.com)

## Acknowledgements
- [Agromonitoring](https://agromonitoring.com/) for their API services.
- [OpenZeppelin](https://openzeppelin.com/) for their ERC standards.
- Contributors and supporters of the YieldLending project.

