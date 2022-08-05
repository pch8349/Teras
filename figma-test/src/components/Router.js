import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserLogin } from "./user/UserLogin";
import { StudentMain } from "./student/StudentMain";
import { SignUp, UserSelect } from "./user/SignUp";
import { Test } from "./Test";
import { SignUpFin } from "./user/SignUpFin";
import { useEffect, useState } from 'react';

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signupfin" element={<SignUpFin />} />
      </Routes>
      <Routes>
        <Route path="/" element={<StudentMain />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
