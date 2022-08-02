import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserLogin } from "./user/UserLogin";
import { StudentMain } from "./student/StudentMain";
import { SignUp, UserSelect } from "./user/SignUp";
import { Test } from "./Test";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Routes>
        <Route path="/main" element={<StudentMain />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
