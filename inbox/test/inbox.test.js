const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());
const INITIAL_MESSAGE = "Hi there !";

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("Deploy a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("Has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("Can change the message", async () => {
    const newMessage = "Bye";
    const txId = await inbox.methods
      .setMessage(newMessage)
      .send({ from: accounts[0], gas: "1000000" });
    console.log("TxId:", txId);
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
