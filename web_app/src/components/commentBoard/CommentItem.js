import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CommentItem.scss";
import { deleteComment } from "../../actions/postActions";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

const CommentItem = ({
  postId,
  comment: {
    _id,
    comment,
    commentingpersonname,
    commentingpersonavatar,
    user,
    commentdate,
  },
  auth,
  deleteComment,
}) => {
  const constructDate = (DateValue) => {
    return moment(DateValue, "YYYY/MM/DD").format("MM/DD/YYYY");
  };
  //display the comment item of a user
  return (
    <div className="comment-details-header">
      <div>
        {!auth.loading && user === auth.user._id && (
          <span className="delete-post  comment-delete">
            {" "}
            <FaTimes onClick={() => deleteComment(postId, _id)} />
          </span>
        )}
      </div>
      <div className="comment-details-content">
        <div>
          <div className="no-underline">
            <img className="round-img" src={commentingpersonavatar} alt="" />
            <Link className="no-underline" to={`/dashboard/${user}`}>
              <h4 className="person-name no-decoration">
                {commentingpersonname}
              </h4>
            </Link>
          </div>
          <span>
            <b>Posted on : </b>
            {constructDate(commentdate)}
          </span>
        </div>
        <div>
          <p className="comment-text">{comment}</p>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
