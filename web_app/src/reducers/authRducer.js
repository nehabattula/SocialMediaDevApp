import {
  LOGIN,
  NO_LOGIN,
  LOGOUT,
  USER_LOADED,
} from "../constants/loginConstants";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/registerConstants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: localStorage.getItem("token") ? true : false,
  user: null,
};

export default function (state = initialState, reducer) {
  const { type, data } = reducer;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: data,
      };
    case LOGIN:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", data);
      return {
        ...state,
        ...data,
        isAuthenticated: true,
        loading: false,
      };
    case NO_LOGIN:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
