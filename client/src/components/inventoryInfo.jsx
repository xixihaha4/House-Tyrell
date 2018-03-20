import React from 'react';
import Navigation from './managerNav.jsx';
import BarChart from './barChart.jsx';


const InventoryInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid-inventory">
        <div className="barChart"><BarChart /></div>
      </div>
      <div className="statsGrid">Inventory Stats</div>
    </div>
  </div>
);

export default InventoryInfo;
