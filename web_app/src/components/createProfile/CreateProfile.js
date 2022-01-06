import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./CreateProfile.scss";
import { createProfile } from "../../actions/profileActions";
import { loadUser } from "../../actions/loginActions";
import { getCurrentProfile } from "../../actions/profileActions";
import ProfileDetails from "./profileDetails/ProfileDetails";
import ExperienceDetails from "./experienceDetails/ExperienceDetails";
import EducationDetails from "./educationDetails/EducationDetails";

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
  designation: "",
  company: "",
  workLocation: "",
  startingDate: "",
  current: false,
  endDate: "",
  jobDescription: "",
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  currentStudent: false,
  description: "",
};

// set the state for this component
const CreateProfile = ({ history, auth, profile }) => {
  const [childData, setChildData] = useState("");
  const [worExperience, setWorkExperience] = useState("");
  const [education, setEducation] = useState("");
  const dispatch = useDispatch();

  // set the complete profile form
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      ...worExperience,
      ...education,
      website: website,
      homelocation,
      skills,
      githubusername,
      bio,
      social: { youtube, linkedin },
    });
    console.log(formData);
  }, [childData]);

  useEffect(() => {
    setFormData({
      ...formData,
      ...childData,
      ...education,
      experience: {
        designation,
        company,
        workLocation,
        startingDate,
        jobCurrent,
        endDate,
        jobDescription,
      },
    });
  }, [worExperience]);

  useEffect(() => {
    setFormData({
      ...formData,
      ...worExperience,
      ...childData,
      education: {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        currentStudent,
        description,
      },
    });
  }, [education]);

  const {
    image,
    website,
    homelocation,
    skills,
    githubusername,
    bio,
    youtube,
    linkedin,
  } = childData;

  const {
    designation,
    company,
    workLocation,
    startingDate,
    jobCurrent,
    endDate,
    jobDescription,
  } = worExperience;

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    currentStudent,
    description,
  } = education;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // setState on a change event
  };

  // profile form submission
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history));
  };

  // Component function
  return (
    <Fragment>
      <div className="top-container">
        <div className="main-container-profile">
          <h1 className="profile-header">Your Profile</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <ProfileDetails
              auth={auth}
              profile={profile}
              passChildData={setChildData}
            />
            <ExperienceDetails
              auth={auth}
              profile={profile}
              passWorkExp={setWorkExperience}
            />
            <EducationDetails
              auth={auth}
              profile={profile}
              education={setEducation}
            />
            <input type="submit" className="submit-button" value="SUBMIT" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.Profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(CreateProfile);
