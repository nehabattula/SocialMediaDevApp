import {
  GET_POST_SKILL_ANALYTICS,
  POST_SKILL_ANALYTICS_ERRORS,
} from "../constants/postAnalyticsConstants";

const initialState = {
  loading: true,
  finalValue: {},
  addingValue: [],
  addingLabel: [],
  addingCommentValue: [],
  addingLikesValue: [],
  error: {},
};

function analyticsReducer(state = initialState, action) {
  let valuePost = [];
  let label = [];
  let valueComment = [];
  let valueLikes = [];
  const { type, payload } = action;
  if (payload != undefined) {
    for (let key in payload.post) {
      valuePost.push(payload.post[key]);
      label.push(key);
    }
    for (let key in payload.comment) {
      valueComment.push(payload.comment[key]);
    }
    for (let key in payload.like) {
      valueLikes.push(payload.like[key]);
    }
  }
  switch (type) {
    case GET_POST_SKILL_ANALYTICS:
      return {
        ...state,
        finalValue: payload,
        loading: false,
        addingValue: valuePost,
        addingCommentValue: valueComment,
        addingLikesValue: valueLikes,
        addingLabel: label,
      };
    case POST_SKILL_ANALYTICS_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default analyticsReducer;
