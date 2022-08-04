import React, { useState } from "react";
import "./home.css";
import TimeTable from "./components/Timetable/timetable";
import { Button } from "@mui/material";
import Main from "./components/Main/Main";
import Notice from "./components/Notice/Notice";
import Assignment from "./components/Assignment/Assignment";
import Grade from "./components/Grade/Grade";
import Schedule from "./components/Schedule/Schedule";
import StudyRoom from "./components/StudyRoom/StudyRoom";
import MyClass from "./components/MyClass/MyClass";
import Profile from "./components/Profile/Profile";

function Home() {
  const [selected, setSelected] = useState(0);
  const navTabs = [
    {
      name: "메인",
      component: <Main />,
      isSelected: false,
    },
    {
      name: "공지",
      component: <Notice />,
      isSelected: false,
    },
    {
      name: "과제",
      component: <Assignment />,
      isSelected: false,
    },
    {
      name: "성적",
      component: <Grade />,
      isSelected: false,
    },
    {
      name: "일정",
      component: <Schedule />,
      isSelected: false,
    },
    {
      name: "스터디룸",
      component: <StudyRoom />,
      isSelected: false,
    },
    {
      name: "우리반",
      component: <MyClass />,
      isSelected: false,
    },
  ];

  return (
    <div className="mainFlexContainer">
      <div className="mainGridContainer">
        <div className="headerGridContainer">
          <div className="logoContainer">
            <img src={"/Teras_logo_home.png"} alt="terasLogo" height="100" />
          </div>
          <div className="navBar"></div>
        </div>
        <div className="sideBarGridContainer">
          <div className="profileContainer">
            <Profile />
          </div>
          <div className="timeTableGridContainer">
            <div className="classRoomButtonContainer">
              <Button
                sx={{
                  width: 200,
                  height: 50,
                }}
                variant="contained"
                onClick={() => (window.location.href = "/classroom")}
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
        <div className="dashBoardFlexContainer">
          <div className="dashBoardContainer">
            <div className="navTabContainer">
              {navTabs.map((tab, index) => (
                <button
                  className={`navTabButton ${
                    selected === index ? "selectedTab" : ""
                  }`}
                  key={index}
                  onClick={() => setSelected(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="componentContainer">
              {navTabs[selected].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
