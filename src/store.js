import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware)
};

const reducer = combineReducers({
  auth,
  common,
  home
});


export const store = createStore(
  reducer, composeWithDevTools(getMiddleware()));
