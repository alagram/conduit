import React, { Component } from 'react';
import ListErrors from './ListErrors';
import agent from '../agent';
import { connect } from 'react-redux';

class Editor extends Component {
  updateFieldEvent = (key) => (env) => this.props.onUpdateField(key, env.target.value);

  changeTitle = this.updateFieldEvent('title');
  changeDescription = this.updateFieldEvent('description');
  changeBody = this.updateFieldEvent('body');
  changeTagInput = this.updateFieldEvent('tagInput');

  // when entering tags, hitting enter adds a tag to the list

  watchForEnter = env => {
    if (env.keyCode === 13) {
      env.preventDefault();
      this.props.onAddTag();
    }
  }

  removeTagHandler = tag => () => {
    this.props.onRemoveTag(tag);
  }

  // When submitting the form, we need to correctly format the
  // object and use the right function - if we have a slug,
  // we're updating an article, otherwise we're creating a new
  // one.

  submitForm = env => {
    env.preventDefault();
    const article = {
      title: this.props.title,
      description: this.props.description,
      body: this.props.body,
      tagList: this.props.tagList
    };

    const slug = { slug: this.props.articleSlug };
    const promise = this.props.articleSlug
                    ? agent.Articles.update(Object.assign(article, slug))
                    : agent.Articles.create(article);

    this.props.onSubmit(promise);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }

      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }

    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {(this.props.tagList || []).map((tag) => (
                        <span className="tag-default tag-pill" key={tag}>
                          <i className="ion-close-round"
                            onClick={this.removeTagHandler(tag)}>
                          </i>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.editor
})

/**
 * `mapDispatchToProps()` needs separate actions for adding/removing
 * tags, submitting an article, updating individual fields, and cleaning
 * up after navigating away from the page.
 */

 const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload =>
    dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: () =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
 });

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
