require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")

const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_INFURIA_API_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  },
};
