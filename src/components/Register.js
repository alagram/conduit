import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import agent from "../agent";
import ListErrors from "./ListErrors";
import { UPDATE_FIELD_AUTH, REGISTER } from "../constants/actionTypes";

class Register extends Component {
  changeEmail = event => {
    this.props.onChangeEmail(event.target.value);
  };

  changePassword = event => {
    this.props.onChangePassword(event.target.value);
  };

  changeUsername = event => {
    this.props.onChangeUsername(event.target.value);
  };

  submitForm = (username, email, password) => event => {
    event.preventDefault();
    this.props.onSubmit(username, email, password);
  };

  render() {
    const { email, username, password, inProgress } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={this.changeUsername}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                  >
                    Register
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);

    dispatch({ type: REGISTER, payload });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
