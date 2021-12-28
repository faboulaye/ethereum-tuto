const path = require("path");
const fs = require("fs");
const solc = require("solc");

function compiler(contract) {
  const contractPath = path.resolve(__dirname, "contracts", contract);
  const source = fs.readFileSync(contractPath, "utf-8");

  const input = {
    language: "Solidity",
    sources: {
      contract: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  const compile = solc.compile(JSON.stringify(input));
  return JSON.parse(compile).contracts.contract;
}

const Inbox = compiler("Inbox.sol").Inbox;
const Lottery = compiler("Lottery.sol").Lottery;
console.log("Lottery contract ABI", JSON.stringify(Lottery.abi));

module.exports = { Inbox, Lottery };
