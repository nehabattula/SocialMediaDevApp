import axios from "axios";
import tokenToHeader from "../localStorage/TokenToHeader";
import {
  GIT_PROJECTS,
  GIT_PROJECTS_ERROR,
} from "../constants/gitProjectsConstants";

export const getGitProjects = (username) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    //fetches the github repos of user based on github username
    const res = await axios.get(
      `http://localhost:3000/api/profile/github/${username}`
    );
    dispatch({
      type: GIT_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GIT_PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
