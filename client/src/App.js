import { useState } from "react";
import "./App.css";
import lottery from "./Lottery";
import web3 from "./web3";

function App() {
  const [manager, setManager] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
  const [ethers, setEthers] = useState("");
  const [players, setPlayers] = useState([]);

  async function componentDidMount() {
    const playersFromFetch = await lottery.methods.getPlayers().call();
    const managerFromFetch = await lottery.methods.manager().call();
    const balanceFromFetch = await web3.eth.getBalance(lottery.options.address);
    setBalance(balanceFromFetch);
    setManager(managerFromFetch);
    setPlayers(playersFromFetch);
  }

  componentDidMount();

  let pickAWinner = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setWinnerMessage("Picking a winner...");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setWinnerMessage(`The winner is picked`);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage("Transaction in progress");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ethers, "ether"),
    });

    setMessage();
  };

  return (
    <div className="App">
      <h1>Lottery Solidity Project</h1>
      <div>Manager of the project: {manager}</div>
      <div>
        In the pool there are {players.length} competing for the balance of the
        project {web3.utils.fromWei(balance, "ether")} ether!
      </div>
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              onChange={(event) => setEthers(event.target.value)}
              name="name"
              step="any"
              type="number"
            />
          </div>
        </div>
        <button type="submit">Good Luck!</button>
      </form>
      {message}
      <div>
        <h1>Let's pick a winner</h1>
        <button onClick={pickAWinner}>Pick a winner</button>
      </div>
      {winnerMessage}
    </div>
  );
}

export default App;
