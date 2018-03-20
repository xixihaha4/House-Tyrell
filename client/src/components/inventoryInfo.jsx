import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryBar from './inventoryBar.jsx';

const columns = [
  ['Ingredient_Left', 30, 20, 70, 6, 105, 23],
  ['Ingredients_Initial', 50, 20, 100, 40, 150, 25],
];

class InventoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'bar',
    };
    // this.setBarChart = this.setBarChart.bind(this);
    // this.setLineChart = this.setLineChart.bind(this);
  }

  // setBarChart() {
  //   this.setState({ chartType: 'bar' });
  // }
  // setLineChart() {
  //   this.setState({ chartType: 'line' });
  // }

  render() {
    return (
      <div className="managerScreenGrid">
        <div className="manager-navigation"><Navigation /></div>
        <div className="managerViewGrid">
          <div className="graphGrid-inventory">
            <div className="barChart"><InventoryBar columns={columns} chartType={this.state.chartType} /></div>
            {/* <p>
              Chart Type
              <button onClick={this.setBarChart}>Bar</button>
              <button onClick={this.setLineChart}>Line</button>
            </p> */}
          </div>
          <div className="statsGrid">Inventory Stats</div>
        </div>
      </div>
    );
  }
}

export default InventoryInfo;
