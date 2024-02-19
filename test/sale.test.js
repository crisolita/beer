// const { artifacts } = require("hardhat");
// const Sale = artifacts.require("Sale");
// const Sale2 = artifacts.require("SaleV2");
// const Token = artifacts.require("Resonance");
// const { Provider } = require("@ethersproject/abstract-provider");

// const {
//   expectEvent,
//   expectRevert,
//   time,
// } = require("@openzeppelin/test-helpers");
// const { web3 } = require("@openzeppelin/test-helpers/src/setup");
// const { expect } = require("chai");
// const { latest } = require("@openzeppelin/test-helpers/src/time");

// // this function include the decimals
// toBN = (num) => web3.utils.toBN(num + "0".repeat(18));

// toWei = (num) => web3.utils.toWei(num);
// fromWei = (num) => web3.utils.fromWei(num);

// contract(
//   "Sale",
//   ([owner, user, admin1, admin2, approve1, approve2, approve3]) => {
//     let token, sale, sale2;

//     beforeEach(async function () {
//       const maxSupply = toBN(10000);
//       token = await Token.new({ from: owner });
//       sale = await Sale.new({ from: owner });
//       sale2 = await Sale2.new({ from: owner });

//       sale.initialize(
//         maxSupply,
//         owner,
//         token.address,
//         "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
//         {
//           from: owner,
//         }
//       );

//       await token.mint(owner, maxSupply, { from: owner });
//       await token.approve(sale.address, maxSupply, { from: owner });
//     });

//     describe("Create phases", () => {
//       it("Create first phase", async function () {
//         const price = "5" /** 5$ per token*/,
//           min = toBN(2);
//         (supply = toBN(5000)),
//           (timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ]),
//           (percentToRelease = [10, 30, 50, 10]),
//           (dateEndPhase = Number(await time.latest()) + 3600);
//         /** the phase will last one hour */
//         const max = toBN(10);
//         const tx = await sale.createPhase(
//           true,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           time.duration.days(60),
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const phase = await sale.phases(1);
//         const hola = await sale2.addExternalBuy();

//         /** checking that the phase is created */
//         expect(phase.price.toString()).to.equal(
//           price.toString(),
//           "Phase price err"
//         );
//         expect(Number(phase.minimunEntry)).to.equal(
//           Number(min),
//           "Phase minimunEntry err"
//         );
//         expect(Number(phase.endAt)).to.equal(
//           Number(dateEndPhase),
//           "Phase ends err"
//         );
//         expect(Number(phase.supply)).to.equal(
//           Number(supply),
//           "Phase supply err"
//         );
//         expect(phase.isPublic).to.equal(true);
//         expect(phase.timelock.toString()).to.equal(
//           time.duration.days(60).toString()
//         );
//       });
//       it("Create first phase, buy tokens, cancel phase (by owner) and created another phase to buy", async function () {
//         const price = toBN(1),
//           min = toBN(2);
//         (supply = toBN(500)),
//           (timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ]),
//           (percentToRelease = [10, 30, 50, 10]),
//           (dateEndPhase =
//             Number(await time.latest()) +
//             3600) /** the phase will last one hour */;
//         const max = toBN(25);
//         const tx = await sale.createPhase(
//           true,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           time.duration.days(60),
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             min,
//             price,
//             dateEndPhase,
//             supply,
//             time.duration.days(60),
//             timeToRelease,
//             percentToRelease,
//             {
//               from: owner,
//             }
//           ),
//           "This phase isn't over"
//         );
//         expect((await token.balanceOf(user)).toString()).to.equal("0");

//         await sale.cancelPhase();

//         await sale.createPhase(
//           true,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           0,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );
//         await sale.buyToken(toBN(25), { from: user, value: toBN(25) });

//         expect((await token.balanceOf(user)).toString()).to.equal(
//           toBN(25).toString()
//         );
//       });

//       it("Errors creating phases", async function () {
//         const maxSupply = toBN(1000),
//           timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ],
//           percentToRelease = [10, 30, 50, 10];
//         /// err end date is now less one second
//         const max = toBN(25);
//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(2),
//             1,
//             (await time.latest()) - 1,
//             toBN(1),
//             time.duration.days(60),
//             timeToRelease,
//             percentToRelease,
//             {
//               from: owner,
//             }
//           ),
//           "The end of the phase should be greater than now"
//         );
//         /// err more that maxSupply (the current supply is maxSupply - phase one original supply)
//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             timeToRelease,
//             percentToRelease,
//             {
//               from: owner,
//             }
//           ),
//           "Not enough supply to mint"
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             timeToRelease,
//             percentToRelease,
//             {
//               from: user,
//             }
//           ),
//           `AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             timeToRelease,
//             [10, 100, 12, 15],
//             {
//               from: owner,
//             }
//           ),
//           "Percentages do not add to 100"
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             timeToRelease,
//             [10, 100, 12],
//             {
//               from: owner,
//             }
//           ),
//           "No match entry"
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             timeToRelease,
//             [10, 30, 0, 70],
//             {
//               from: owner,
//             }
//           ),
//           "No percent"
//         );

//         await expectRevert(
//           sale.createPhase(
//             true,
//             max,
//             toBN(1),
//             1,
//             (await time.latest()) + 1,
//             maxSupply + 20,
//             time.duration.days(60),
//             [0, 10, 10, 10],
//             percentToRelease,
//             {
//               from: owner,
//             }
//           ),
//           "No time"
//         );
//       });
//     });

//     describe("Vesting works", () => {
//       it("Should release token in the rigth time", async function () {
//         const price = toBN(5) /** 5$ per token */,
//           min = toBN(2);
//         (supply = toBN(5000)),
//           (timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ]),
//           (percentToRelease = [10, 30, 50, 10]),
//           (dateEndPhase =
//             Number(await time.latest()) +
//             time.duration.days(10)) /** the phase will last one hour */,
//           (timeLock = time.duration.days(60));
//         const max = toBN("400");
//         await sale.createPhase(
//           true,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           timeLock,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const currentPhaseNumber = Number(await sale.currentPhase());

//         const id = 1;

//         const preUserBalance = Number(await token.balanceOf(user));
//         const prePhaseSupply = Number(
//           (await sale.phases(currentPhaseNumber)).supply
//         );

//         await sale.buyToken(toBN("400"), {
//           from: user,
//           value: toWei("162"),
//         });
//         // call the ETH/BNB needed to this operation
//         const ethNeeded = price.mul(supply).div(await sale.getLatestPrice());
//         ///Err not enought tokens.
//         await expectRevert(
//           sale.buyToken(toBN(2500), { from: user, value: ethNeeded }),
//           "Too much tokens"
//         );

//         await expectRevert(
//           sale.release(id, { from: user }),
//           "Current time is before release time"
//         );

//         await time.increase(time.duration.days(15));

//         await sale.release(id, { from: user });
//         const posPhaseSupply = Number(
//           (await sale.phases(currentPhaseNumber)).supply
//         );

//         expect(preUserBalance).to.equal(0, "user phase one pre balance err");

//         // /// check the user have the token
//         expect(Number(await token.balanceOf(user))).to.equal(
//           Number((toBN("400") * 10) / 100),
//           "user phase one pos balance err"
//         );

//         await time.increase(time.duration.days(10));

//         await sale.release(id, { from: user });

//         expect(Number(await token.balanceOf(user))).to.equal(
//           Number((toBN("400") * 40) / 100),
//           "user phase one pos balance err"
//         );
//         await time.increase(time.duration.days(10));

//         await sale.release(id, { from: user });

//         expect(Number(await token.balanceOf(user))).to.equal(
//           Number((toBN("400") * 90) / 100),
//           "user phase one pos balance err"
//         );

//         await time.increase(time.duration.days(30));

//         await sale.release(id, { from: user });

//         expect(Number(await token.balanceOf(user))).to.equal(
//           Number((toBN("400") * 100) / 100),
//           "user phase one pos balance err"
//         );

//         await expectRevert(
//           sale.release(id, { from: user }),
//           "Already claim tokens"
//         );

//         await expectRevert(
//           sale.release(id, { from: owner }),
//           "This is not your id"
//         );

//         // /// check the phase supply decrase
//         expect(prePhaseSupply).to.equal(
//           posPhaseSupply + Number(toBN("400")),
//           "supply phase one balance err"
//         );
//       });
//     });

//     describe("End the phase diferent ways", () => {
//       it("Should end the phase (supply out)", async function () {
//         const dateEndPhase =
//             Number(await time.latest()) + time.duration.days(1),
//           supply = toBN(2500),
//           timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ],
//           percentToRelease = [10, 30, 50, 10],
//           isPublic = true,
//           min = toBN(2),
//           price = toBN(5);
//         const max = toBN(2500);

//         await sale.createPhase(
//           isPublic,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           time.duration.days(60),
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const currentPhaseNumber = await sale.currentPhase();

//         amountOfTokens = toBN(3);

//         // call the ETH/BNB needed to this operation
//         const ethNeeded = price.mul(supply).div(await sale.getLatestPrice());

//         // / err not enought ETH/BNB
//         await expectRevert(
//           sale.buyToken((await sale.phases(currentPhaseNumber)).supply, {
//             from: user,
//             value: ethNeeded - 1,
//           }),
//           "Not enough ETH/BNB"
//         );

//         /// Err not enought tokens.
//         await expectRevert(
//           sale.buyToken(toBN(1), { from: user, value: ethNeeded }),
//           "There are too few tokens"
//         );

//         await sale.buyToken((await sale.phases(currentPhaseNumber)).supply, {
//           from: user,
//           value: ethNeeded,
//         });

//         // Check that the initial phase is over
//         assert.isTrue(
//           Boolean((await sale.phases(currentPhaseNumber)).over),
//           "The phase is over"
//         );

//         // check supply
//         expect(Number((await sale.phases(0)).supply)).to.equal(
//           0,
//           "Not enought supply"
//         );
//       });

//       it("Should end the phase (time out)", async function () {
//         const dateEndPhase = Number(await time.latest()) + 3600,
//           supply = toBN(2500),
//           timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ],
//           percentToRelease = [10, 30, 50, 10],
//           isPublic = true,
//           min = toBN(1),
//           price = 10;
//         const max = supply;
//         await sale.createPhase(
//           isPublic,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           time.duration.days(60),
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         amountOfTokens = toBN(3);

//         //increase time to end the phase
//         await time.increase(time.duration.hours(2));

//         await expectRevert(
//           sale.buyToken(amountOfTokens, { from: user, value: toBN(10) }),
//           "This phase is over, wait for the next"
//         );
//       });
//     });

//     describe("Only owner functions works", () => {
//       it("Only owner can cancel the phase", async function () {
//         const dateEndPhase =
//             Number(await time.latest()) + time.duration.days(1),
//           supply = await sale.tokensRemainForSale(),
//           timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ],
//           percentToRelease = [10, 30, 50, 10];
//         const max = supply;
//         await sale.createPhase(
//           true,
//           max,
//           toBN(2),
//           5,
//           dateEndPhase,
//           supply,
//           25,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const currentPhaseNumber = Number(await sale.currentPhase());

//         await expectRevert(
//           sale.cancelPhase({ from: user }),
//           "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
//         );

//         await sale.cancelPhase({ from: owner });
//         assert.isTrue(
//           Boolean((await sale.phases(currentPhaseNumber)).over),
//           "The phase is over"
//         );
//       });
//     });

//     describe("Claims works", () => {
//       it("Should see id, time and percent to release", async function () {
//         const price = 278934 /** 278934$ per token*/,
//           min = toBN("9");
//         (supply = toBN(5000)),
//           (timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ]),
//           (percentToRelease = [10, 30, 50, 10]),
//           (dateEndPhase = Number(await time.latest()) + time.duration.days(10)),
//           (timeLock = 3600);

//         await sale.createPhase(
//           true,
//           supply,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           timeLock,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const id = "1";

//         const shop = await sale.buyToken(toBN("10"), {
//           from: user,
//           value: toWei("10"),
//         });

//         expectEvent(shop, "Purchase", {
//           _account: user,
//           _amount: toBN("10"),
//           _id: id,
//         });

//         await time.increase(time.duration.days(10));
//         expect(
//           (await sale.getPercentsToReleaseForID(id))[0].toString()
//         ).to.equal(percentToRelease[0].toString());
//         expect(
//           (await sale.getPercentsToReleaseForID(id))[1].toString()
//         ).to.equal(percentToRelease[1].toString());
//         expect(
//           (await sale.getPercentsToReleaseForID(id))[2].toString()
//         ).to.equal(percentToRelease[2].toString());
//         expect(
//           (await sale.getPercentsToReleaseForID(id))[3].toString()
//         ).to.equal(percentToRelease[3].toString());
//         await sale.release(id, { from: user });
//         expect((await sale.getWhenIsTheNextClaim(id)).toString()).to.equal(
//           (await sale.getTimesToReleaseForID(id))[1].toString()
//         );
//       });
//       it("Should recieve the purchase event and release event", async function () {
//         const price = 278934 /** 278934$ per token*/,
//           min = toBN("9");
//         (supply = toBN(5000)),
//           (timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ]),
//           (percentToRelease = [10, 30, 50, 10]),
//           (dateEndPhase =
//             Number(await time.latest()) +
//             time.duration.days(10)) /** the phase will last one hour */,
//           (timeLock = 3600);
//         const max = supply;
//         await sale.createPhase(
//           true,
//           max,
//           min,
//           price,
//           dateEndPhase,
//           supply,
//           timeLock,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         const id = "1";

//         const shop = await sale.buyToken(toBN("10"), {
//           from: user,
//           value: toWei("10"),
//         });

//         expectEvent(shop, "Purchase", {
//           _account: user,
//           _amount: toBN("10"),
//           _id: id,
//         });

//         await time.increase(time.duration.days(20));

//         const release = await sale.release(id, { from: user });

//         expectEvent(release, "Claims", { _id: id });
//       });
//     });

//     describe("WhitesList works", () => {
//       it("Can create and delete an entire whitelist", async function () {
//         expect(await sale.getWhitelist()).deep.to.equal([]);
//         const whitelist = [approve1, approve2, approve3];
//         await sale.addToWhitelist(whitelist);
//         expect(await sale.getWhitelist()).deep.to.equal(whitelist);
//         await sale.removeWhitelistedAddress();
//         expect(await sale.getWhitelist()).deep.to.equal([]);
//       });
//       it("Only the two admins can access to the private phase", async function () {
//         const dateEndPhase =
//             Number(await time.latest()) + time.duration.days(10),
//           supply = await sale.tokensRemainForSale(),
//           timeToRelease = [
//             time.duration.days(10),
//             time.duration.days(20),
//             time.duration.days(30),
//             time.duration.days(60),
//           ],
//           percentToRelease = [10, 30, 50, 10];

//         await sale.createPhase(
//           false,
//           supply,
//           toBN(2),
//           5,
//           dateEndPhase,
//           supply,
//           25,
//           timeToRelease,
//           percentToRelease,
//           {
//             from: owner,
//           }
//         );

//         // add the admin to a whitelist
//         await sale.addToWhitelist([admin1, admin2]);

//         // the ordinary user cannot buy because the phase is private

//         await expectRevert(
//           sale.buyToken(toBN(2), { from: user, value: toBN(20) }),
//           "This phase is private"
//         );
//       });
//     });
//   }
// );
