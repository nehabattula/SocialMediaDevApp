import React, { useEffect } from "react";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import "./CommentBoard.scss";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import Landing from "../landing/Landing";
import Spinner from "../Spinner/Spinner";

const Discussion = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  //displays the comment board of a particular post
  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="comment-board">
      <Link to="/posts" className="btn no-decoration">
        <p className="back-button">Back To Howls</p>
      </Link>
      <PostItem post={post} showActions={false} />
      <div className="add-comment">
        <CommentForm postId={post._id} />
      </div>

      <div className="comment-item">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Discussion.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Discussion);
