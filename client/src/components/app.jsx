import React from 'react';
import axios from 'axios';

import SaleScreen from './saleScreen.jsx';
import ManagerScreen from './managerScreen.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div>
        {/* <SaleScreen /> */}
        <ManagerScreen />
      </div>
    );
  }
}
