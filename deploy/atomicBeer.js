const { ethers } = require("hardhat");

const TOKEN_CONTRACT_NAME = "AtomicBeer";
const name_ = "AtomicBeer",
  symbol_ = "BEER",
  totalSupply_ = "1000000000000000000000";

// reward, router, marketing
// wallet, dividendTracker,
(feeSettings = ["5", "5", "10"]), // rewards, liquidity,
  // marketing (arreglo de fees)
  (minimumTokenBalanceForDividends_ = "10"),
  (serviceFeeReceiver_ = "0x995E8A8b39f342880802A3A3a16d57B1c503Bf52"),
  (serviceFee_ = "20");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const babyTokenDividen = await deployments.get("BABYTOKENDividendTracker");
  addrs = [
    "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
    "0x8954AfA98594b838bda56FE4C12a09D7739D179b",
    "0x42aeA5e22fCcA2A46E93A0eECf8a4b9b016D9346",
    babyTokenDividen.address,
  ];
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
      // wallet, dividendTracker,
      feeSettings, // rewards, liquidity,
      // marketing (arreglo de fees)
      minimumTokenBalanceForDividends_,
      serviceFeeReceiver_,
      serviceFee_,
    ],
    log: true,
    gasLimit: 805182,
    value: ethers.utils.parseEther("0.1"),
  });
};
module.exports.tags = [TOKEN_CONTRACT_NAME];
module.exports.dependencies = ["BABYTOKENDividendTracker"];
