import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserLogin } from "./user/UserLogin";
import { StudentMain } from "./student/StudentMain";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
      </Routes>
      <Routes>
        <Route path="/main" element={<StudentMain />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
