import axios from "axios";
import { PROFILE_ERROR, GET_ALL_PROFILES } from "../constants/profileConstants";

export const getAllProfiles = () => async (dispatch) => {
  try {
    //fetches a particular profile based on profile id
    const res = await axios.get(`http://localhost:3000/api/profile`);
    // console.log(res.data);
    dispatch({
      type: GET_ALL_PROFILES,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
