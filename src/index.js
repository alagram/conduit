import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
