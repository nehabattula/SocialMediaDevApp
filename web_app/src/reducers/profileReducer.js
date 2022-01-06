import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
} from "../constants/profileConstants";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, reducer) {
  const { type, data } = reducer;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: data,
        loading: false,
      };
    case GET_ALL_PROFILES:
      console.log("here");
      return {
        ...state,
        profiles: data,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case CLEAR_PROFILE:
      localStorage.removeItem("token");
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
