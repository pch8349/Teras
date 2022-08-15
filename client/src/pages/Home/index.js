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
import { Route, Routes, NavLink, useNavigate, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch } from "react-redux";
import { logout, login, reset } from "storage/UserSlice";

const Home = (tmp) => {
  const dispatch = useDispatch();

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
  };

  return (
    <div className="mainFlexContainer">
      <div className="mainGridContainer">
        <div className="headerGridContainer">
          <div className="logoContainer">
            <img src={"/Teras_logo_home.png"} alt="terasLogo" height="100" />
          </div>
          <div className="navBar">
            <Link to="/">
              <button onClick={handleLogOut}>
                로그아웃
                <LogoutIcon />
              </button>
            </Link>
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
                <Route path="schedule" element={<Schedule />} />
                <Route path="studyroom" element={<StudyRoom />} />
                <Route path="myclass" element={<MyClass />} />
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
