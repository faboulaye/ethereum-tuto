import Web3 from "web3";

const { ethereum } = window;
if (!ethereum) console.error("Please install metamask");
ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(ethereum);

export default web3;
