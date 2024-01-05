import Web3 from 'web3';
 
window.ethereum.request({ method: "eth_requestAccounts" });
//requesting access to account

const web3 = new Web3(window.ethereum);
//connecting provider to web3
 
export default web3;