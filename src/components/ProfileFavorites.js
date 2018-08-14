import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SET_PAGE,
} from '../constants/actionTypes';

class ProfileFavorites extends Profile {
  componentWillMount() {
    const username = this.props.match.params.username

    this.props.onLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.favoritedBy(username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.Articles.favoritedBy(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: PROFILE_FAVORITES_PAGE_LOADED, payload }),
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_FAVORITES_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
