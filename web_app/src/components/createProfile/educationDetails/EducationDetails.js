import React, { Fragment, useState, useEffect } from "react";

import { getCurrentProfile } from "../../../actions/profileActions";
const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  currentStudent: false,
  description: "",
};

const EducationDetails = ({ education, auth, profile }) => {
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

      for (const key in profile.profile.education) {
        if (key === "from")
          profileData[key] = profile.profile.education[key].substring(
            0,
            profile.profile.education[key].indexOf("T")
          );
        if (key === "to")
          profileData[key] = profile.profile.education[key].substring(
            0,
            profile.profile.education[key].indexOf("T")
          );
        if (key in profileData && key !== "from" && key !== "to")
          profileData[key] = profile.profile.education[key];
      }

      setEducationFormData(profileData);
    }
  }, [auth.loading, getCurrentProfile, profile]);

  const [educationFormData, setEducationFormData] = useState(initialState);
  const [currentEdu, setCurrentEdu] = useState(false);

  // destructure profile fields
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    currentStudent,
    description,
  } = educationFormData;

  const onChange = (e) => {
    setEducationFormData({
      ...educationFormData,
      [e.target.name]: e.target.value,
    }); // setState on a change event
  };

  const hideToDateEdu = () => {
    setCurrentEdu(!currentEdu);
    document.getElementById("edu-to-input").hidden = currentEdu ? false : true;
  };

  education(educationFormData);

  // Component function
  return (
    <div>
      <h1 className="profession-experience-heading">Educational Background</h1>
      <div className="education-form">
        <p className="counter">{`Education`}</p>
        <div className="experience-education-fields">
          <input
            type="text"
            placeholder="School or Bootcamp"
            name="school"
            required
            value={school}
            placeholder="School"
            onChange={onChange}
          />
        </div>
        <div className="experience-education-fields">
          <input
            type="text"
            placeholder="Degree or Certificate"
            name="degree"
            required
            value={degree}
            placeholder="Degree"
            onChange={onChange}
          />
        </div>
        <div className="experience-education-fields">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            placeholder="Field Of Study"
            onChange={onChange}
            required
          />
        </div>
        <div className="experience-education-fields">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            placeholder="From"
            onChange={onChange}
            required
          />
        </div>
        <div className="experience-education-fields">
          <p>
            <input
              // checked={currentStudent ? 'true' : 'false'}
              type="checkbox"
              name="currentStudent"
              id="edu-checkbox"
              value={currentStudent}
              onChange={() =>
                setEducationFormData({
                  ...educationFormData,
                  currentStudent: !currentStudent,
                })
              }
              onChange={() => hideToDateEdu()}
            />{" "}
            <label>Current School</label>
          </p>
        </div>
        <div className="experience-education-fields" id="edu-to-input">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            placeholder="To"
            onChange={onChange}
          />
        </div>
        <div className="experience-education-fields">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
