import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const  user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
const  element = <p tabIndex="0" data-hel="0" >Hello, world! app.js{formatName(user)}</p>;
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{element}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
