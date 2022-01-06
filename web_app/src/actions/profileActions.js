import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "../constants/profileConstants";

// Get current user profiles
export const getCurrentProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete user profiles
export const deleteProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/profile/${id}`);
    dispatch({
      type: CLEAR_PROFILE,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = axios.post(
        "http://localhost:3000/api/profile",
        formData,
        config
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
