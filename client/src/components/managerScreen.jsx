import React from 'react';
import Navigation from './managerNav.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
  {
    path: '/managerhome',
    main: () => <h2>home</h2>,
  },
  {
    path: '/employeeinfo',
    main: () => <h2>employees</h2>,
  },
  {
    path: '/inventoryinfo',
    main: () => <h2>inventory</h2>,
  },
  {
    path: '/saleinfo',
    main: () => <h2>sale</h2>,
  },
];

const ManagerScreen = () =>
  (
    <div className="managerScreenGrid">
      <div><Navigation /></div>
      <div className="managerViewGrid">
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          component={route.main}
        />
      ))}
        <div className="graphGrid">Graphs</div>
        <div className="statsGrid">Stats</div>
      </div>
    </div>
  );

export default ManagerScreen;
