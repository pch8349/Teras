import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import LoginForm from "./pages/Login/index";
import RouteGuard from "./pages/RouteGuard";

function App() {
  const [user, setUser] = useState();

  //const logout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <RouteGuard path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
