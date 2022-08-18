import React, { useEffect } from "react";
import "./home.css";
import TimeTable from "./components/Timetable/Timetable";
import Main from "./components/Main/Main";
import Notice from "./components/Notice/Notice";
import Assign from "./components/Assignment/Assign";
import Grade from "./components/Grade/Grade";
import Schedule from "./components/Schedule/Schedule";
import StudyRoom from "./components/StudyRoom/StudyRoom";
import MyClass from "./components/MyClass/MyClass";
import Profile from "./components/Profile/Profile";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch } from "react-redux";
import { logout, login, reset } from "storage/UserSlice";

const Home = (tmp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navTabs = [
    {
      name: "메인",
      component: <Main />,
      path: "/main",
    },
    {
      name: "공지",
      component: <Notice />,
      path: "/notice",
    },
    {
      name: "과제",
      component: <Assign />,
      path: "/assign",
    },
    {
      name: "성적",
      component: <Grade />,
      path: "/grade",
    },
    {
      name: "일정",
      component: <Schedule />,
      path: "/schedule",
    },
    {
      name: "스터디룸",
      component: <StudyRoom />,
      path: "/studyroom",
    },
    {
      name: "우리반",
      component: <MyClass />,
      path: "/myclass",
    },
  ];

  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();

    dispatch(reset());
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="mainFlexContainer">
      <div className="mainGridContainer">
        <div className="headerGridContainer">
          <div className="logoContainer">
            <img src={"/Teras_logo_home.png"} alt="terasLogo" height="100" />
          </div>
          <div className="navBar">
            <div className="logoutButtonContainer">
              <div className="logoutButton" onClick={handleLogOut}>
                LOG OUT
              </div>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 268.832 268.832"
                >
                  <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="sideBarGridContainer">
          <div className="profileContainer">
            <Profile />
          </div>
          <div className="timeTableFlexContainer">
            <div className="timeTableContainer">
              <TimeTable />
            </div>
          </div>
        </div>
        <div className="dashBoardFlexContainer">
          <div className="dashBoardContainer">
            {/* tap 메뉴 div */}
            <div className="navTabContainer">
              {navTabs.map((tab, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navTabButton selectedTab" : "navTabButton"
                  }
                  key={index}
                  to={tab.path}
                >
                  {tab.name}
                </NavLink>
              ))}
            </div>
            {/* routing box */}
            <div className="componentContainer">
              <Routes>
                <Route path="main" element={<Main />} />
                <Route path="notice/*" element={<Notice />} />
                <Route path="assign/*" element={<Assign />} />
                <Route path="grade" element={<Grade />} />
                <Route path="schedule/*" element={<Schedule />} />
                <Route path="studyroom" element={<StudyRoom />} />
                <Route path="myclass/*" element={<MyClass />} />
              </Routes>
            </div>

            {/* <div className="navTabContainer">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
