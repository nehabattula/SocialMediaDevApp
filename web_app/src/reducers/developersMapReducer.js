import {
  DEVELOPERS_MAP_ERROR,
  GET_DEVELOPERS_MAP,
} from "../constants/developersMapConstants";

const initialState = {
  loading: true,
  developersMapCoordinates: [],
  error: {},
};

function DevelopersMapReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEVELOPERS_MAP:
      return {
        ...state,
        developersMapCoordinates: payload,
        loading: false,
      };
    case DEVELOPERS_MAP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default DevelopersMapReducer;
