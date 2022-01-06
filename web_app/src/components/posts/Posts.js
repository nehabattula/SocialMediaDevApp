import React, { useEffect } from "react";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import "./Posts.scss";
import "./PostItem.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";

//displays posts ,posts form
const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="posts-container">
      <div className="background-color">
        <div className="container">
          <div>
            <div className="posts-text-center">
              <h1>HOWLS !</h1>
              <p className="welcome-text">
                Welcome to the husky developers community
              </p>
            </div>
            <div>
              <PostForm />
            </div>
            <div className="postItem">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
