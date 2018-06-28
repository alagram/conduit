import App from './components/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware'

const defaultState = {
  appName: 'conduit',
  articles: null
}

const reducer = function(state = defaultState, action) {
  return state;
}

const store = createStore(reducer, applyMiddleware(promiseMiddleware));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
