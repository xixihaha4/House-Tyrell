import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryUsageBar from './inventoryBar.jsx';

class InventoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'usage',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ viewType: e.target.value });
  }

  render() {
    return (
      <div className="managerScreenGrid">
        <div className="manager-navigation"><Navigation /></div>
        <div className="managerViewGrid">
          <div className="graphGrid">
            <div className="barChart"><InventoryUsageBar /></div>
            <div>
              <select value={this.state.viewType} onChange={this.handleChange} className="dropDown">
                <option value="usage">Usage</option>
                <option value="cost">Cost</option>
                <option value="waste">Waste</option>
              </select>
            </div>
          </div>
          <div className="statsGrid">Inventory Stats</div>
        </div>
      </div>

    );
  }
}

export default InventoryInfo;
