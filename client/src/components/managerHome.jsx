import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryBar from './inventoryBar.jsx';

const columns = [
  ['Ingredient_Left', 30, 20, 70, 6, 105, 23],
  ['Ingredients_Initial', 50, 20, 100, 40, 150, 25],
];

const ManagerHome = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
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
