import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./analytics.scss";
import { getPostBySkill } from "../../actions/analyticsActions";

//shows the analytics of the posts posted by a user
const Analytics = ({ analytics }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostBySkill());
  }, []);
  const chartDataPostSkill = {
    labels: analytics.addingLabel,
    datasets: [
      {
        label: "NUMBER OF POST BY SKILLS",
        data: analytics.addingValue,
        backgroundColor: ["darkred", "black", "grey", "lightgrey"],
        hoverOffset: 4,
      },
    ],
  };
  const chartDataComments = {
    labels: analytics.addingLabel,
    datasets: [
      {
        label: "NUMBER OF COMMENTS BY SKILL",
        data: analytics.addingCommentValue,
        fill: false,
        borderColor: "black",
        tension: 0.1,
      },
    ],
  };
  const chartDataLikes = {
    labels: analytics.addingLabel,
    datasets: [
      {
        label: "NUMBER OF LIKES BY SKILLS",
        data: analytics.addingLikesValue,
        backgroundColor: ["black", "grey", "darkred", "lightgrey"],
        borderColor: ["black", "black", "black"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="fullBody">
      {/* chart 1 displays the likes recived based on post type */}
      <div className="charts-display1">
        <div id="bar">
          <h1 id="heading">LIKES ANALYTICS BASED ON SKILLS</h1>
          <Bar
            id="general"
            data={chartDataLikes}
            options={{
              scales: {
                x: {
                  grid: {
                    borderColor: "black",
                    borderWidth: 1,
                    color: "black",
                    drawTicks: false,
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
                y: {
                  grid: {
                    borderColor: "black",
                    borderWidth: 1,
                    color: "black",
                    drawTicks: false,
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
              },
            }}
          />
        </div>
        <div id="line">
          {/* chart 2 displays the posts based on comments received by it */}
          <h1 id="heading">COMMENT ANALYTICS BASED ON SKILLS</h1>
          <Line
            id="general"
            data={chartDataComments}
            options={{
              scales: {
                x: {
                  grid: {
                    borderColor: "black",
                    borderWidth: 1,
                    color: "black",
                    drawTicks: false,
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
                y: {
                  grid: {
                    borderColor: "black",
                    borderWidth: 1,
                    color: "black",
                    drawTicks: false,
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="charts-display2">
        <div>
          {/* chart 3 shows the percentage of posts posted by the user */}
          <h1 id="heading">POST ANALYTICS BASED ON SKILLS</h1>
          <Doughnut id="doughnut" data={chartDataPostSkill} options={{}} />
        </div>
      </div>
    </div>
  );
};

Analytics.propTypes = {
  getPostBySkill: PropTypes.func.isRequired,
  finalValue: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  analytics: state.Analytics,
});

export default connect(mapStateToProps, { getPostBySkill })(Analytics);
