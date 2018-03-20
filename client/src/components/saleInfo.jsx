import React from 'react';
import Navigation from './managerNav.jsx';
import SalesLine from './salesLine.jsx';

class SaleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'line',
    };
  }

  render() {
    return (
      <div className="managerScreenGrid">
        <div className="manager-navigation"><Navigation /></div>
        <div className="managerViewGrid">
          <div className="graphGrid">
            <div className="lineChart">
              <SalesLine />
            </div>
          </div>
          <div className="statsGrid">Sale Info Stats</div>
        </div>
      </div>
    );
  }
}

export default SaleInfo;
