import React from 'react';
import Navigation from './managerNav.jsx';
import SalesLine from './salesLine.jsx';
import Navbar from './navbar.jsx';

const SaleInfo = () => (
  <div>
    <Navbar />
    <div className="managerScreenGrid">
      <div className="manager-navigation"><Navigation /></div>
      <div className="graphGrid">
        <div className="lineChart">
          <SalesLine />
        </div>
        <button>By Employee</button>
      </div>
      <div className="statsGrid">Sale Info Stats</div>
    </div>
  </div>
);

export default SaleInfo;
