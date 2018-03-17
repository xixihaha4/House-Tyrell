import React from 'react';
import axios from 'axios';
import Login from './login.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <header>
          <h1>I am just a boy living in a chinese world.</h1>
        </header>
        <Login />
      </div>
    );
  }
}
