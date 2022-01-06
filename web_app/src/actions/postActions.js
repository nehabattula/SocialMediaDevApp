import axios from "axios";
import { setAlert } from "./alertActions";
import tokenToHeader from "../localStorage/TokenToHeader";

import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../constants/postsConstants";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }

    const res = await axios.get("http://localhost:3000/api/post");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like to post
export const addLike = (id) => async (dispatch) => {
  if (localStorage.token) {
    tokenToHeader(localStorage.token);
  }
  try {
    const res = await axios.put(`http://localhost:3000/api/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like from a post
export const removeLike = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    const res = await axios.put(`http://localhost:3000/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a post
export const deletePost = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    const res = await axios.delete(`http://localhost:3000/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Howl has been removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    const res = await axios.post("http://localhost:3000/api/post", formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Howl has been created", "success"));
  } catch (err) {
    dispatch(setAlert("Please create profile before posting howl", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    const res = await axios.get(`http://localhost:3000/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }

    const res = await axios.post(
      `http://localhost:3000/api/post/comment/${postId}`,
      formData
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, comId) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }

    await axios.delete(
      `http://localhost:3000/api/post/comment/${postId}/${comId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: comId,
    });

    dispatch(setAlert("Howl comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
