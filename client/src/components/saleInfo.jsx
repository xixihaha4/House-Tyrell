import React from 'react';
import Navigation from './managerNav.jsx';

const SaleInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">Sale Info Graphs</div>
      <div className="statsGrid">Sale Info Stats</div>
    </div>
  </div>
);

export default SaleInfo;
