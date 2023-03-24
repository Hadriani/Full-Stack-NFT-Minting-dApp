const hre = require("hardhat");

async function main() {
  
  const GenesysNFT = await hre.ethers.getContractFactory("GenesysNFT");
  const genesysNFT = await GenesysNFT.deploy();

  await genesysNFT.deployed();

  console.log("GenesysNFT deployed to:", genesysNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
