import React from 'react';
import { Link } from 'react-router-dom';

const ManagerNav = () => (

  <div className="manager-navigation">
    <Link to="/ManagerHome" className="item">
      Home
    </Link>
    <Link to="/EmployeeInfo" className="item">
      Employees
    </Link>
    <Link to="/InventoryInfo" className="item">
      Inventory
    </Link>
    <Link to="/saleinfo" className="item">
      Sales
    </Link>
    <Link to="/ManagerCustomize" className="item">
      Customize
    </Link>
    <Link to="/salesScreen" className="item">
      Make A Sale
    </Link>
    <Link to="/kitchenScreen" className="item">
      Kitchen
    </Link>
  </div>
);

export default ManagerNav;
