import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import App from './components/app.jsx';

const history = createHistory();

ReactDOM.render(
  <div>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </div>,
  document.getElementById('app'),
);
