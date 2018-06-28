import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';

class Home extends Component {
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
  appName: state.appName
});

export default connect(mapStateToProps, () => ({}))(Home);
