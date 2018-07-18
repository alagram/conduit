import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const DeleteButton = props => {
  const deleteComment = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  }

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={deleteComment}></i>
      </span>
    )
  }

  return null;
}

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: 'DELETE_COMMENT', payload, commentId })
});

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
