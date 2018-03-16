import React from 'react';
import axios from 'axios';

class App extends React.Component {


  handleClick() {
    axios.post('/test')
    .then((res) => {
      console.log('hello')
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>I am just a boy living in a chinese world.</h1>
          <button onClick={this.handleClick} >This is Test Button</button>
        </header>
      </div>
    )
  }
}

export default App;
