import React, { Fragment, useEffect, useState } from "react";
import "./NavigationBar.scss";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout, loadUser } from "../../actions/loginActions";
import PropTypes from "prop-types";
import huskyimage from "../../images/nlogo1.png";

const NavigationBar = ({
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const confirmLogout = () => {
    if (window.confirm(`Are you sure you want to logout "${user.name}"?`)) {
      return logout();
    } else {
      return <Redirect to="/dashboard" />;
    }
  };

  const authLinks = (
    <ul>
      <Fragment>
        <p>
          <Link className="posts-link" to="/posts" data-aos="fade-right">
            Howls!
          </Link>
        </p>
        <p>
          <Link className="posts-link" to="/analytics" data-aos="fade-right">
            Analytics
          </Link>
        </p>
        <p>
          <Link className="posts-link" to="/map" data-aos="fade-right">
            Husky Map
          </Link>
        </p>
      </Fragment>
      <div className="extra-links">
        <li>
          <Link to={"/dashboard"} data-aos="fade-right">
            Dashboard
          </Link>
        </li>
        <p>{user && user.name ? user.name : null}</p>
        <img
          className="profile-image"
          src={user && user.image ? user.image : null}
        ></img>
        <li>
          <Link onClick={() => confirmLogout()} to="/">
            <i class="fas fa-sign-out-alt"></i>
          </Link>
        </li>
      </div>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">LOGIN</Link>
      </li>
      <li>
        <Link to="/signUp">SIGN UP</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="logo-div">
        <img className="huskylogo" src={huskyimage}></img>
        <h1 className="h1-logo">HUSKY DEVELOPERS PORTAL</h1>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
