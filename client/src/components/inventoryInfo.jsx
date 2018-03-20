import React from 'react';
import Navigation from './managerNav.jsx';
import c3Chart from './c3Bar.jsx';


class InventoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'line'
    }
    this.setBarChart = this.setBarChart.bind(this);
    this.setLineChart = this.setLineChart.bind(this);
  }

  setBarChart() {
    this.setState({ chartType: 'bar' });
  }
  setLineChart() {
    this.setState({ chartType: 'line' });
  }

  render() {
    return (
      <div className="managerScreenGrid">
        <div className="manager-navigation"><Navigation /></div>
        <div className="managerViewGrid">
          <div className="graphGrid-inventory">
            <div className="barChart"><c3Chart columns={columns} chartType={this.state.chartType}/></div>
          </div>
          <div className="statsGrid">Inventory Stats</div>
        </div>
      </div>
    );
  }
}

export default InventoryInfo;
