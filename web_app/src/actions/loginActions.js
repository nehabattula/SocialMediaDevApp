import axios from "axios";
import {
  LOGIN,
  NO_LOGIN,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../constants/loginConstants";
import { CLEAR_PROFILE } from "../constants/profileConstants";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/registerConstants";

import tokenToHeader from "../localStorage/TokenToHeader";
import { setAlert } from "./alertActions";
// LOGIN user
export const loginUser = (username, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });
    const res = await axios.post(
      "http://localhost:3000/api/user/login",
      body,
      config
    );
    dispatch({
      type: LOGIN,
      data: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));

    dispatch({
      type: NO_LOGIN,
    });
  }
};

//LOGOUT  USER
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  dispatch({
    type: CLEAR_PROFILE,
  });
};

// REGISTER user
export const register =
  ({ name, username, password }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, username, password });
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        body,
        config
      );
      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        data: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert(err.response.data, "danger"));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// LOAD A USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    tokenToHeader(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:3000/api/auth");
    dispatch({
      type: USER_LOADED,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
