import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./DevelopersMap.scss";
import L from "leaflet";
import { connect, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

import { getCurrentProfile } from "../../actions/profileActions";

import "leaflet/dist/leaflet.css";

import { getDevelopersMapCoordinates } from "../../actions/developersMapActions";

delete L.Icon.Default.prototype._getIconUrl;

//used to display the marker on the map
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://rawcdn.githack.com/colbyfayock/egghead-code-examples/master/add-data-to-map-geojson-react-leaflet/src/images/marker-icon-2x.png",
  iconUrl:
    "https://rawcdn.githack.com/colbyfayock/egghead-code-examples/master/add-data-to-map-geojson-react-leaflet/src/images/marker-icon.png",
  shadowUrl:
    "https://rawcdn.githack.com/colbyfayock/egghead-code-examples/master/add-data-to-map-geojson-react-leaflet/src/images/marker-shadow.png",
});

const DevelopersMap = ({ auth, Profile, developersMapCoordinates }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) dispatch(getCurrentProfile(auth.user._id));
  }, [auth]);

  useEffect(() => {
    if (Profile.profile) dispatch(getDevelopersMapCoordinates(Profile));
  }, [Profile]);

  return (
    <div className="maps">
      <MapContainer
        center={[42.3398, -71.0892]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {!developersMapCoordinates.loading &&
          developersMapCoordinates.developersMapCoordinates.map((user) => (
            <Marker
              position={[user.latitude, user.longitude]}
              key={user.userId}
            >
              <Popup>
                {" "}
                <Link
                  className="no-decoration"
                  to={`/dashboard/${user.userId}`}
                >
                  {user.name}{" "}
                </Link>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

DevelopersMap.propTypes = {
  getDevelopersMapCoordinates: PropTypes.func.isRequired,
  developersMapCoordinates: PropTypes.object.isRequired,
  Profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  Profile: state.Profile,
  developersMapCoordinates: state.developersMapCoordinates,
});

export default connect(mapStateToProps, { getDevelopersMapCoordinates })(
  DevelopersMap
);
