import React, { Fragment, useState, useEffect } from "react";
import LocationImage from "../../../images/location.png";
import axios from "axios";
import { getCurrentProfile } from "../../../actions/profileActions";

// set the complete profile form
const initialState = {
  image: "",
  website: "",
  homelocation: {},
  skills: "",
  githubusername: "",
  bio: "",
  youtube: "",
  linkedin: "",
};

// set the state for this component
const ProfileDetails = ({ auth, passChildData, profile }) => {
  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile.profile && auth && auth._id) getCurrentProfile(auth.user._id);

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!auth.loading && profile && profile.profile) {
      const profileData = { ...initialState };
      for (const key in profile.profile) {
        if (key in profileData) {
          profileData[key] = profile.profile[key];
        }
      }

      for (const key in profile.profile.social) {
        if (key in profileData) profileData[key] = profile.profile.social[key];
      }

      setProfileFormData(profileData);
    }
  }, [auth.loading, getCurrentProfile, profile]);

  const [profileFormData, setProfileFormData] = useState(initialState);
  const [locationField, setLocationField] = useState(null); // set the current location

  passChildData(profileFormData);

  // destructure profile fields
  const {
    image,
    website,
    homelocation,
    skills,
    githubusername,
    bio,
    youtube,
    linkedin,
  } = profileFormData;

  const onChange = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value }); // setState on a change event
  };

  // Fetch geolocation
  const printLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // Success call back
  async function success(pos) {
    // coordinates
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;

    // call big-data-cloud api to return location name using coordinates
    var res = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&localityLanguage=en"
    );

    // destructure locality, city, state and country code from the entire payload
    const { locality, city, principalSubdivision, countryCode } = res.data;

    // set it to a variable
    let locationVar = `${locality}, ${city}, ${principalSubdivision}, ${countryCode}`;

    // set it to the <input> field value
    setLocationField(locationVar);

    let coordinates = [longitude, latitude];
    let location = { type: "Point", coordinates: coordinates };

    // set it to the component state so that it can be stored in the mongo database
    setProfileFormData({
      ...profileFormData,
      homelocation: { address: locationVar, location },
    });
  }

  // Error callback
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // options call back
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Component function
  return (
    <div>
      <div className="secondary-main-container">
        <div className="image-div">
          <img
            className="image-container"
            src={auth && auth.user && auth.user.image ? auth.user.image : Image}
          ></img>
        </div>
      </div>
      <div className="profile-form">
        <div className="form-group" className="education-form-input">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div
          className="form-group"
          id="location-field"
          className="education-form-input"
        >
          <input
            className="location-field"
            type="text"
            placeholder="Location"
            name="location"
            value={homelocation.address ? homelocation.address : ""}
            placeholder="Location"
            onChange={onChange}
          />
          <img
            className="location-image"
            src={LocationImage}
            onClick={printLocation}
          ></img>
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group" className="education-form-input">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group" className="education-form-input">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group" className="education-form-input">
          <textarea
            className="text-area"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2" className="education-form-input">
          <p className="social-media-urls">Social Media URLs</p>
        </div>
        <Fragment>
          <div className="social-media-fields">
            <i className="fab fa-youtube fa-2x" />
            <input
              className="social-media-input-3"
              type="text"
              placeholder="YouTube"
              name="youtube"
              value={youtube}
              placeholder="Youtube"
              onChange={onChange}
            />
          </div>
          <div className="social-media-fields">
            <i className="fab fa-linkedin fa-2x" />
            <input
              className="social-media-input-4"
              type="text"
              placeholder="Linkedin"
              name="linkedin"
              value={linkedin}
              placeholder="linkedin"
              onChange={onChange}
            />
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default ProfileDetails;
