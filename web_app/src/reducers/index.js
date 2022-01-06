import { combineReducers } from "redux";
import auth from "./authRducer";
import alert from "./alertReducer";
import Profile from "./profileReducer";
import post from "./postReducer";
import Analytics from "./analyticsReducer";
import GitProjects from "./gitProjectsReducer";
import developersMapCoordinates from "./developersMapReducer";
import FilterDevProfiles from "./filterDevProfilesReducer";
export default combineReducers({
  auth,
  alert,
  Profile,
  post,
  Analytics,
  GitProjects,
  developersMapCoordinates,
  FilterDevProfiles,
});
