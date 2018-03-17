import React from 'react';
import Navigation from './managerNav.jsx';

const InventoryInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">Inventory Graphs</div>
      <div className="statsGrid">Inventory Stats</div>
    </div>
  </div>
);

export default InventoryInfo;
