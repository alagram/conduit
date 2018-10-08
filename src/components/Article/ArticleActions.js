import React from "react";
import { Link } from "react-router-dom";
import agent from "../../agent";
import { connect } from "react-redux";
import { DELETE_ARTICLE } from "../../constants/actionTypes";

const ArticleActions = props => {
  const { article, canModify } = props;

  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug));
  };

  if (canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  return <span />;
};

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: DELETE_ARTICLE, payload })
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(ArticleActions);
