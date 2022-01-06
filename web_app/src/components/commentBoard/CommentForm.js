import React, { useState } from "react";
import "./CommentForm.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";

const CommentForm = ({ postId, addComment }) => {
  const [comment, setComment] = useState("");
  //displays the comment form for a user
  return (
    <div>
      <div>
        <h3>Reply with a Howl!</h3>
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { comment });
            setComment("");
          }}
        >
          <textarea
            name="comment"
            cols="80"
            rows="5"
            placeholder="Howl back"
            required
            value={comment}
            className="comment-text-area"
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <br />
          <input
            type="submit"
            className="button post-form-button"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
