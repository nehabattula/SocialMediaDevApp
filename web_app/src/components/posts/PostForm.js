import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import "./PostForm.scss";

//displays post form for user to add a post
const PostForm = ({ addPost }) => {
  const [postContent, setPostContent] = useState("");
  const [skills, setSkill] = useState("Javascript");

  return (
    <section>
      <div>
        <div>
          <div class="card">
            <h3>ADD A HOWL !</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addPost({ postContent, skills });
                setPostContent("");
                setSkill("Javascript");
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Howl what's on your mind...."
                required
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <br />
              <label className="select-language">Select a language </label>
              <div>
                <select
                  name="cars"
                  id="cars"
                  onChange={(e) => setSkill(e.target.value)}
                >
                  <option value="Javascript">Javascript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Ruby">Ruby</option>
                </select>
              </div>

              <br />
              <input
                type="submit"
                className="post-form-button"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
