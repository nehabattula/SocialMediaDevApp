import React, { Fragment, useState, useEffect } from "react";
import { getCurrentProfile } from "../../../actions/profileActions";
import moment from "moment";

const initialState = {
  designation: "",
  company: "",
  workLocation: "",
  startingDate: "",
  current: false,
  endDate: "",
  jobDescription: "",
};

const ExperienceDetails = ({ passWorkExp, auth, profile }) => {
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

      for (const key in profile.profile.experience) {
        if (key === "startingDate")
          profileData[key] = profile.profile.experience[key].substring(
            0,
            profile.profile.experience[key].indexOf("T")
          );
        if (key === "endDate")
          profileData[key] = profile.profile.experience[key].substring(
            0,
            profile.profile.experience[key].indexOf("T")
          );
        if (key in profileData && key !== "startingDate" && key != "endDate")
          profileData[key] = profile.profile.experience[key];
      }

      setExperienceFormData(profileData);
    }
  }, [auth.loading, getCurrentProfile, profile]);

  const [experienceFormData, setExperienceFormData] = useState(initialState);
  const [currentWorkMark, setCurrentWorkMark] = useState(false);

  // destructure profile fields
  const {
    designation,
    company,
    workLocation,
    startingDate,
    jobCurrent,
    endDate,
    jobDescription,
  } = experienceFormData;

  const onChange = (e) => {
    setExperienceFormData({
      ...experienceFormData,
      [e.target.name]: e.target.value,
    }); // setState on a change event
  };

  const hideToDateExp = () => {
    setCurrentWorkMark(!currentWorkMark);
    document.getElementById("exp-to-input").hidden = currentWorkMark
      ? false
      : true;
  };

  passWorkExp(experienceFormData);

  // Component function
  return (
    <div>
      <h1 className="profession-experience-heading">Professional Experience</h1>
      <div className="career-form">
        <p className="counter">{`Experiences`}</p>
        <div className="form-group" className="experience-education-fields">
          <input
            type="text"
            placeholder="Job Title"
            name="designation"
            value={designation}
            placeholder="Designation"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group" className="experience-education-fields">
          <input
            type="text"
            placeholder="Company"
            name="company"
            required
            value={company}
            placeholder="company"
            onChange={onChange}
          />
        </div>
        <div className="form-group" className="experience-education-fields">
          <input
            type="text"
            placeholder="Location"
            name="workLocation"
            value={workLocation}
            placeholder="workLocation"
            onChange={onChange}
          />
        </div>
        <div className="form-group" className="experience-education-fields">
          <h4>From Date</h4>
          <input
            type="date"
            name="startingDate"
            value={startingDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group" className="experience-education-fields">
          <p>
            <input
              className="current-exp-checkbox"
              type="checkbox"
              name="jobCurrent"
              value={jobCurrent}
              onChange={() =>
                setExperienceFormData({
                  ...experienceFormData,
                  jobCurrent: !jobCurrent,
                })
              }
              onChange={() => hideToDateExp()}
            />{" "}
            <label>Current Job</label>
          </p>
        </div>
        <div
          className="form-group"
          className="experience-education-fields"
          id="exp-to-input"
        >
          <h4>To Date</h4>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group" className="experience-education-fields">
          <textarea
            name="jobDescription"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={jobDescription}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
