import React, { useState } from "react";
import "./login.css";

function LoginForm({ authenticated, login }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    try {
      login({ id, password });
    } catch (e) {
      alert("Failed to login");
      setId("");
      setPassword("");
    }
  };

  return (
    <div className="loginGridContainer">
      <h1>Login</h1>
      <input
        value={id}
        onChange={({ target: { value } }) => setId(value)}
        type="text"
        placeholder="id"
      />
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default LoginForm;
