import React from "react";
import "./home.css";
import TimeTable from "./components/Timetable/timetable";
import { Button } from "@mui/material";

function Home() {
  return (
    <div className="mainFlexContainer">
      <div className="mainGridContainer">
        <div className="header"></div>
        <div className="sideBarGridContainer">
          <div className="profileContainer"></div>
          <div className="timeTableGridContainer">
            <div className="classRoomButtonContainer">
              <Button
                sx={{
                  width: 200,
                  height: 50,
                }}
                variant="contained"
              >
                강의실 입장
              </Button>
            </div>
            <div className="timeTableContainer">
              <TimeTable
                rows={["수학", "영어", "국어", "진로", "화학I", "체육", "도덕"]}
              />
            </div>
          </div>
        </div>
        <div className="dashboardContainer"></div>
      </div>
    </div>
  );
}

export default Home;
