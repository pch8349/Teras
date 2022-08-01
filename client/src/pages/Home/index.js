import React from "react";
import "./home.css";
import TimeTable from "./components/Timetable/Timetable";

function Home() {
  return (
    <div className="mainFlexContainer">
      <div className="mainGridContainer">
        <div className="header"></div>
        <div className="sideBarContainer">
          <div className="profileContainer"></div>
          <div className="timeTableContainer">
            <TimeTable
              rows={["수학", "영어", "국어", "진로", "화학I", "체육", "도덕"]}
            />
          </div>
        </div>
        <div className="dashboardContainer"></div>
      </div>
    </div>
  );
}

export default Home;
