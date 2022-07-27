import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import LoginForm from "./pages/Login/index";
import { doLogin } from "./api/Users";
import Test from "./pages/Home/test";

function App() {
  const [user, setUser] = useState();
  const authenticated = user != null;

  const login = async ({ id, password }) => {
    try {
      await doLogin(
        { id, password },
        () =>
          setUser({
            id: { id },
            password: { password },
          }),
        () => console.log("로그인 실패")
      );
    } catch (error) {
      console.log("로그인 실패");
    }
  };
  //const logout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Home />
            ) : (
              <LoginForm authenticated={authenticated} login={login} />
            )
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
