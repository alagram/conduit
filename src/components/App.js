import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";
import Article from "./Article";
import Profile from "./Profile";
import ProfileFavorites from "./ProfileFavorites";
import Editor from "./Editor";
import agent from "../agent";
import { store } from "../store";
import { push } from "react-router-redux";

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor/" component={Editor} />
            <Route path="/settings" component={Settings} />
            <Route path="/article/:id" component={Article} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
