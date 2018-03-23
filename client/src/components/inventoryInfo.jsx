import React from 'react';
import Navigation from './managerNav.jsx';
import InventoryUsagePie from './inventoryUsagePie.jsx';
import InventoryCostLine from './inventoryCostLine.jsx';
import InventoryWastePie from './inventoryWastePie.jsx';
import Select from 'react-select';
import Navbar from './navbar.jsx';

class InventoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'usage',
    };
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

            <div style={{ color: 'black' }}>
              <Select
                options={[{ value: 'usage', label: 'Usage' }, { value: 'cost', label: 'Cost' }, { value: 'waste', label: 'Waste' }]}
                placeholder="Select a graph"
                onChange={value => this.setState({ viewType: value.value })}
              />
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default InventoryInfo;
