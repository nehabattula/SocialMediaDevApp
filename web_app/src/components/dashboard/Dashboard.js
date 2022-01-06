import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import "./Dashboard.scss";
import { connect, useDispatch } from "react-redux";
import { loadUser } from "../../actions/loginActions";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteProfile } from "../../actions/profileActions";
import { getGitProjects } from "../../actions/gitProjectsActions";
import gif from "../../images/husky-gif.gif";
import moment from "moment";

// set the state for this component
const Dashboard = ({ auth, profile, git }) => {
  let { id } = useParams();

  if (!id && auth && auth.user) {
    id = auth.user._id;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (id) dispatch(getCurrentProfile(id));
    console.log(profile);
  }, [id]);

  const [toggleProject, setToggleProject] = useState(false);

  const constructDate = (DateVal) => {
    return moment(DateVal, "YYYY/MM/DD").format("MM/DD/YYYY");
  };

  const deleteProfileConfirm = () => {
    if (
      window.confirm(
        `Are you sure you want to delete your account "${auth.user.name}"?`
      )
    ) {
      <Redirect to="/login" />;
      return dispatch(deleteProfile(auth.user._id));
    }
  };

  // return badges
  const returnBadges = (badge) => {
    if (badge === 0) {
      return (
        <div className="badges">
          <i class="fa fa-star stars" aria-hidden="true"></i>
        </div>
      );
    } else if (badge === 1) {
      return (
        <div className="badges">
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
        </div>
      );
    } else {
      return (
        <div className="badges">
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
          <i class="fa fa-star stars" aria-hidden="true"></i>
        </div>
      );
    }
  };

  const showGitProjects = (gitusername) => {
    setToggleProject(!toggleProject);
    dispatch(getGitProjects(gitusername));
  };

  let renderGitProjectsDom = () => {
    let rows = [];
    for (let key in git.projects) {
      rows.push(
        <div className="each-project" key={key}>
          <p className="project-names">{git.projects[key]}</p>
        </div>
      );
    }
    return (
      <div data-aos="fade-right">
        <h2 className="profile-header">GITHUB</h2>
        <div className="profile-data">{rows}</div>
      </div>
    );
  };

  let displayGitProjects = () => {
    return (
      <div>
        {git && git.projects.length !== 0 ? renderGitProjectsDom() : null}
      </div>
    );
  };

  // Component function
  return (
    <div className="dashboard-container">
      {auth && auth.user && auth.user.name ? (
        <div className="dashboard-div">
          <h1 className="dashboard-header" data-aos="zoom-in-up">
            <span class="dashboard-header-user">
              {profile &&
                profile.profile &&
                profile.profile.user &&
                profile.profile.user.name
                ? profile.profile.user.name
                : auth.user.name}
              's
            </span>{" "}
            Dashboard
          </h1>
          {profile && profile.profile && profile.profile.badge !== null
            ? returnBadges(profile.profile.badge)
            : null}
          <div className="github-container">
            {profile && profile.profile && profile.profile.githubusername ? (
              <i
                class="fab fa-github project"
                onClick={() => showGitProjects(profile.profile.githubusername)}
              ></i>
            ) : null}
          </div>
        </div>
      ) : null}
      {profile.profile !== null ? (
        <Fragment>
          {toggleProject ? displayGitProjects() : null}
          <h2 className="profile-header" data-aos="fade-right">
            PROFILE
          </h2>
          {profile && profile.profile ? (
            <div className="profile-data" data-aos="fade-right">
              {profile.profile.website ? (
                <p>
                  <span className="head-span">WEBSITE:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <a
                    className="profile-links"
                    className="tail-span"
                    href={profile.profile.website}
                    target="_blank"
                  >
                    {profile.profile.website}
                  </a>
                </p>
              ) : null}
              {profile.profile.homelocation ? (
                <p>
                  <span className="head-span">LOCATION:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.homelocation.address}
                  </span>
                </p>
              ) : null}
              {profile.profile.skills ? (
                <p>
                  <span className="head-span">SKILLS:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.skills.join(",")}
                  </span>
                </p>
              ) : null}
              {profile.profile.homelocation ? (
                <p>
                  <span className="head-span">
                    GIT USERNAME:&nbsp;&nbsp;&nbsp;
                  </span>{" "}
                  <span className="tail-span">
                    {profile.profile.githubusername}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}

          <h2 className="experience-header" data-aos="fade-right">
            EXPERIENCE
          </h2>
          {profile.profile && profile.profile.experience ? (
            <div className="profile-data" data-aos="fade-right">
              {profile.profile.experience.designation ? (
                <p>
                  <span className="head-span">
                    DESIGNATION:&nbsp;&nbsp;&nbsp;
                  </span>{" "}
                  <span className="tail-span">
                    {profile.profile.experience.designation}
                  </span>
                </p>
              ) : null}
              {profile.profile.experience.company ? (
                <p>
                  <span className="head-span">COMPANY:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.experience.company}
                  </span>
                </p>
              ) : null}
              {profile.profile.experience.workLocation ? (
                <p>
                  <span className="head-span">LOCATION:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.experience.workLocation}
                  </span>
                </p>
              ) : null}
              {profile.profile.experience.startingDate ? (
                <p>
                  <span className="head-span">
                    START DATE:&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="tail-span">
                    {constructDate(profile.profile.experience.startingDate)}
                  </span>
                </p>
              ) : null}
              {profile.profile.experience.endDate ? (
                <p>
                  <span className="head-span">END DATE:&nbsp;&nbsp;&nbsp;</span>
                  <span className="tail-span">
                    {constructDate(profile.profile.experience.endDate)}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}

          <h2 className="experience-header" data-aos="fade-right">
            EDUCATION
          </h2>
          {profile.profile && profile.profile.education ? (
            <div className="profile-data" data-aos="fade-right">
              {profile.profile.education.school ? (
                <p>
                  <span className="head-span">SCHOOL:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.education.school}
                  </span>
                </p>
              ) : null}
              {profile.profile.education.degree ? (
                <p>
                  <span className="head-span">DEGREE:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.education.degree}
                  </span>
                </p>
              ) : null}
              {profile.profile.education.fielofstudy ? (
                <p>
                  <span className="head-span">FIELD:&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className="tail-span">
                    {profile.profile.education.fielofstudy}
                  </span>
                </p>
              ) : null}
              {profile.profile.education.from ? (
                <p>
                  <span className="head-span">
                    START DATE:&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="tail-span">
                    {constructDate(profile.profile.education.from)}
                  </span>
                </p>
              ) : null}
              {profile.profile.education.to ? (
                <p>
                  <span className="head-span">END DATE:&nbsp;&nbsp;&nbsp;</span>
                  <span className="tail-span">
                    {constructDate(profile.profile.education.to)}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
          {id && auth && auth.user && auth.user._id && id === auth.user._id ? (
            <Link Link className="update-profile" to="/profile">
              UPDATE YOUR PROFILE
            </Link>
          ) : null}
          {id && auth && auth.user && auth.user._id && id === auth.user._id ? (
            <Link
              className="delete-profile"
              to="/login"
              onClick={() => deleteProfileConfirm()}
            >
              DELETE YOUR ACCOUNT?
            </Link>
          ) : null}
          <div className="margin-div">
            <p>{null}</p>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You don't have a profile yet, click on the button below to get
            started!
          </p>
          <Link className="create-profile" to="/profile">
            CREATE A PROFILE
          </Link>
          <img className="gif" src={gif}></img>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.Profile,
  git: state.GitProjects,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
