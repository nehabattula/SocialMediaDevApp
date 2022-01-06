import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Alert.scss";

//used to show laert pop-up
const Alert = ({ alerts }) => (
  <div className="">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
