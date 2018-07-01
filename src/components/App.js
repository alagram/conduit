import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Home from './Home';
import agent from '../agent';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps)
    if (nextProps.redirectTo) {

      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOAD', payload, token }),
  onRedirect: () =>
    dispatch({ type: 'REDIRECT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
