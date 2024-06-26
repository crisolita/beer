/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("hardhat-contract-sizer");

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("chai");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

let mnemonic = process.env.MNEMONIC
  ? process.env.MNEMONIC
  : "test test test test test test test test test test test test";

module.exports = {
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        blockNumber: 14679140,
      },
    },
    testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [process.env.TESTNETPRIVKEY],
    },
    mainnet: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: [process.env.MAINNETPRIVKEY],
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API,
  },
  namedAccounts: {
    deployer: 0,
    feeRecipient: 1,
    user: 2,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 50,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.CMC_API_KEY,
    excludeContracts: ["mocks/"],
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 240000,
  },
};
