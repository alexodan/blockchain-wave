// ✈️ Re-deploy
// So, now that we've updated our contract we need to do a few things:
// 1. We need to deploy it again.
// 2. We need to update the contract address on our frontend.
// 3. We need to update the abi file on our frontend.

// Why do we need to do all this? Well, it's because smart contracts are immutable.
// They can't change. They're permanent. That means changing a contract requires a redeploy.
// This will also reset all the variables since it'd be treated as a brand new contract.
// That means we'd lose all our wave data if we wanted to update the contract's code.

// Bonus: In #course-chat, can anyone tell me some solutions here?
// Where else could we store our wave data where we could update our
// contract's code and keep our original data around?
// There are quite a few solutions here let me know what you find!

// -------------------------------------------------------------------------------------------

// TODO: put this in an env maybe
// https://eth-rinkeby.alchemyapi.io/v2/nmIcYgBvuLqUd-IQbnqotUsWYszn5fY3
async function main() {
  const [owner, randoPerson, randoPerson2] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // Wait for the contract to be mined - hardhat creates 'fake miners' in your machine
  await waveContract.deployed();
  console.log("Contract address -- ", waveContract.address);
  console.log("Contract owned by -- ", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("A message!!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  // let allWaves = await waveContract.getAllWaves();
  // console.log(allWaves);

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.log(error));
