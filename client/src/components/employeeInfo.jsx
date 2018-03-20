import React from 'react';
import Navigation from './managerNav.jsx';

const EmployeeInfo = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">Employee Info Graphs</div>
      <div className="statsGrid">Employee Info Stats</div>
    </div>
  </div>
);

export default EmployeeInfo;
