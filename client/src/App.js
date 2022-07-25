import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import LoginForm from "./pages/Login/index";
import { doLogin } from "./api/member";

function App() {
  const [user, setUser] = useState();
  const authenticated = user != null;

  const login = async ({ id, password }) => {
    try {
      await doLogin(
        {
          id: { id },
          password: { password },
        },
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
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
