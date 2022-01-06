import { PROFILE_ERROR, GET_ALL_PROFILES } from "../constants/profileConstants";

const initialState = {
  allProfiles: [],
};

export default function (state = initialState, reducer) {
  const { type, data } = reducer;
  switch (type) {
    case GET_ALL_PROFILES:
      return {
        allProfiles: data,
      };
    default:
      return state;
  }
}
