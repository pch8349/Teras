import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import UserLogin from "./pages/Login/UserLogin";
import SignUp from "./pages/Login/SignUp";
import SignUpFin from "./pages/Login/SignUpFin";
import Classroom from "./pages/Classroom/index";
import ClassMake from "./pages/Login/ClassMake";
import Test from "./test/Test";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLogined, selectUser } from "storage/UserSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = {};
  // const isLogin = useSelector(selectLogined);
  // console.log("유저데이터", isLogin);
  console.log("유저데이터", user);
  if (user === null) dispatch(login({ isLogin: false }));

  return (
    <Router>
      {user.isLogin ? (
        <>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<Home />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/classmake" element={<ClassMake />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<UserLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupfin" element={<SignUpFin />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
