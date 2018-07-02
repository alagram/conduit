import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            Sign In
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" className="nav-link">
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }

  return null;
}

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="login" className="nav-link">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
