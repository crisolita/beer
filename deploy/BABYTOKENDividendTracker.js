const TOKEN_CONTRACT_NAME = "BABYTOKENDividendTracker";

const rewardToken_ = "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832";
const minimumTokenBalanceForDividends_ = "100";
module.exports = async ({
  getNamedAccounts,
  deployments,

  getUnnamedAccounts,
}) => {
  const { deploy, log } = deployments;
  const namedAccounts = await getNamedAccounts();
  const { deployer } = namedAccounts;
  const deployResult = await deploy("BABYTOKENDividendTracker", {
    proxy: {
      owner: deployer,
      execute: {
        init: {
          methodName: "initialize",
          args: [rewardToken_, minimumTokenBalanceForDividends_],
        },
      },
    },
    log: true,
  });
};
module.exports.tags = [TOKEN_CONTRACT_NAME];
