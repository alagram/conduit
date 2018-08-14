import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';

class CommentInput extends Component {
  state = {
    body: ''
  }

  setBody = (env) => {
    const body = env.target.value

    this.setState(() => ({
      body
    }))
  }

  createComment = (env) => {
    env.preventDefault();

    const payload = agent.Comments.create(this.props.slug, { body: this.state.body })

    this.setState(() => ({
      body: ''
    }))

    this.props.onSubmit(payload)
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment"
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
          src={this.props.currentUser.image}
          className="comment-author-img" alt={this.props.currentUser.username} />

          <button
           className="btn btn-sm btn-primary"
           type="submit">
            Post Comment
          </button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps =  dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
})

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
