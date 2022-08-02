import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import LoginForm from "./pages/Login/index";
import RouteGuard from "./pages/RouteGuard";
import Classroom from "./pages/Classroom/index2";

function App() {
  const [user, setUser] = useState();

  //const logout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("accessToken") ? <Home /> : <LoginForm />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/classroom" element={<Classroom />} />
      </Routes>
    </Router>
  );
}

export default App;
