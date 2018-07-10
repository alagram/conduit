import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';

class Article extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
      agent.Comments.forArticle(this.props.match.params.id)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const { currentUser, article } = this.props;
    const markup = { __html: marked(this.props.article.body) };
    const canModify = currentUser &&
                      currentUser.username === article.author.username;

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
            {/*
              <ArticleMeta
              article={this.props.article}
              canModify={canModify}
            />
            */}

          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {this.props.article.tagList.map(tag => (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          {/*
          <CommentContainer
            comments={this.props.comments || []}
            errors={this.props.commentErrors}
            slug={this.props.params.id}
            currentUser={this.props.currentUser} />
          */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'ARTICLE_PAGE_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'ARTICLE_PAGE_UNLOADED' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);
