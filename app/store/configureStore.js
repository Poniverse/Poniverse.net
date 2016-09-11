import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../api/promiseMiddleware';
import createLogger from 'redux-logger';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  let middleware = [thunk, promiseMiddleware];
  // Installs hooks that always keep react-router and redux
  // store in sync
  const reactRouterReduxMiddleware = routerMiddleware(history);
  if (__DEVCLIENT__) {
    // Logger is disabled by default because there are better tools out there that don't spam the console.
    // Though there are times in which it is useful, so it is left here for ease of use when that need
    // arises. Do not push this uncommented.
    // TODO: Make this an environment switch
    // middleware.push(reactRouterReduxMiddleware, createLogger());
    middleware.push(reactRouterReduxMiddleware);
  } else {
    middleware.push(reactRouterReduxMiddleware);
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  const store = finalCreateStore(
    rootReducer,
    initialState,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
