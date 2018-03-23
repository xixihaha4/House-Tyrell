import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryUsagePie from './inventoryUsagePie.jsx';
import InventoryCostLine from './inventoryCostLine.jsx';
import InventoryWastePie from './inventoryWastePie.jsx';
import InventoryUsageBar from './inventoryBar.jsx';
import Navbar from './navbar.jsx';

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
    const type = this.state.viewType;
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="managerScreenGrid">
          <div className="manager-navigation"><Navigation /></div>
          <div className="graphGrid">
            {type === 'usage' ? (<div className="graph"><InventoryUsagePie /></div>) : (
              type === 'cost' ? (<div className="graph"><InventoryCostLine /></div>) : (<div className="graph"><InventoryWastePie /></div>)
            )}

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
