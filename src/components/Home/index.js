import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';
import agent from '../../agent';

// const Promise = global.Promise;

class Home extends Component {

  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token
          ? agent.Articles.feed()
          : agent.Articles.all();

    this.props.onLoad(tab, articlesPromise);
  }

  render() {
    return (
      <div className="home-page">

        <Banner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
  onUnload: () =>
    dispatch({ type: 'HOME_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
