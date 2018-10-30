import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import App from './components/App.jsx';
import ManagerHome from './components/ManagerHome.jsx';
import InventoryInfo from './components/InventoryInfo.jsx';
import EmployeeInfo from './components/EmployeeInfo.jsx';
import SaleInfo from './components/SaleInfo.jsx';
import Login from './components/Login.jsx';
import TransactionCredit from './components/TransactionCredit.jsx';
import TransactionCash from './components/TransactionCash.jsx';
import TransactionCashConfirm from './components/TransactionCashConfirm.jsx';
import SaleControl from './components/SaleControl.jsx';
import KitchenLog from './components/KitchenLog.jsx';
import ManagerCustomize from './components/ManagerCustomize.jsx';

const history = createHistory();

ReactDOM.render(
  <div>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Login} status={401} />
        <Route path="/salesScreen" component={App} />
        <Route path="/ManagerHome" component={ManagerHome} />
        <Route path="/EmployeeInfo" component={EmployeeInfo} />
        <Route path="/InventoryInfo" component={InventoryInfo} />
        <Route path="/saleinfo" component={SaleInfo} />
        <Route path="/ManagerCustomize" component={ManagerCustomize} />
        <Route path="/transaction/cash" component={TransactionCash} />
        <Route path="/transaction/cash/confirm" component={TransactionCashConfirm} />
        <Route path="/transaction/credit" component={TransactionCredit} />
        <Route path="/kitchenScreen" component={KitchenLog} />
      </div>
    </Router>
  </div>,
  document.getElementById('app'),
);
