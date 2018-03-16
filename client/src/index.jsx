import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers/reducers';
import App from './components/app';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const store = createStore(reducer);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('app'),
);
