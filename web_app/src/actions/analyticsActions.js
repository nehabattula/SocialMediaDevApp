import axios from "axios";
import { setAlert } from "./alertActions";
import tokenToHeader from "../localStorage/TokenToHeader";
import {
  GET_POST_SKILL_ANALYTICS,
  POST_SKILL_ANALYTICS_ERRORS,
} from "../constants/postAnalyticsConstants";
// Get posts
export const getPostBySkill = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }
    //api to fetch the post analytics data
    const res = await axios.get("http://localhost:3000/api/analytics");
    dispatch({
      type: GET_POST_SKILL_ANALYTICS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_SKILL_ANALYTICS_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
