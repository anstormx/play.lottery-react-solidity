import "./App.css";
import React from "react";
import lottery from "./lottery";

class App extends React.Component {

  state = { manager: "" };
  //if you declare a variable inside the class body, it is automatically moved to the constructor method

  async componentDidMount() { //it is called automatically after the component are rendered to the screen
    const manager = await lottery.methods.manager().call(); //called by the default account on metamask
    console.log(manager);
    console.log('hell');
    this.setState({ manager });
  }
  
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.</p>
      </div>
    );
  }
}

export default App;
