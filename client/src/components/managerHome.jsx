import React from 'react';
import Navigation from './managerNav.jsx';

const ManagerHome = () => (
  <div className="managerScreenGrid">
    <div className="manager-navigation"><Navigation /></div>
    <div className="managerViewGrid">
      <div className="graphGrid">Manager Home Graphs</div>
      <div className="statsGrid">Manager Home Stats</div>
    </div>
  </div>
);

export default ManagerHome;
