const { ethers } = require("hardhat");

const TOKEN_CONTRACT_NAME = "AtomicBeer";
const name_ = "AtomicBeer",
  symbol_ = "BEER",
  totalSupply_ = "1000000000000000000000",
  addrs = [
    "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
    "0x8954AfA98594b838bda56FE4C12a09D7739D179b",
    "0x995E8A8b39f342880802A3A3a16d57B1c503Bf52",
    "0x995E8A8b39f342880802A3A3a16d57B1c503Bf52",
    "0x995E8A8b39f342880802A3A3a16d57B1c503Bf52",
  ],
  // reward, router, marketing
  // wallet, dividendTracker, anti bot (arreglo de address(5))
  feeSettings = ["1000000000000000", "200000000000000", "300000000000000"], // rewards, liquidity,
  // marketing (arreglo de fees)
  minimumTokenBalanceForDividends_ = "1000000000000000",
  serviceFeeReceiver_ = "0x995E8A8b39f342880802A3A3a16d57B1c503Bf52",
  serviceFee_ = "200000000000000";
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const namedAccounts = await getNamedAccounts();
  const { deployer } = namedAccounts;
  const deployResult = await deploy("AtomicBeer", {
    from: deployer,
    args: [
      name_,
      symbol_,
      totalSupply_,
      addrs,
      // reward, router, marketing
      // wallet, dividendTracker, anti bot (arreglo de address(5))
      feeSettings, // rewards, liquidity,
      // marketing (arreglo de fees)
      minimumTokenBalanceForDividends_,
      serviceFeeReceiver_,
      serviceFee_,
    ],
    log: true,
    gasLimit: 400000000,
    value: ethers.utils.parseEther("0.1"),
  });
};
module.exports.tags = [TOKEN_CONTRACT_NAME];
