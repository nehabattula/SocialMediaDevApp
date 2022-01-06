import {
  GIT_PROJECTS,
  GIT_PROJECTS_ERROR,
} from "../constants/gitProjectsConstants";

const initialState = {
  projects: [],
};

export default function (state = initialState, reducer) {
  const { type, payload } = reducer;

  switch (type) {
    case GIT_PROJECTS:
      return {
        projects: payload,
      };
    case GIT_PROJECTS_ERROR:
      return {
        error: payload,
      };
    default:
      return state;
  }
}
