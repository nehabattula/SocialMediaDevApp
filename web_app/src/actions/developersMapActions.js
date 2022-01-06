import axios from "axios";
import { setAlert } from "./alertActions";
import tokenToHeader from "../localStorage/TokenToHeader";
import {
  GET_DEVELOPERS_MAP,
  DEVELOPERS_MAP_ERROR,
} from "../constants/developersMapConstants";
// Get developers co-ordinates to show on the map
export const getDevelopersMapCoordinates = (Profile) => async (dispatch) => {
  try {
    if (localStorage.token) {
      tokenToHeader(localStorage.token);
    }

    if (Profile) {
      const res = await axios.get(
        `http://localhost:3000/api/map/${Profile.profile.homelocation.location.coordinates[0]}/${Profile.profile.homelocation.location.coordinates[1]}`
      );
      dispatch({
        type: GET_DEVELOPERS_MAP,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: DEVELOPERS_MAP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
