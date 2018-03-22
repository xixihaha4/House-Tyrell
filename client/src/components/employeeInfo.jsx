import React from 'react';
import Navigation from './managerNav.jsx';
import EmployeeBar from './employeeBar.jsx';

const EmployeeInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">
        <div className="graph"><EmployeeBar /></div>
      </div>
      <div className="statsGrid">Employee Info Stats</div>
    </div>
  </div>
);

export default EmployeeInfo;
