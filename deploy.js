const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { abi, evm } = require("./compile");

require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.SEED_PHRASE,
  process.env.RINKEBY_HTTP
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: "1000000", from: accounts[0] })
    .catch((err) => {
      console.log(err);
    });
  console.log(result);
  provider.engine.stop();
};
deploy();
