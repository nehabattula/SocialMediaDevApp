import React, { Fragment } from "react";
import "./PostItem";
import { Link } from "react-router-dom";
import { FaThumbsDown, FaThumbsUp, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/postActions";
import moment from "moment";

//displays a single post item
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    postContent,
    skills,
    postingpersonname,
    postingpersonavatar,
    user,
    likes,
    comments,
    postdate,
  },
  showActions,
}) => {
  const constructDate = (DateValue) => {
    return moment(DateValue, "YYYY/MM/DD").format("MM/DD/YYYY");
  };
  return (
    <div class="post-item">
      <div>
        {showActions && !auth.loading && user === auth.user._id && (
          <span>
            <button
              type="button"
              className="delete-post"
              onClick={() => deletePost(_id)}
            >
              <FaTimes />
            </button>
          </span>
        )}
      </div>
      <div className="post-details">
        <div>
          <div className="no-underline">
            <img className="round-img" src={postingpersonavatar} alt="" />

            <Link className="no-underline" to={`/dashboard/${user}`}>
              <h4 className="person-name no-decoration">{postingpersonname}</h4>
            </Link>
          </div>
        </div>

        <div>
          <p className="post-content">{postContent}</p>
        </div>
      </div>
      <div>
        <div className="action-buttons">
          <span className="post-date">
            <b>Posted on : </b> {constructDate(postdate)}
          </span>
          <span className="post-date">
            <b>Category : </b> {skills.length > 0 ? skills[0] : ""}
          </span>
          {showActions && (
            <span>
              <span>
                <button
                  type="button"
                  className="font-icon-button"
                  onClick={() => addLike(_id)}
                >
                  <FaThumbsUp />
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
              </span>
              <span>
                <button
                  type="button"
                  className="font-icon-button"
                  onClick={() => removeLike(_id)}
                >
                  <FaThumbsDown />
                </button>
              </span>

              <span>
                <Link to={`/discussion/${_id}`} className="discussion-button">
                  Comments
                  <span> ({comments.length})</span>
                </Link>
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
