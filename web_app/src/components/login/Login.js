import React, { useState } from "react";
import "./Login.scss";
import { connect } from "react-redux";
import { loginUser } from "../../actions/loginActions";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

// set the state for this component
const Login = ({ loginUser, isAuthenticated }) => {
  // Initialize the state of the component
  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState); // set the user details to th state
  const { username, password } = user; // destructure the username and password from the user object
  const onChange = (thisEle) =>
    setUser({ ...user, [thisEle.target.name]: thisEle.target.value }); // onChange event handler

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(username, password);
    console.log("auth");
    console.log(isAuthenticated);
  };

  // redirect if logginIn
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // Component function
  return (
    <div className="main-container">
      <div className="container-div">
        <div className="login-signup-div">
          <div className="login-div">
            <form onSubmit={(e) => onSubmit(e)}>
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
                className="username-field"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={onChange}
                required="required"
              ></input>
              <div className="button-div">
                <input type="submit" className="login-button" value="LOGIN" />
                <Link to="/signUp" className="signup-button">
                  CREATE ACCOUNT
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
