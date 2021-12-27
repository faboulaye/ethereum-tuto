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

const deploy = async (abi, evm, arguments) => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy(Inbox.abi, Inbox.evm, [INITIAL_MESSAGE]);
deploy(Lottery.abi, Lottery.evm);