import 'intl';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import axios from 'axios';
import { IntlProvider } from 'react-intl';

import createRoutes from './routes.jsx';
import configureStore from './store/configureStore';
import { useScroll } from 'react-router-scroll';
import AuthInterceptor from './api/authInterceptor';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;
const apiUrl = window.__API_URL__;

axios.defaults.baseURL = apiUrl;

const authInterceptor = new AuthInterceptor();
authInterceptor.registerInterceptor();

// if (initialState.auth.accessToken) {
//   axios.defaults.headers.common.Authorization = 'Bearer ' + initialState.auth.accessToken;
// }

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <IntlProvider locale="en-GB">
      <Router history={history}
              render={applyRouterMiddleware(useScroll())}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
