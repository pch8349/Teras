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

const App = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const load = () => {
      setToken(() =>
        localStorage.getItem("accessToken") === null
          ? sessionStorage.getItem("accessToken")
          : localStorage.getItem("accessToken")
      );
    };
    console.log("토큰", token);
    load();
  }, [token]);
  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/*" element={token ? <Home /> : <UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupfin" element={<SignUpFin />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/classmake" element={<ClassMake />} />
      </Routes>
    </Router>
  );
};

export default App;
