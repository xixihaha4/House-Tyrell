import React from 'react';
import axios from 'axios';

import SaleScreen from './saleScreen.jsx';
// import ManagerHome from './managerHome.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <SaleScreen />
        {/* <ManagerHome /> */}
      </div>
    );
  }
}
