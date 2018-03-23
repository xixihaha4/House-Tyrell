import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryBar from './inventoryBar.jsx';
import Navbar from './navbar.jsx';


const ManagerHome = () => (
  <div>
    <div>
      <Navbar />
    </div>
    <div className="managerScreenGrid">
      <div className="manager-navigation"><Navigation /></div>
      <div className="graphGrid">
        <div className="graph">
        
        </div>
      </div>
      <div className="statsGrid">Manager Home Stats</div>
    </div>
  </div>
);

export default ManagerHome;
