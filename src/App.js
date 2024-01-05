import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {

  state = {  //if you declare a variable inside the class body, it is automatically moved to the constructor method
    manager: '' , 
    players: [], 
    balance: '',
    value: '',
    message: ''
  };

  onSubmit = async (event) => {
    event.preventDefault(); // prevent form submission by itself automatically

    this.setState({ message: 'Waiting on transaction success...' });

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0], 
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });

  }
  
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting...' });

    await lottery.methods.pickwinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  }

  async componentDidMount() { //it is called automatically after the component are rendered to the screen
    const manager = await lottery.methods.manager().call(); //called by the default account on metamask for call()
    const players = await lottery.methods.getplayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); 
    this.setState({ manager, players, balance });
  }
  
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
          <p>This contract is managed by {this.state.manager}.
            There are currently {this.state.players.length} people entered, 
            competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!
          </p>
          
          <hr />
          
          <form onSubmit={this.onSubmit}>
            <h4>Try your luck</h4>
              <div>
              <label>Amount of ether to enter greater than 0.1 ether </label>
              <input 
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
              />          
              </div> 
              <button>Enter</button>           
          </form>
          
          <hr />

          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner!</button>

          <hr />

          <h3>{this.state.message}</h3>
          
      </div>
    );
  }
}

export default App;
