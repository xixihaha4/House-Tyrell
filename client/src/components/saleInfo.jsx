import React from 'react';
import Navigation from './managerNav.jsx';
import SalesLine from './salesLine.jsx';

const SaleInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">
        <div className="graph">
          <SalesLine />
        </div>
        <button>By Employee</button>
      </div>
      <div className="statsGrid">Sale Info Stats</div>
    </div>
  </div>
);

export default SaleInfo;
