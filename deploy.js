const env = require("dotenv");
const HDWalletPrdvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { Inbox, Lottery } = require("./compile");

env.config();

const INITIAL_MESSAGE = "Hi there !";
const provider = new HDWalletPrdvider(
  process.env.MNEMONICS,
  process.env.INFURA_RINKEBY_API
);

const web3 = new Web3(provider);

const deploy = async (name, abi, evm, arguments) => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy contract " + name + " from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract " + name + " deployed to", result.options.address);
  provider.engine.stop();
};

//console.log("****** Deploy Inbox contract")
//deploy("Inbox", Inbox.abi, Inbox.evm, [INITIAL_MESSAGE]);

console.log("***** Deploy Lottery contract")
console.log("Lottery contract ABI", JSON.stringify(Lottery.abi));
deploy("Lottery", Lottery.abi, Lottery.evm);
