import React, { Fragment, useState } from "react";
import "./SignUp.scss";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import { connect } from "react-redux";
import { register } from "../../actions/loginActions";
import PropTypes from "prop-types";
import "../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import zxcvbn from "zxcvbn";

//user's signup page
const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [score, setScore] = useState("null");

  const { name, username, password, password2 } = formData;

  const onChange = (e) => {
    if (e.target.name === "password" && e.target.value !== "") {
      let passwordCheck = zxcvbn(e.target.value);
      setScore(passwordCheck.score);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "success");
    } else {
      register({ name, username, password });
    }
  };

  // redirect if logginIn
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="main-container">
        <div className="container-div1">
          <div className="login-signup-div">
            <div className="login-div">
              <form onSubmit={(e) => onSubmit(e)}>
                <input
                  type="text"
                  className="name-field"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required="required"
                ></input>
                <input
                  type="text"
                  className="username-field"
                  placeholder="Email"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required="required"
                ></input>
                <input
                  type="password"
                  className="password-field"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={onChange}
                  required="required"
                ></input>
                <span
                  id="password-check"
                  className="password-check"
                  score={score}
                />
                <input
                  type="password"
                  className="password-2-field"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                  value={password2}
                  onChange={onChange}
                  required="required"
                ></input>
                <div className="button-div1">
                  <input
                    type="submit"
                    className="signup-submit-button"
                    value="SIGN UP"
                  />
                  <p>
                    <Link to="/login" className="login-if-signedup">
                      LOGIN
                    </Link>{" "}
                    if already Signed Up!{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SignUp.protoTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(SignUp);
