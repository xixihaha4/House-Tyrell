import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryBar from './inventoryBar.jsx';
import Navbar from './navbar.jsx';

const columns = [
  ['Ingredient_Left', 30, 20, 70, 6, 105, 23],
  ['Ingredients_Initial', 50, 20, 100, 40, 150, 25],
];

const ManagerHome = () => (
  <div>
    <div>
      <Navbar />
    </div>
    <div className="managerScreenGrid">
      <div className="manager-navigation"><Navigation /></div>
      <div className="graphGrid">
        <div className="barChart">
          <InventoryBar columns={columns} chartType="bar" />
        </div>
      </div>
      <div className="statsGrid">Manager Home Stats</div>
    </div>
  </div>
);

export default ManagerHome;
